import Ember from "ember";

export default Ember.Component.extend({
	active_state : 'collapsed', // ['collapsed','expanded'] current state of the dropdown
	classNames   : ['easy-dropdown'],
	classNameBindings : ['active_state','disabled'],
	didInsertElement : function(){
		this._set_elements();
		this._bind_events();
		this._switch_state(this.get('active_state'));
	},
	willDestroyElement : function(){
		this._unbind_events();
	},

	_valid_state : function(state){
		return ['collapsed','expanded'].indexOf(state) !== -1;
	},
	_bind_events : function(){
		this.get('toggle_box').bind('click',this.get('toggle_callback'));
	},
	_unbind_events : function(){
		this.get('toggle_box').unbind('click',this.get('toggle_callback'));	
	},
	_set_elements : function(){
		//Cache DOM Elements on Component Instance for faster retrieval.
		//Store Event Callbacks with context to Component.
		this.setProperties({
			toggle_box      : this.$('.dropdown-toggle'),
			detail_box      : this.$(".dropdown-details"),
			toggle_callback : this.get('toggle_dropdown').bind(this),
			body_callback   : this.get('body_click').bind(this)
		});
	},

	_switch_state : function(state){
		/**
			Switches the state of the dropdown to the passed in value. Also do any necessary
			setup/destroy actions required by each state. If state is not valid set component to default
			collapsed state.
		**/
		var current_state = this.get('active_state');
		
		if(!this._valid_state(state)){
			state = 'collapsed';
		}
		
		if(current_state === state){
			return;
		}
		else if(state === 'expanded'){
			this.get('detail_box').removeClass('hide');
			$('body').unbind('click',this.get('body_callback'));
			Ember.run.next(this,function(){
				//attach a listener on body for clicks to hide the dropdown
				$('body').bind('click',this.get('body_callback'));	
			});
		}
		else{
			this.get('detail_box').addClass('hide');
			//once hidden remove the body event listener. max one listener at anytime on body
			$('body').unbind('click',this.get('body_callback'));
		}
		this.set('active_state',state);
		this.get('targetObject').send('easyDropdownStateChanged',{new_state:state,element:this.get('elementId')});
	},

	toggle_dropdown : function(){
		if(this.get('disabled')){
			return;
		}
		if(this.get('active_state') === 'collapsed'){
			this._switch_state('expanded');
		}
		else{
			this._switch_state('collapsed');
		}
	},
	body_click : function(e){
		if(this.get('disabled')){
			return;
		}
		var	detail_box = this.get('detail_box');
		if(this.get('active_state') === 'expanded' && !($.contains(detail_box[0],e.target) || detail_box[0] === e.target) ){
			this._switch_state('collapsed');
		}
	}
});