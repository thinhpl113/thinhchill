// Garden Gnome Software - Skin
// Pano2VR 7.1.7/20981
// Filename: mono--pano2vr-skin.ggsk
// Generated 2025-09-13T14:48:08

function pano2vrSkin(player,base) {
	player.addVariable('vis_url_hs_popup', 2, false, { ignoreInState: 0  });
	player.addVariable('opt_url_popup', 2, true, { ignoreInState: 1  });
	player.addVariable('resp_phone', 2, false, { ignoreInState: 1  });
	player.addVariable('open_tag', 0, "", { ignoreInState: 0  });
	player.addVariable('close_nodes', 2, false, { ignoreInState: 0  });
	player.addVariable('category_visible', 2, true, { ignoreInState: 1  });
	player.addVariable('category_follow', 2, true, { ignoreInState: 1  });
	player.addVariable('vis_thumbs', 2, false, { ignoreInState: 0  });
	player.addVariable('has_categories', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_thumbs_categories', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_thumbs_nodes', 2, false, { ignoreInState: 0  });
	player.addVariable('resp_phone_1', 2, false, { ignoreInState: 1  });
	var me=this;
	var skin=this;
	var flag=false;
	var nodeMarker=[];
	var activeNodeMarker=[];
	var hotspotTemplates={};
	me.dayCRoomMode=false;
	me.applyDayCRoomHotspotVisibility=function(hotspotInstance) {
		if (!hotspotInstance || !hotspotInstance.hotspot || !hotspotInstance.__div) return;
		if (player.getCurrentNode()!='node2') {
			hotspotInstance.__div.style.display='';
			return;
		}
		var pointNumber=parseInt(String(hotspotInstance.hotspot.id).replace('Point',''),10);
		var isClassroom=pointNumber==7 || (pointNumber>=20 && pointNumber<=60);
		var isFacultyOffice=pointNumber>=9 && pointNumber<=18;
		if (isClassroom) {
			hotspotInstance.__div.style.display=me.dayCRoomMode?'':'none';
		} else if (isFacultyOffice) {
			hotspotInstance.__div.style.display=me.dayCRoomMode?'none':'';
		} else {
			hotspotInstance.__div.style.display='';
		}
	}
	me.applyDayCRoomFilter=function() {
		for (var templateId in hotspotTemplates) {
			if (!hotspotTemplates.hasOwnProperty(templateId)) continue;
			for (var templateIndex=0;templateIndex<hotspotTemplates[templateId].length;templateIndex++) {
				me.applyDayCRoomHotspotVisibility(hotspotTemplates[templateId][templateIndex]);
			}
		}
	}
	me.toggleDayCRoomMode=function() {
		me.dayCRoomMode=!me.dayCRoomMode;
		me.applyDayCRoomFilter();
		return me.dayCRoomMode;
	}
	var skinKeyPressedKey = 0;
	var skinKeyPressedText = '';
	this.player=player;
	player.setApiVersion(7);
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	var cssPrefix="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	for(var i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; });
	
	var parameterToTransform=function(p) {
		return p.def + 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	
	this.languageChanged=function() {
		var stack=[];
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdateText) {
				e.ggUpdateText();
			}
			if (e.ggUpdateAria) {
				e.ggUpdateAria();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('sizechanged', function () { me.updateSize(me.divSkin);});
	player.addListener('languagechanged', this.languageChanged);
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		me._variable_resp_phone = {};
		me._variable_resp_phone.ggCurrentLogicState = -1;
		me._variable_resp_phone.logicBlock = function() {
			var newLogicState_resp_phone;
			if (
				((player.getViewerSize(true).width <= 1024))
			)
			{
				newLogicState_resp_phone = 0;
			}
			else {
				newLogicState_resp_phone = -1;
			}
			if (me._variable_resp_phone.ggCurrentLogicState != newLogicState_resp_phone) {
				me._variable_resp_phone.ggCurrentLogicState = newLogicState_resp_phone;
				if (me._variable_resp_phone.ggCurrentLogicState == 0) {
					player.setVariableValue('resp_phone', true);
				}
				else {
					player.setVariableValue('resp_phone', false);
				}
			}
		}
		me._variable_resp_phone_1 = {};
		me._variable_resp_phone_1.ggCurrentLogicState = -1;
		me._variable_resp_phone_1.logicBlock = function() {
			var newLogicState_resp_phone_1;
			if (
				((player.getViewerSize(true).width <= 1024))
			)
			{
				newLogicState_resp_phone_1 = 0;
			}
			else {
				newLogicState_resp_phone_1 = -1;
			}
			if (me._variable_resp_phone_1.ggCurrentLogicState != newLogicState_resp_phone_1) {
				me._variable_resp_phone_1.ggCurrentLogicState = newLogicState_resp_phone_1;
				if (me._variable_resp_phone_1.ggCurrentLogicState == 0) {
					player.setVariableValue('resp_phone_1', true);
				}
				else {
					player.setVariableValue('resp_phone_1', false);
				}
			}
		}
		el=me._radarback=document.createElement('div');
		els=me._radarback__img=document.createElement('img');
		els.className='ggskin ggskin_radarback';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="radar-back";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 72px;';
		hs+='left : 8px;';
		hs+='position : absolute;';
		hs+='top : 11px;';
		hs+='visibility : inherit;';
		hs+='width : 72px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._radarback.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._radarback.ggUpdatePosition=function (useTransition) {
		}
		el=me._radarbeam=document.createElement('div');
		els=me._radarbeam__img=document.createElement('img');
		els.className='ggskin ggskin_radarbeam';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="radar-beam";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 72px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 72px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._radarbeam.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._radarbeam.ggUpdatePosition=function (useTransition) {
		}
		me._radarback.appendChild(me._radarbeam);
		me.divSkin.appendChild(me._radarback);
		el=me._panolist=document.createElement('div');
		el.ggId="pano-list";
		el.ggDx=-1;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 319px;';
		hs+='left : calc(50% - ((478px + 2px) / 2) - 1px);';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((319px + 2px) / 2) + 0px);';
		hs+='visibility : hidden;';
		hs+='width : 478px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._panolist.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._panolist.ggUpdatePosition=function (useTransition) {
		}
		el=me._closebutton0=document.createElement('div');
		els=me._closebutton0__img=document.createElement('img');
		els.className='ggskin ggskin_closebutton0';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAGKUlEQVRIiZVWbUyb1xU+9+P1ywv+wMaY2cYGzIfJoA4QJXgkW1iXqCRZ+7dk/dn+nZZmP7ZWVVRS0h9rtiJN7bSAQ0amrK2aSbTRFpIm0QKJ6pRWgXWEoECWBNu0trHBH6/t9+PuRzB1jLNpR3r1Sufcc577nHvuORdxfBkUC0IIAABkWQZVljgA0AFAGyHk+/UNDeFIJGKVZSWYSiaiAPA1AMSphlcRwgDAtsYrBcIYAzmXBUKpy9XQ0Llj585tNdUWa3f3LqTT6SCVSmkSiWRmObCcu3r1WnhmdvbOejz2FWDykOO4/wWCQFUVUKSc+XtW24FXXnnZe+jQIdO21lbZYDBkAUAFAAwAysYfpVIp7sbNm2h8/JO4zzdyJZvJXKF8WRKVBEEIZCkHTF'+
			'GafrJvX/+vf/Vae2/vj7KU0sxGDgr9tmwWALgPP/qIe/PNgc/n78z9hePLonkjIZRupkiVZdfzL7zw0vvv/8G9o6szgTGWNgL8N4C8KO1tbXKPt8c5/eW0JfDo0QKhVHwCRM5lq7w/6Hl5ePhUi6uhPl2ww/9LrDar0tnZ6bw4cUmIx2K3CSGPQWRJAqvV9tOR4VN7tns8InxXIggen4PyFEbqxveEzW63KwaDvumT8fEoJvQBBoSAqYqt/3D/3t27d2c2nDaDJJNJfOHTT63xeJwW2ZSlxcXyqamp6g19Ye2qPzt8WPL27H5OzmUEAgyA5zUHBwcHu+rr6sSChUwURXZ2bMw1ePx4+/r6Otft9UY4jlMBQAkEAuVvDQy0D5861Wi32cQWtzuB8hcMADiOUxVFNv3t7xcfEMbUyj17frj/9ddfMxBCntjp6OnTrhOD'+
			'g+0anoeZmRljKpUi3V5vNBaLcccHBtovX75sZ4yRS5cuWTq7uuJ1dXVJeFzaAADgqK3lzvxpLEMBwL5z1y4jx3FKUb7x3t7eyNmxMTEUCpVVVFQofz571pXJZEg0GuUnLl6063Q6KRKJ8H19fZG2tra14jOrqalRG5tcFgwAFofDIcDWfoDdbnd89MyZG06nMy2KIhEEQT3/8cf1U5OTFoPBIGUyGXLw4MGVt06c+MJkMuUKWWyI7G5xV2BAmArlAikBAgDANTU3J3yjozddLldSkiQkCILMUQqiKJJurzf626GhL2pra7MAQEr4g91uoxgYAyknlbJvMjJWVuasNluaMYYQQoAwZowx2NbaGqsoL88BAH2acyKRYBSAJcORsAIAXAk2ajAQEI4PDLT5/X4zz/NKMpmkGGOm1Wqlc+fOuRRVRUePHl3Q6nT5u1QoaO'+
			'HuQg4DwMO78/NiiQVqIBAoO3bsWPvExISdEsJWV1c1XV1dq83NzeuJRIKjlKqnfb7mkydPtmSz2S19fn19nd5bXBIxwnjl+uTU/W+/DfPFVGVZxvN37ugJIRAOh/l9+/d/4xsdvfH7997zO53O9Fo8zhNCVFmWMUJoy5nOzMzwwZXQPcJpeBZfjdKOjo4uj+eZwnuCKisrcx0dHdHp6Wnj9u3b1wbffvsrs9ksG43GXE9PT9jv95uf6+tbPvLqq3f1en2+vWz6Dw+PJK5du/oB4vgykLKZsp27ut+4euUzh1arzRQTmp+b01eZzXK1xZIEAE1ev7y8LAiCwKqqqrZU1+zsrK7vwIF/rKys/JEQSgETIi8/fLBGOc2O3t69GCFUyAibq6uzFRUVMjwujk29Xq+XysvL1WKAdDpd9vNfHIlO37r1AafhY4RQCgghYIyF'+
			'bt++rXE4nM0ezzP56Zen/7SZgov0qiRJwrtDQ+mRkZFzDNAsxvi7eYIJgXQqueT339IYKo1NHo+HwxgXt5qnCQMAEgqFtL97dyjxzm/eGU+nU9cpp2EABUMLAIBQKq/FVu9dn7wuPloO1LvdLdoqk4lB6W6QH8lYURTNv+bmNEeO/vKhz+f7MJfLTXIafjPlJV8rsiQBU5XWxqam/f0v9m979tkfa12NjdjpcMiSJGGe5+VgMKRJpVMoGAxmLly4EDt//q//vL+0+BnCJECLXiwlQfIiZTMcAKozmYxuq83maKhvqKm2VGdFUdQu3v93AlQluLCwEFmLx5cAYInjeQkQBmBPEv8PbfyhyoNwx64AAAAASUVORK5CYII=';
		me._closebutton0__img.ggOverSrc=hs;
		hs='data:image/png;base64,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'+
			'gdFRqS0AzcAAAAAElFTkSuQmCC';
		me._closebutton0__img.ggDownSrc=hs;
		el.ggId="close-button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 449px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._closebutton0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._closebutton0.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._panolist.style.transition='none';
			} else {
				me._panolist.style.transition='all 500ms ease-out 0ms';
			}
			me._panolist.style.opacity='0';
			me._panolist.style.visibility='hidden';
		}
		me._closebutton0.onmouseenter=function (e) {
			me._closebutton0__img.src=me._closebutton0__img.ggOverSrc;
			me.elementMouseOver['closebutton0']=true;
		}
		me._closebutton0.onmousedown=function (e) {
			me._closebutton0__img.src=me._closebutton0__img.ggDownSrc;
		}
		me._closebutton0.onmouseup=function (e) {
			if (skin.player.getHasTouch()) {
				me._closebutton0__img.src = me._closebutton0__img.ggNormalSrc;
			} else {
				me._closebutton0__img.src = me._closebutton0__img.ggOverSrc;
			}
		}
		me._closebutton0.onmouseleave=function (e) {
			me._closebutton0__img.src=me._closebutton0__img.ggNormalSrc;
			me.elementMouseOver['closebutton0']=false;
		}
		me._closebutton0.ggUpdatePosition=function (useTransition) {
		}
		me._panolist.appendChild(me._closebutton0);
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs=basePath + 'images/image_1.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 214px;';
		hs+='left : 77px;';
		hs+='position : absolute;';
		hs+='top : 58px;';
		hs+='visibility : inherit;';
		hs+='width : 344px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
		}
		me._panolist.appendChild(me._image_1);
		me.divSkin.appendChild(me._panolist);
		el=me._socialbar=document.createElement('div');
		el.ggId="social-bar";
		el.ggDx=2;
		el.ggDy=-9;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #e0e0e0;';
		hs+='border : 1px solid #585858;';
		hs+='cursor : default;';
		hs+='height : 102px;';
		hs+='left : calc(50% - ((274px + 2px) / 2) + 2px);';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((102px + 2px) / 2) - 9px);';
		hs+='visibility : hidden;';
		hs+='width : 274px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._socialbar.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._socialbar.ggUpdatePosition=function (useTransition) {
		}
		el=me._closebutton=document.createElement('div');
		els=me._closebutton__img=document.createElement('img');
		els.className='ggskin ggskin_closebutton';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		hs='data:image/png;base64,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';
		me._closebutton__img.ggOverSrc=hs;
		hs='data:image/png;base64,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'+
			'gdFRqS0AzcAAAAAElFTkSuQmCC';
		me._closebutton__img.ggDownSrc=hs;
		el.ggId="close-button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 245px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._closebutton.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._closebutton.onclick=function (e) {
			var flag=me._socialbar.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._socialbar.style.transition='none';
			} else {
				me._socialbar.style.transition='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._socialbar.style.opacity='0';
				me._socialbar.style.visibility='hidden';
			} else {
				me._socialbar.style.opacity='0';
				me._socialbar.style.visibility='hidden';
			}
			me._socialbar.ggOpacitiyActive=!flag;
		}
		me._closebutton.onmouseenter=function (e) {
			me._closebutton__img.src=me._closebutton__img.ggOverSrc;
			me.elementMouseOver['closebutton']=true;
		}
		me._closebutton.onmousedown=function (e) {
			me._closebutton__img.src=me._closebutton__img.ggDownSrc;
		}
		me._closebutton.onmouseup=function (e) {
			if (skin.player.getHasTouch()) {
				me._closebutton__img.src = me._closebutton__img.ggNormalSrc;
			} else {
				me._closebutton__img.src = me._closebutton__img.ggOverSrc;
			}
		}
		me._closebutton.onmouseleave=function (e) {
			me._closebutton__img.src=me._closebutton__img.ggNormalSrc;
			me.elementMouseOver['closebutton']=false;
		}
		me._closebutton.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._closebutton);
		el=me._socialfb=document.createElement('div');
		els=me._socialfb__img=document.createElement('img');
		els.className='ggskin ggskin_socialfb';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEG0lEQVRYhdWZTWjbZhjH//qMbcnyx7aSQcSampUxw6BlSerbxjrorYeRXcZOaw62t0G6y2CHksOOTWFg++DuGAYL7BZYWRm5hSJfwnAZK0nK1MNKRzIpkp3ow9ohrzLH33KcxvuDkdD7oZ9fvc+j53lEYUhlc/k0gAyANAAZwBQ5AoAK4Bk5VgFslIqF6jD3oQJCSQAWAMy7HiObjgjDEXDghgEAhiMCAETWAACEmDpE1oTAGmAoVwWwCqBcKhb0kQI2gd3W7Rh2rQR0OxbgrwESpyHJ70HiNABYHhS0L2A2l78B4J7piJJak2E1+EBgreJpC3JEhcAaOoDFUrHwc6/+TB+4Jddjlv6svTHx18HrcL2e3QeS6zHYs5Kou+GJKLd/c3b23VhFUdYDA2'+
			'Zz+Xt1N/zptpFCzRVODdaqw0YImh2HwJpXM3NX5IqiPBgYkMB9vG2k4HjcyOF8uR4DzY4jyu2nu0G2AWZz+SV/5UbxSPvJA90M2fa4TxhJNpe/4XrM90/2Lwc2BjHCU9evpcJvpy7wQpg7Me+6snPwy8ZWvdd4nrbwZvQPMJT7WbPhHE9EXMmjp+ZFKagLmXxFZJY+/yDxajzSccl/evjYXFnbNPrNI3EaLgpPdQBzvguim9q/Mh0xMBwAfPHJNakbXBDpdgymI/o+F8eAZPVuqTW529iuEiM89db0a6dzjk0iDLcJE1hyfUG3Y0M54UtTyY5m/vvOC+vx1gsbAH578twadD6rwUO3Y5A4bQHAXR9wftdKBIbrpW++e7g37NhdKwGJ0+YB3KWzuXza9Rh5mL13VtLtGFyPkbO5fJoGkDFJFDJOIkwZFkDacIK/yj7M'+
			'pMLvzUyHIiGe7tT+7ZfXj/fMIH6wVYYjQOK0NAtA9uO5ILqQFJle1tvc5htLEBEmmcZRJHymCmLFLZqiAcjGGO5BwiSz/Tp208raprGytmm8c3mSv5N9v81HfbT4w/PTAPqiAah+DjFOIkwqjaPsa1z1jAaghphAHuCliDCpNICqyJrnjNMuwlSlAWwIY7gHCdMGXSoWqgzlqiRfHQtJnAaGctVSsVD1X1OrSX7o4GPkIiyrwH8RdVniNPD0sA5/dOJpy68+lAECSOL/ZTminiPakQjDcqecpCywhn6ee1HiNL8kUvavHSc6FUU5nJmZ3Ypy+zc1Oz5wTixGeEqejLF//1Nzm3+/Pto+CALH0xamxR3QlJdrLtW1FY9I4n7rZSXuAMBQLi6JWwgz9fulYuHOibbWzhVFWc/MXZGj3H5as+Pw0DEePQu4H0vFwtdt7Z'+
			'0GVRTlgQ9pONEzW0n/sRK4xU59ut6ZQMYS/N7Vw8YEDhuhkcJJnIZpcQc8bd3vtHK+xr6A+f8vAXcBHa8iehfY1s8QEjkHRvgZ4l92HeabU+BzJgAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="social-fb";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 10px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._socialfb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._socialfb.onclick=function (e) {
			player.openUrl("https:\/\/facebook.com\/sharer.php?u=http:\/\/sphered.com.ua\/&t=Sphered","_blank");
		}
		me._socialfb.onmouseenter=function (e) {
			me.elementMouseOver['socialfb']=true;
		}
		me._socialfb.onmouseleave=function (e) {
			me._socialfb.style.transition='none';
			me._socialfb.style.opacity='0.8';
			me._socialfb.style.visibility=me._socialfb.ggVisible?'inherit':'hidden';
			me.elementMouseOver['socialfb']=false;
		}
		me._socialfb.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['socialfb']) {
				me._socialfb.style.transition='none';
				me._socialfb.style.opacity='1';
				me._socialfb.style.visibility=me._socialfb.ggVisible?'inherit':'hidden';
			}
		}
		me._socialfb.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._socialfb);
		el=me._socialtw=document.createElement('div');
		els=me._socialtw__img=document.createElement('img');
		els.className='ggskin ggskin_socialtw';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFh0lEQVRYhdWZb2gTZxzHv71cml7+XP5yrcaEiSs0pmht16qIG9sb3WDDvVDmC9leTCQJE1QYmyCb+GZMpm+WZKPCEBmOVRh74+yLOUFYxcvwz9JZjCJrrE2zNH/b/L3UvchdvbZJ7hJS575v7rjnd/d87vc89/s9z+/a0KRcbo8TwHYATgA2AOv4IwCEATzmj+MAxvw+73gz/bQ1CEUDOAhgL0eqbHGDHQmDDRltJwAgbqjwmZJhAIBubgbGZBim5CRIrhAGMAJg2O/zplsKKAI7GrV040lXL6KW7gZeDWBiIayNBMHEQgBwRi6oJKDL7dkN4GzCYKeDPW8i16FvCGy5qHwKvRO/wJicTAM44vd5rzQN6HJ7TnKk6sNgz1sNe0xKTCyE3onLILnCOb'+
			'/P+1ktO0UduLMZLXMg0LcfKXptS+EAYF5tRoRxwJQM9+/Y7LQFWHZUNiAPt4/t249iu6blcII4sgMRxgFL/JGzFuQKQJfbczKjZQ6wffvBkapVgxO0QJBiSH2AZa/VBHS5Pbs5UnUysMqeqwY5a1oPayTYv3Wg/68Ayz5YAciHkkt3N76jWo05JyWO7MC82oyu6MTrg4NDFwIsWwAAQmRzLGGw063+WocsqvYhi6rdoVeSUrZRSzcSBrsQcwHwYYb33r3r2w7VjXNDFlX7zVihKAdsj11DHd5I67QksRjKZnLl8seB2SQAvG3XUNNZrnzh4VxWfB+VT2HnjW8BwOH3edOCBw9GLd2SQfiLV0yGU1uMtBy445sMtBgOADopheL8TsZ8fidj3m2lqKvT+QKtXGqT69ALMfcg8GyI9z7p6q3bqVVNKrQk0bbLqqZObTHS'+
			'yx8siFYSbYc30jqpl5gvPV34vK/6y/IsewGAcLk9To5U2RqZe7usaur7VxnzkEXVvrytR69ULvdcNWmUbcSZ8WQmXVp4urwtaukGR6psLrfHSQDYHjfYJaGmslx5jnv2sE5Kofh6m8V48TXGvMeuoaxqsmZWqqY9v878cy9V4mq180zbSQDOhMFWy26Jvgtl5j5y6JcM3wadkjy+ybA4VA8ztTsVq5rnxEoYbGBiIScBwCas5+rJoVeS+17SqsVerKYNOulwMpMrl6VseCYbgcpKWFL3UiVOo2wj5MwvKUVkAPJaRwCwxWUO8ZWpXK5pKpFuxQslKRueyUZIGYr1zUR6Tu4cq6ffpnN5ubYEgLCwh5BSurTw9Ox4KiNnDtXSnXixWO/rFcQzhQlUdl8NqZNSNBRSxBq+n55vwPwxASCsm5uRfcfNWKE4OpVtai6OTm'+
			'VzcnM5zxQmAIwbZQ6xoBO3EulP/4gn78SLsjoDKvHxdDCVkWvPM40TAMZMycmGAAGAjRWKcr5GAe7Q77G4VHAWi2caE5ZbN273vls3H7t7aK1w3k0ryR1Mh6z9wKW/57Nf/pmU7TmgsuPrC/4U9vu824QwM7I2Eqx708+T2dwaSkF88LJOIwfuTrxYfP96dLZROADgWUYAQEhLw0wsdJTKp2quCaeyXPnErUT6dDCVeWMN1TFgbld2UUsXCJEcV76fLnFXp/OFqSzXVCii8imh+jAMiDbuLrfnWMJgP8r2vdfMc1umwds/wJicPOP3eb8Clu5Jho3JyTRP/5+IiYWEksiwcG0RkC/kHOmduAwqn3rucJWazWWgUq9ZLCotmUMBln2wdaBfb0qG+yOMAwuE5MqpJSK5AgbujoDKp8/5fd5z4rYVKSvAstd2bHbaLPFH'+
			'zucBSXIFDN6+CN1c9Ee/z/vJ8vaqOTXAsqMC5KxpPTiyY1XgqHwKA3dHBLgj1WxqJn0eUm+NBPvn1WbMq80thWNiIfGwrvCcoP93AVME+eKWgGuAvlhF9Bqwy39D0Pw50MLfEP8CaNl31HlOnCcAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="social-tw";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 53px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._socialtw.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._socialtw.onclick=function (e) {
			player.openUrl("https:\/\/twitter.com\/share?url=http:\/\/sphered.com.ua\/&text=Sphered","_blank");
		}
		me._socialtw.onmouseenter=function (e) {
			me.elementMouseOver['socialtw']=true;
		}
		me._socialtw.onmouseleave=function (e) {
			me._socialtw.style.transition='none';
			me._socialtw.style.opacity='0.8';
			me._socialtw.style.visibility=me._socialtw.ggVisible?'inherit':'hidden';
			me.elementMouseOver['socialtw']=false;
		}
		me._socialtw.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['socialtw']) {
				me._socialtw.style.transition='none';
				me._socialtw.style.opacity='1';
				me._socialtw.style.visibility=me._socialtw.ggVisible?'inherit':'hidden';
			}
		}
		me._socialtw.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._socialtw);
		el=me._socialvk=document.createElement('div');
		els=me._socialvk__img=document.createElement('img');
		els.className='ggskin ggskin_socialvk';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFeklEQVRYhdWZW2zbVBjH/3aOc2uahCxk7JJp2phGl2md2qbTJkCIwYS4PqBtGtIeQOwhyQPaQIhH+sQDsAmJJEKdeINJjDt7YBekwUTL5iBtot0WrfDQdFTp3DZO28R27JiH2CFNnNta1vF/cXLO5+Pf+XzO58+fKdylQuFIAMBuAAEAfgDrtSMApABMaMdRAMPxWHT0bq5DtQnlBHAEwH6VIn7F7IZidkEhDgCAYnYDAExSpnSU52GSeJikDChVTgE4DWAwHotmlxWwAuyYbPGiYFsN2eJtY2oAETkw+TSIyAHA8VZBmwKGwpFnAJxQzG6n4NyKosnaFli1aEWANZuEScpkARyNx6I/NrI3NYEbUCkyILi7LKJjE1SaLAkOAFSaoGB7CEXGYSHi7E'+
			'vBYJ8rwbIX2wYMhSMnisRxOO/phsI4lwxWrSKxQ7b6QCS+p793pz/BsmdbBtTgDuQ83VBp87LD6VJpAtnmAxFnA/UgawBD4chAkTgO5zzdUKml39KmouhKyJrbvQgwFI48o1JkIP8fe84IUrF4wOTTPcFg3/UEy46VuyrgnAAu590BZ7shZLlERA62zGgWwC49BNEV/W8qZveKwQGAbPFCMbv1mAtA86DmvRsL3l1LjnNLFa0I6OAuA0BXPBbN6h48Ilu8Kw4HAEWTVX9KHQEAfZvuL9hW1xj7fS5itzLlZTDN5xSOzyn6/+f3POLYvM7DVJ7z5+2Zwpmhm/OVbXYrQ/l9rkV21WNVqmBbDSJy+wF8SELhSECliN9o7b116LFV1W2xb36bTY5zEgCse9BJNq31LNrum9Z6zNfGJoXUFC/rbW+/8viqBzptNSHtjY/O'+
			'pI0AZYsXKkX8oXAkQAPYrWch1frr7xmpum3XNn95HXzy3ZXM7Fy+xguVXt+zfYPNCM7ovEppTLtpAAHF7DI0Ym9MCNVtvVvX2bwue/mCzS60r39Lh1H7qQvXGmYyGlOABuDX87lqDY2M540AXn5ie2ejwVNTfAEA9vZutht57/fk7by+TOoClpj8NEqZcF19e+n6XHXbto0+y9YN3oaPGq/LbtrXv6Vm5pPTc/KXF0dqxqyj9SUP1lmDAHD11qRotBZfe67PvXPLGstar5Op7nuyZ3PH6y8E3VYzWZRvCpKsfnbuKp8TCmozMo3JTzczBICvfx6tmbHVTKhXn+2tgQCAp4MPd6xZ1VmTaZy7cmu+cne3IhpASn+HqKfUFC+fZ8cW2hl4qdKYUjRKb19NdWbo5vzk9Fxbs6/Wi492de7ZvsHWxikTJQ/K800tAeDkD2'+
			'xGkOSm66eRDu7d4WwFUmNK0QBGTRLf0uAcn1M+/mp4phnkeXZs4YNTl6br2R3cu8PZLApoTKM0gOFma7BSqSlefv/zX6aNdrauWxOclJri5UaTOfRUd8MXHY1p2JRg2TvBYN+BIuNwFYm9JcicWFAvX08J2QWhaLcyVGUwFiRZ/f7XG3MFuYjsglhMjt8Ruzb6LDYLsyhiUBRFXUgYbzwicmCEdCoei76nh4LTTD59rN1kdWhkPD80Mp5vZJOa4uV3P/2Ja2dcJp8GSlWIckY9SEQOtFLz6L3nohVBrz4MAhqglv8ft2aTK4hWksZw3OidZNAkZbIa/YqIiJxeEhnU28qAGvFRK59ckVtNKwKsfBIo1WvKqdiiVCjBsmPBYJ+LSHyPbPMBVEuP6iWLUmXYZ/8AXRROxmPRk5V9NblagmUv9vfu9BNxNnAvIClVhn3m'+
			'Gmh5/ot4LPpOdb9hbSbBsmd1SMXiWZaqlpFoRSh5rgR31MimbnVLg3Qx+XRPkdjRahBvVUTkYPv3ttZ4Ttd9X8D8/5eA64DeX0X0OrDVnyGc2m9gGT9D/AP3nY2J9IOZxwAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="social-vk";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 96px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._socialvk.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._socialvk.onclick=function (e) {
			player.openUrl("http:\/\/vk.com\/share.php?url=http:\/\/sphered.com.ua\/&title=Sphered","_blank");
		}
		me._socialvk.onmouseenter=function (e) {
			me.elementMouseOver['socialvk']=true;
		}
		me._socialvk.onmouseleave=function (e) {
			me._socialvk.style.transition='none';
			me._socialvk.style.opacity='0.8';
			me._socialvk.style.visibility=me._socialvk.ggVisible?'inherit':'hidden';
			me.elementMouseOver['socialvk']=false;
		}
		me._socialvk.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['socialvk']) {
				me._socialvk.style.transition='none';
				me._socialvk.style.opacity='1';
				me._socialvk.style.visibility=me._socialvk.ggVisible?'inherit':'hidden';
			}
		}
		me._socialvk.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._socialvk);
		el=me._socialok=document.createElement('div');
		els=me._socialok__img=document.createElement('img');
		els.className='ggskin ggskin_socialok';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="social-ok";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 139px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._socialok.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._socialok.onclick=function (e) {
			player.openUrl("http:\/\/odnoklassniki.ru\/dk?st.cmd=addShare&st._surl=http:\/\/sphered.com.ua\/&title=Sphered","_blank");
		}
		me._socialok.onmouseenter=function (e) {
			me.elementMouseOver['socialok']=true;
		}
		me._socialok.onmouseleave=function (e) {
			me._socialok.style.transition='none';
			me._socialok.style.opacity='0.8';
			me._socialok.style.visibility=me._socialok.ggVisible?'inherit':'hidden';
			me.elementMouseOver['socialok']=false;
		}
		me._socialok.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['socialok']) {
				me._socialok.style.transition='none';
				me._socialok.style.opacity='1';
				me._socialok.style.visibility=me._socialok.ggVisible?'inherit':'hidden';
			}
		}
		me._socialok.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._socialok);
		el=me._socialgp=document.createElement('div');
		els=me._socialgp__img=document.createElement('img');
		els.className='ggskin ggskin_socialgp';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="social-gp";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 182px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._socialgp.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._socialgp.onclick=function (e) {
			player.openUrl("https:\/\/plus.google.com\/share?url=http:\/\/sphered.com.ua\/","_blank");
		}
		me._socialgp.onmouseenter=function (e) {
			me.elementMouseOver['socialgp']=true;
		}
		me._socialgp.onmouseleave=function (e) {
			me._socialgp.style.transition='none';
			me._socialgp.style.opacity='0.8';
			me._socialgp.style.visibility=me._socialgp.ggVisible?'inherit':'hidden';
			me.elementMouseOver['socialgp']=false;
		}
		me._socialgp.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['socialgp']) {
				me._socialgp.style.transition='none';
				me._socialgp.style.opacity='1';
				me._socialgp.style.visibility=me._socialgp.ggVisible?'inherit':'hidden';
			}
		}
		me._socialgp.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._socialgp);
		el=me._socialpinterest=document.createElement('div');
		els=me._socialpinterest__img=document.createElement('img');
		els.className='ggskin ggskin_socialpinterest';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="social-pinterest";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 224px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._socialpinterest.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._socialpinterest.onclick=function (e) {
			player.openUrl("http:\/\/pinterest.com\/pin\/create\/button\/?url={URI-encoded URL of the page to pin}&media={URI-encoded URL of the image to pin}&description={optional URI-encoded description}","_blank");
		}
		me._socialpinterest.onmouseenter=function (e) {
			me.elementMouseOver['socialpinterest']=true;
		}
		me._socialpinterest.onmouseleave=function (e) {
			me._socialpinterest.style.transition='none';
			me._socialpinterest.style.opacity='0.8';
			me._socialpinterest.style.visibility=me._socialpinterest.ggVisible?'inherit':'hidden';
			me.elementMouseOver['socialpinterest']=false;
		}
		me._socialpinterest.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['socialpinterest']) {
				me._socialpinterest.style.transition='none';
				me._socialpinterest.style.opacity='1';
				me._socialpinterest.style.visibility=me._socialpinterest.ggVisible?'inherit':'hidden';
			}
		}
		me._socialpinterest.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._socialpinterest);
		el=me._sharetext=document.createElement('div');
		els=me._sharetext__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="share-text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : inherit;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border : 0px solid #000000;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._sharetext.ggUpdateText=function() {
			var params = [];
			var hs = player._("Share on", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._sharetext.ggUpdateText();
		el.appendChild(els);
		me._sharetext.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._sharetext.ggUpdatePosition=function (useTransition) {
		}
		me._socialbar.appendChild(me._sharetext);
		me.divSkin.appendChild(me._socialbar);
		el=me._logomono=document.createElement('div');
		els=me._logomono__img=document.createElement('img');
		els.className='ggskin ggskin_logomono';
		hs=basePath + 'images/logomono.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="logo-mono";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 14px;';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='right : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._logomono.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._logomono.onclick=function (e) {
			player.openUrl("https:\/\/ctuet.edu.vn\/","_blank");
		}
		me._logomono.onmouseenter=function (e) {
			me.elementMouseOver['logomono']=true;
		}
		me._logomono.onmouseleave=function (e) {
			if (player.transitionsDisabled) {
				me._logomono.style.transition='none';
			} else {
				me._logomono.style.transition='all 500ms ease-out 0ms';
			}
			me._logomono.style.opacity='0.5';
			me._logomono.style.visibility=me._logomono.ggVisible?'inherit':'hidden';
			me.elementMouseOver['logomono']=false;
		}
		me._logomono.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['logomono']) {
				if (player.transitionsDisabled) {
					me._logomono.style.transition='none';
				} else {
					me._logomono.style.transition='all 500ms ease-out 0ms';
				}
				me._logomono.style.opacity='1';
				me._logomono.style.visibility=me._logomono.ggVisible?'inherit':'hidden';
			}
		}
		me._logomono.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._logomono);
		el=me._loading_container=document.createElement('div');
		el.ggId="loading_container";
		el.ggDx=0;
		el.ggDy=-9;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 192px;';
		hs+='left : calc(50% - ((192px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((192px + 0px) / 2) - 9px);';
		hs+='visibility : inherit;';
		hs+='width : 192px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._loading_container.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading_container.ggUpdatePosition=function (useTransition) {
		}
		el=me._loadback=document.createElement('div');
		el.ggId="load-back";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #000000;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 4480px;';
		hs+='left : -2224px;';
		hs+='opacity : 0.4;';
		hs+='position : absolute;';
		hs+='top : -2135px;';
		hs+='visibility : inherit;';
		hs+='width : 4640px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._loadback.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadback.ggUpdatePosition=function (useTransition) {
		}
		me._loading_container.appendChild(me._loadback);
		el=me._loading_image=document.createElement('div');
		els=me._loading_image__img=document.createElement('img');
		els.className='ggskin ggskin_loading_image';
		hs=basePath + 'images/loading_image.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 192px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 192px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._loading_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_image.ggUpdatePosition=function (useTransition) {
		}
		me._loading_container.appendChild(me._loading_image);
		el=me._loading_text=document.createElement('div');
		els=me._loading_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loading_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='color : rgba(224,224,224,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : 66px;';
		hs+='position : absolute;';
		hs+='top : 86px;';
		hs+='visibility : inherit;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border : 0px solid #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loading_text.ggUpdateText=function() {
			var params = [];
			params.push(player._(String((player.getPercentLoaded()*100.0).toFixed(0))));
			var hs = player._("%1%", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loading_text.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loading_text.ggUpdateText();
		});
		el.appendChild(els);
		me._loading_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_text.ggUpdatePosition=function (useTransition) {
		}
		me._loading_container.appendChild(me._loading_text);
		me.divSkin.appendChild(me._loading_container);
		el=me._marker_node7=document.createElement('div');
		el.ggMarkerNodeId='';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="marker_node7";
		el.ggDy=-137;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 137px);';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._marker_node7.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._marker_node7.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text6=document.createElement('div');
		els=me._menu_text6__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggDx=75;
		el.ggDy=14;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'translate(-50%, -50%) ' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : calc(50% - ((0px + 0px) / 2) + 75px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((0px + 0px) / 2) + 14px);';
		hs+='transform : translate(-50%, -50%);;';
		hs+='visibility : inherit;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border : 0px solid #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 27px 0px 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text6.ggUpdateText=function() {
			var params = [];
			var hs = player._("H\u1ee7y Tham Quan", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text6.ggUpdateText();
		el.appendChild(els);
		me._menu_text6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text6.onclick=function (e) {
			player.stopAutorotate();
		}
		me._menu_text6.ggUpdatePosition=function (useTransition) {
		}
		me._marker_node7.appendChild(me._menu_text6);
		me.divSkin.appendChild(me._marker_node7);
		el=me._marker_node6=document.createElement('div');
		el.ggMarkerNodeId='';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="marker_node6";
		el.ggDy=-137;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 137px);';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._marker_node6.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._marker_node6.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text5=document.createElement('div');
		els=me._menu_text5__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggDx=75;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #ffffff;';
		hs+='border-radius : 1px;';
		hs+='bottom : -27px;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 25px;';
		hs+='left : calc(50% - ((150px + 0px) / 2) + 75px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px 27px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text5.ggUpdateText=function() {
			var params = [];
			var hs = player._("Tham Quan", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text5.ggUpdateText();
		el.appendChild(els);
		me._menu_text5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text5.onclick=function (e) {
			player.startAnimation("Animation01");
		}
		me._menu_text5.ggUpdatePosition=function (useTransition) {
		}
		me._marker_node6.appendChild(me._menu_text5);
		me.divSkin.appendChild(me._marker_node6);
		el=me._marker_node5=document.createElement('div');
		el.ggMarkerNodeId='{node8}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="marker_node5";
		el.ggDy=-137;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 137px);';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._marker_node5.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._marker_node5.onclick=function (e) {
			player.openNext('{node8}');
		}
		me._marker_node5.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text4=document.createElement('div');
		els=me._menu_text4__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggDx=64;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #ffffff;';
		hs+='border-radius : 1px;';
		hs+='bottom : -26px;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 25px;';
		hs+='left : calc(50% - ((150px + 0px) / 2) + 64px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text4.ggUpdateText=function() {
			var params = [];
			var hs = player._("S\xe2n Ch\xednh", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text4.ggUpdateText();
		el.appendChild(els);
		me._menu_text4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text4.ggUpdatePosition=function (useTransition) {
		}
		me._marker_node5.appendChild(me._menu_text4);
		me.divSkin.appendChild(me._marker_node5);
		el=me._marker_node4=document.createElement('div');
		el.ggMarkerNodeId='{node5}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="marker_node4";
		el.ggDy=-137;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 137px);';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._marker_node4.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._marker_node4.onclick=function (e) {
			player.openNext('{node5}');
		}
		me._marker_node4.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text3=document.createElement('div');
		els=me._menu_text3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggDx=64;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #ffffff;';
		hs+='border-radius : 1px;';
		hs+='bottom : -26px;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 25px;';
		hs+='left : calc(50% - ((150px + 0px) / 2) + 64px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text3.ggUpdateText=function() {
			var params = [];
			var hs = player._("Ph\xf2ng M\xe1y", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text3.ggUpdateText();
		el.appendChild(els);
		me._menu_text3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text3.ggUpdatePosition=function (useTransition) {
		}
		me._marker_node4.appendChild(me._menu_text3);
		me.divSkin.appendChild(me._marker_node4);
		el=me._marker_node3=document.createElement('div');
		el.ggMarkerNodeId='{node6}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="marker_node3";
		el.ggDy=-137;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 137px);';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._marker_node3.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._marker_node3.onclick=function (e) {
			player.openNext('{node6}');
		}
		me._marker_node3.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text2=document.createElement('div');
		els=me._menu_text2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggDx=64;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #ffffff;';
		hs+='border-radius : 1px;';
		hs+='bottom : -26px;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 25px;';
		hs+='left : calc(50% - ((150px + 0px) / 2) + 64px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text2.ggUpdateText=function() {
			var params = [];
			var hs = player._("D\xe3y B", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text2.ggUpdateText();
		el.appendChild(els);
		me._menu_text2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text2.ggUpdatePosition=function (useTransition) {
		}
		me._marker_node3.appendChild(me._menu_text2);
		me.divSkin.appendChild(me._marker_node3);
		el=me._marker_node2=document.createElement('div');
		el.ggMarkerNodeId='{node2}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="marker_node2";
		el.ggDy=-137;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 137px);';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._marker_node2.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._marker_node2.onclick=function (e) {
			player.openNext('{node2}');
		}
		me._marker_node2.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text1=document.createElement('div');
		els=me._menu_text1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggDx=64;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #ffffff;';
		hs+='border-radius : 1px;';
		hs+='bottom : -26px;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 25px;';
		hs+='left : calc(50% - ((150px + 0px) / 2) + 64px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text1.ggUpdateText=function() {
			var params = [];
			var hs = player._("D\xe3y C", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text1.ggUpdateText();
		el.appendChild(els);
		me._menu_text1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text1.ggUpdatePosition=function (useTransition) {
		}
		me._marker_node2.appendChild(me._menu_text1);
		me.divSkin.appendChild(me._marker_node2);
		el=me._marker_node1=document.createElement('div');
		el.ggMarkerNodeId='{node1}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="marker_node1";
		el.ggDy=-137;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 137px);';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._marker_node1.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._marker_node1.onclick=function (e) {
			player.openNext('{node1}');
		}
		me._marker_node1.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text0=document.createElement('div');
		els=me._menu_text0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggDx=64;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #ffffff;';
		hs+='border-radius : 1px;';
		hs+='bottom : -27px;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 25px;';
		hs+='left : calc(50% - ((150px + 0px) / 2) + 64px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text0.ggUpdateText=function() {
			var params = [];
			var hs = player._("Trang Ch\u1ee7", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text0.ggUpdateText();
		el.appendChild(els);
		me._menu_text0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text0.ggUpdatePosition=function (useTransition) {
		}
		me._marker_node1.appendChild(me._menu_text0);
		me.divSkin.appendChild(me._marker_node1);
		el=me._button_menu=document.createElement('div');
		els=me._button_menu__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTI4LjQ5OSwxNS4zNDRsLTcuNjQsMS45ODNWOS4yNDJsNy42NC0xLjkwNVYxNS4zNDR6IE0xOS44MzYsOS4yMjl2Ny45MzNsLTcuNjczLTMuODMzVjUuNDE2ICAgQzEyLjE2Myw1LjQxNiwxOS43NzgsOS4yMDksMTkuODM2LDkuMjI5eiBNMTEuMTQxLDUuMTU1djguMDkyTDMuNSwxNS4xNjZWNy4wNkwxMS4xNDEsNS4xNTV6IE0zLjUsMTYuMjJsNy42'+
			'NDEtMS45MTl2OC4zMiAgIGMwLDAuMDQ1LDAuMDA4LDAuMDksMC4wMTksMC4xMzJMMy41LDI0LjY2MlYxNi4yMnogTTEyLjMzNSwyMi44MzhjLTAuMDYzLTAuMDMyLTAuMTI3LTAuMDU4LTAuMTk0LTAuMDggICBjMC4wMTItMC4wNDQsMC4wMjEtMC4wOSwwLjAyMS0wLjEzN3YtOC4xNDlsNy42NzMsMy44MzJ2OC4yODFMMTIuMzM1LDIyLjgzOHogTTIwLjg1OSwyNi44NDZ2LTguNDYybDcuNjQtMS45ODJMMjguNSwyNC45NCAgIEwyMC44NTksMjYuODQ2eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTI4Lj'+
			'Q5OSwxNS4zNDRsLTcuNjQsMS45ODNWOS4yNDJsNy42NC0xLjkwNVYxNS4zNDR6IE0xOS44MzYsOS4yMjl2Ny45MzNsLTcuNjczLTMuODMzVjUuNDE2ICAgQzEyLjE2Myw1LjQxNiwxOS43NzgsOS4yMDksMTkuODM2LDkuMjI5eiBNMTEuMTQxLDUuMTU1djguMDkyTDMuNSwxNS4xNjZWNy4wNkwxMS4xNDEsNS4xNTV6IE0zLjUsMTYuMjJsNy42NDEtMS45MTl2OC4zMiAgIGMwLDAuMDQ1LDAuMDA4LDAuMDksMC4wMTksMC4xMzJMMy41LDI0LjY2MlYxNi4yMnogTTEyLjMzNSwyMi44MzhjLTAuMDYzLTAuMDMyLTAuMTI3LTAuMDU4LTAuMTk0LTAuMDggICBjMC4wMTItMC4wNDQsMC4wMjEtMC4wOSww'+
			'LjAyMS0wLjEzN3YtOC4xNDlsNy42NzMsMy44MzJ2OC4yODFMMTIuMzM1LDIyLjgzOHogTTIwLjg1OSwyNi44NDZ2LTguNDYybDcuNjQtMS45ODJMMjguNSwyNC45NCAgIEwyMC44NTksMjYuODQ2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._button_menu__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_menu__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjguNDk5LDE1LjM0NGwtNy42NCwxLjk4M1Y5LjI0Mmw3LjY0LTEuOTA1VjE1LjM0NHogTTE5LjgzNiw5LjIyOXY3LjkzM2wtNy42NzMtMy44MzNWNS40MTYgICBDMTIuMTYzLDUuNDE2LDE5Ljc3OCw5LjIwOSwxOS44MzYsOS4yMjl6IE0xMS4x'+
			'NDEsNS4xNTV2OC4wOTJMMy41LDE1LjE2NlY3LjA2TDExLjE0MSw1LjE1NXogTTMuNSwxNi4yMmw3LjY0MS0xLjkxOXY4LjMyICAgYzAsMC4wNDUsMC4wMDgsMC4wOSwwLjAxOSwwLjEzMkwzLjUsMjQuNjYyVjE2LjIyeiBNMTIuMzM1LDIyLjgzOGMtMC4wNjMtMC4wMzItMC4xMjctMC4wNTgtMC4xOTQtMC4wOCAgIGMwLjAxMi0wLjA0NCwwLjAyMS0wLjA5LDAuMDIxLTAuMTM3di04LjE0OWw3LjY3MywzLjgzMnY4LjI4MUwxMi4zMzUsMjIuODM4eiBNMjAuODU5LDI2Ljg0NnYtOC40NjJsNy42NC0xLjk4MkwyOC41LDI0Ljk0ICAgTDIwLjg1OSwyNi44NDZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9Ii'+
			'MwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiPgogIDxwYXRoIGQ9Ik0yOC40OTksMTUuMzQ0bC03LjY0LDEuOTgzVjkuMjQybDcuNjQtMS45MDVWMTUuMzQ0eiBNMTkuODM2LDkuMjI5djcuOTMzbC03LjY3My0zLjgzM1Y1LjQxNiAgIEMxMi4xNjMsNS40MTYsMTkuNzc4LDkuMjA5LDE5LjgzNiw5LjIyOXogTTExLjE0MSw1LjE1NXY4LjA5MkwzLjUsMTUuMTY2VjcuMDZMMTEuMTQxLDUuMTU1eiBNMy41LDE2LjIybDcuNjQxLTEuOTE5djguMzIgICBjMCwwLjA0NSww'+
			'LjAwOCwwLjA5LDAuMDE5LDAuMTMyTDMuNSwyNC42NjJWMTYuMjJ6IE0xMi4zMzUsMjIuODM4Yy0wLjA2My0wLjAzMi0wLjEyNy0wLjA1OC0wLjE5NC0wLjA4ICAgYzAuMDEyLTAuMDQ0LDAuMDIxLTAuMDksMC4wMjEtMC4xMzd2LTguMTQ5bDcuNjczLDMuODMydjguMjgxTDEyLjMzNSwyMi44Mzh6IE0yMC44NTksMjYuODQ2di04LjQ2Mmw3LjY0LTEuOTgyTDI4LjUsMjQuOTQgICBMMjAuODU5LDI2Ljg0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._button_menu__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="button_menu";
		el.ggDy=-144;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : calc(50% - ((32px + 0px) / 2) - 144px);';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._button_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_menu.onclick=function (e) {
			var flag=me._marker_node1.ggPositonActive;
			if (player.transitionsDisabled) {
				me._marker_node1.style.transition='none';
			} else {
				me._marker_node1.style.transition='all 1000ms ease-out 0ms';
			}
			if (flag) {
				me._marker_node1.ggParameter.rx=0;me._marker_node1.ggParameter.ry=0;
			} else {
				me._marker_node1.ggParameter.rx=-130;me._marker_node1.ggParameter.ry=22;
			}
				me._marker_node1.style.transform=parameterToTransform(me._marker_node1.ggParameter);
			me._marker_node1.ggPositonActive=!flag;
			var flag=me._marker_node2.ggPositonActive;
			if (player.transitionsDisabled) {
				me._marker_node2.style.transition='none';
			} else {
				me._marker_node2.style.transition='all 1000ms ease-out 0ms';
			}
			if (flag) {
				me._marker_node2.ggParameter.rx=0;me._marker_node2.ggParameter.ry=0;
			} else {
				me._marker_node2.ggParameter.rx=-130;me._marker_node2.ggParameter.ry=50;
			}
				me._marker_node2.style.transform=parameterToTransform(me._marker_node2.ggParameter);
			me._marker_node2.ggPositonActive=!flag;
			var flag=me._marker_node3.ggPositonActive;
			if (player.transitionsDisabled) {
				me._marker_node3.style.transition='none';
			} else {
				me._marker_node3.style.transition='all 1000ms ease-out 0ms';
			}
			if (flag) {
				me._marker_node3.ggParameter.rx=0;me._marker_node3.ggParameter.ry=0;
			} else {
				me._marker_node3.ggParameter.rx=-130;me._marker_node3.ggParameter.ry=78;
			}
				me._marker_node3.style.transform=parameterToTransform(me._marker_node3.ggParameter);
			me._marker_node3.ggPositonActive=!flag;
			var flag=me._marker_node4.ggPositonActive;
			if (player.transitionsDisabled) {
				me._marker_node4.style.transition='none';
			} else {
				me._marker_node4.style.transition='all 1000ms ease-out 0ms';
			}
			if (flag) {
				me._marker_node4.ggParameter.rx=0;me._marker_node4.ggParameter.ry=0;
			} else {
				me._marker_node4.ggParameter.rx=-130;me._marker_node4.ggParameter.ry=106;
			}
				me._marker_node4.style.transform=parameterToTransform(me._marker_node4.ggParameter);
			me._marker_node4.ggPositonActive=!flag;
			var flag=me._marker_node5.ggPositonActive;
			if (player.transitionsDisabled) {
				me._marker_node5.style.transition='none';
			} else {
				me._marker_node5.style.transition='all 1000ms ease-out 0ms';
			}
			if (flag) {
				me._marker_node5.ggParameter.rx=0;me._marker_node5.ggParameter.ry=0;
			} else {
				me._marker_node5.ggParameter.rx=-130;me._marker_node5.ggParameter.ry=134;
			}
				me._marker_node5.style.transform=parameterToTransform(me._marker_node5.ggParameter);
			me._marker_node5.ggPositonActive=!flag;
			var flag=me._marker_node6.ggPositonActive;
			if (player.transitionsDisabled) {
				me._marker_node6.style.transition='none';
			} else {
				me._marker_node6.style.transition='all 1000ms ease-out 0ms';
			}
			if (flag) {
				me._marker_node6.ggParameter.rx=0;me._marker_node6.ggParameter.ry=0;
			} else {
				me._marker_node6.ggParameter.rx=-130;me._marker_node6.ggParameter.ry=162;
			}
				me._marker_node6.style.transform=parameterToTransform(me._marker_node6.ggParameter);
			me._marker_node6.ggPositonActive=!flag;
			var flag=me._marker_node7.ggPositonActive;
			if (player.transitionsDisabled) {
				me._marker_node7.style.transition='none';
			} else {
				me._marker_node7.style.transition='all 1000ms ease-out 0ms';
			}
			if (flag) {
				me._marker_node7.ggParameter.rx=0;me._marker_node7.ggParameter.ry=0;
			} else {
				me._marker_node7.ggParameter.rx=-130;me._marker_node7.ggParameter.ry=190;
			}
				me._marker_node7.style.transform=parameterToTransform(me._marker_node7.ggParameter);
			me._marker_node7.ggPositonActive=!flag;
		}
		me._button_menu.onmouseenter=function (e) {
			me._button_menu__img.style.visibility='hidden';
			me._button_menu__imgo.style.visibility='inherit';
			me.elementMouseOver['button_menu']=true;
		}
		me._button_menu.onmouseleave=function (e) {
			me._button_menu__img.style.visibility='inherit';
			me._button_menu__imgo.style.visibility='hidden';
			me.elementMouseOver['button_menu']=false;
		}
		me._button_menu.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._button_menu);
		el=me._hide_template_dropdown=document.createElement('div');
		el.ggId="hide_template_dropdown";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 28px;';
		hs+='left : -371px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -30px;';
		hs+='visibility : hidden;';
		hs+='width : 160px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._hide_template_dropdown.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hide_template_dropdown.ggUpdatePosition=function (useTransition) {
		}
		el=me._markertemplate=document.createElement('div');
		el.ggMarkerNodeId='';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="markertemplate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._markertemplate.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._markertemplate.ggUpdatePosition=function (useTransition) {
		}
		el=me._menu_text=document.createElement('div');
		els=me._menu_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="menu_text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #ffffff;';
		hs+='border-radius : 1px;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 25px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._menu_text.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._menu_text.ggUpdateText();
		player.addListener('changenode', function() {
			me._menu_text.ggUpdateText();
		});
		el.appendChild(els);
		me._menu_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._menu_text.ggUpdatePosition=function (useTransition) {
		}
		me._markertemplate.appendChild(me._menu_text);
		me._hide_template_dropdown.appendChild(me._markertemplate);
		me.divSkin.appendChild(me._hide_template_dropdown);
		el=me._controller0=document.createElement('div');
		el.ggId="controller";
		el.ggDx=21;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 14px;';
		hs+='height : 47px;';
		hs+='left : calc(50% - ((492px + 0px) / 2) + 21px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 492px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._controller0.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controller0.ggUpdatePosition=function (useTransition) {
		}
		el=me._up=document.createElement('div');
		els=me._up__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTE2LjkxOSwxMC45MjNjLTAuMjI3LTAuMjUxLTAuNTUxLTAuMzk2LTAuODg5LTAuMzk2Yy0wLjMzNywwLTAuNjYzLDAuMTQ1LTAuODg5LDAuMzk2bC01LjgyNyw2LjQ2OCAgICBjLTAuNDQyLDAuNDkxLTAuNDAzLDEuMjQ4LDAuMDg4LDEuNjg5YzAuNDkxLDAuNDQyLDEuMjQ3LDAuNDAzLDEuNjg5LTAuMDg4bDQuOTM4LTUuNDgxbDQuOTM4LDUuNDgx'+
			'ICAgIGMwLjIzNiwwLjI2MywwLjU2MywwLjM5NiwwLjg5LDAuMzk2YzAuMjg1LDAsMC41NzEtMC4xMDIsMC44LTAuMzA4YzAuNDkxLTAuNDQxLDAuNTMtMS4xOTgsMC4wODgtMS42ODlMMTYuOTE5LDEwLjkyM3ogTTE2LDMuNSAgICBDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiAgICAgTTIzLjE0NywyMy4xNDZjLTEuODMzLDEuODMxLTQuMzUzLDIuOTYtNy4xNDcsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3Lj'+
			'AyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2ICAgIGMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDcsMi45NjEgICAgYzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDZ6Ii8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMTYuOTE5LDEwLjkyM2MtMC4yMjctMC4yNTEtMC41NTEtMC4z'+
			'OTYtMC44ODktMC4zOTZjLTAuMzM3LDAtMC42NjMsMC4xNDUtMC44ODksMC4zOTZsLTUuODI3LDYuNDY4ICAgIGMtMC40NDIsMC40OTEtMC40MDMsMS4yNDgsMC4wODgsMS42ODljMC40OTEsMC40NDIsMS4yNDcsMC40MDMsMS42ODktMC4wODhsNC45MzgtNS40ODFsNC45MzgsNS40ODEgICAgYzAuMjM2LDAuMjYzLDAuNTYzLDAuMzk2LDAuODksMC4zOTZjMC4yODUsMCwwLjU3MS0wLjEwMiwwLjgtMC4zMDhjMC40OTEtMC40NDEsMC41My0xLjE5OCwwLjA4OC0xLjY4OUwxNi45MTksMTAuOTIzeiBNMTYsMy41ICAgIEM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLj'+
			'Q5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6ICAgICBNMjMuMTQ3LDIzLjE0NmMtMS44MzMsMS44MzEtNC4zNTMsMi45Ni03LjE0NywyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYgICAgYzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjFjMi43OTUsMC4wMDEsNS4zMTMsMS4xMyw3LjE0NywyLjk2MSAgICBjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3'+
			'LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ3LDIzLjE0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._up__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._up__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMTYuOTE5LDEwLjkyM2MtMC4yMjctMC4yNTEtMC41NTEtMC4zOTYtMC44ODktMC4zOTZjLTAuMzM3LDAtMC42NjMsMC4xNDUtMC44ODksMC4zOTZsLTUuODI3LDYuNDY4ICAgIGMtMC40NDIsMC40OTEtMC40MDMsMS4yNDgsMC4wODgsMS42ODlj'+
			'MC40OTEsMC40NDIsMS4yNDcsMC40MDMsMS42ODktMC4wODhsNC45MzgtNS40ODFsNC45MzgsNS40ODEgICAgYzAuMjM2LDAuMjYzLDAuNTYzLDAuMzk2LDAuODksMC4zOTZjMC4yODUsMCwwLjU3MS0wLjEwMiwwLjgtMC4zMDhjMC40OTEtMC40NDEsMC41My0xLjE5OCwwLjA4OC0xLjY4OUwxNi45MTksMTAuOTIzeiBNMTYsMy41ICAgIEM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6ICAgICBNMjMuMTQ3LDIzLjE0NmMtMS'+
			'44MzMsMS44MzEtNC4zNTMsMi45Ni03LjE0NywyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYgICAgYzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjFjMi43OTUsMC4wMDEsNS4zMTMsMS4xMyw3LjE0NywyLjk2MSAgICBjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ3LDIzLjE0NnoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdp'+
			'ZHRoPSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSI+CiAgPHBhdGggZD0iTTE2LjkxOSwxMC45MjNjLTAuMjI3LTAuMjUxLTAuNTUxLTAuMzk2LTAuODg5LTAuMzk2Yy0wLjMzNywwLTAuNjYzLDAuMTQ1LTAuODg5LDAuMzk2bC01LjgyNyw2LjQ2OCAgICBjLTAuNDQyLDAuNDkxLTAuNDAzLDEuMjQ4LDAuMDg4LDEuNjg5YzAuNDkxLDAuNDQyLDEuMjQ3LDAuNDAzLDEuNjg5LTAuMDg4bDQuOTM4LTUuNDgxbDQuOTM4LDUuNDgxICAgIGMwLjIzNiwwLjI2MywwLjU2MywwLjM5NiwwLjg5LDAuMzk2YzAuMjg1LDAsMC41NzEtMC4xMD'+
			'IsMC44LTAuMzA4YzAuNDkxLTAuNDQxLDAuNTMtMS4xOTgsMC4wODgtMS42ODlMMTYuOTE5LDEwLjkyM3ogTTE2LDMuNSAgICBDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiAgICAgTTIzLjE0NywyMy4xNDZjLTEuODMzLDEuODMxLTQuMzUzLDIuOTYtNy4xNDcsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2ICAgIGMwLjAwMS0yLjc5NSwxLjEyOS01LjMx'+
			'NCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDcsMi45NjEgICAgYzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDZ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._up__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="up";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 40px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._up.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._up.onmouseenter=function (e) {
			me._up__img.style.visibility='hidden';
			me._up__imgo.style.visibility='inherit';
			me.elementMouseOver['up']=true;
		}
		me._up.onmousedown=function (e) {
			me.elementMouseDown['up']=true;
		}
		me._up.onmouseup=function (e) {
			me.elementMouseDown['up']=false;
		}
		me._up.onmouseleave=function (e) {
			me._up__img.style.visibility='inherit';
			me._up__imgo.style.visibility='hidden';
			me.elementMouseDown['up']=false;
			me.elementMouseOver['up']=false;
		}
		me._up.ggUpdateConditionTimer=function () {
			if (me.elementMouseDown['up']) {
				player.changeTiltLog(1,true);
			}
		}
		me._up.ggUpdatePosition=function (useTransition) {
		}
		me._controller0.appendChild(me._up);
		el=me._down=document.createElement('div');
		els=me._down__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTIwLjkwOCwxMy4wMDdsLTQuOTM4LDUuNDgxbC00LjkzOC01LjQ4MWMtMC40NDMtMC40OTEtMS4xOTktMC41MzEtMS42ODktMC4wODggICAgYy0wLjQ5MSwwLjQ0Mi0wLjUzLDEuMTk5LTAuMDg4LDEuNjg5bDUuODI3LDYuNDY4YzAuMjI2LDAuMjUsMC41NTEsMC4zOTYsMC44ODksMC4zOTZzMC42NjMtMC4xNDYsMC44ODktMC4zOTZsNS44MjctNi40'+
			'NjggICAgYzAuNDQyLTAuNDkxLDAuNDAyLTEuMjQ4LTAuMDg4LTEuNjg5QzIyLjEwNiwxMi40NzcsMjEuMzUsMTIuNTE3LDIwLjkwOCwxMy4wMDd6IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTYgICAgYzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NywyMy4xNDYgICAgYy0xLjgzMywxLjgzMS00LjM1MywyLjk2LTcuMTQ3LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiAgIC'+
			'BjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ3LDIuOTYxICAgIGMxLjgzMSwxLjgzMywyLjk1OSw0LjM1MiwyLjk2LDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDcsMjMuMTQ2eiIvPgogPC9nPgogPGc+CiAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTTIwLjkwOCwxMy4wMDdsLTQuOTM4LDUuNDgxbC00LjkzOC01LjQ4MWMtMC40NDMtMC40OTEtMS4xOTktMC41MzEtMS42ODkt'+
			'MC4wODggICAgYy0wLjQ5MSwwLjQ0Mi0wLjUzLDEuMTk5LTAuMDg4LDEuNjg5bDUuODI3LDYuNDY4YzAuMjI2LDAuMjUsMC41NTEsMC4zOTYsMC44ODksMC4zOTZzMC42NjMtMC4xNDYsMC44ODktMC4zOTZsNS44MjctNi40NjggICAgYzAuNDQyLTAuNDkxLDAuNDAyLTEuMjQ4LTAuMDg4LTEuNjg5QzIyLjEwNiwxMi40NzcsMjEuMzUsMTIuNTE3LDIwLjkwOCwxMy4wMDd6IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTYgICAgYzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy'+
			'41LDE2LDMuNXogTTIzLjE0NywyMy4xNDYgICAgYy0xLjgzMywxLjgzMS00LjM1MywyLjk2LTcuMTQ3LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiAgICBjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ3LDIuOTYxICAgIGMxLjgzMSwxLjgzMywyLjk1OSw0LjM1MiwyLjk2LDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDcsMjMuMTQ2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._down__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._down__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjAuOTA4LDEzLjAwN2wtNC45MzgsNS40ODFsLTQuOTM4LTUuNDgxYy0wLjQ0My0wLjQ5MS0xLjE5OS0wLjUzMS0xLjY4OS0wLjA4OCAgICBjLTAuNDkxLDAuNDQyLTAuNTMsMS4xOTktMC4wODgsMS42ODlsNS44MjcsNi40NjhjMC4yMjYsMC4y'+
			'NSwwLjU1MSwwLjM5NiwwLjg4OSwwLjM5NnMwLjY2My0wLjE0NiwwLjg4OS0wLjM5Nmw1LjgyNy02LjQ2OCAgICBjMC40NDItMC40OTEsMC40MDItMS4yNDgtMC4wODgtMS42ODlDMjIuMTA2LDEyLjQ3NywyMS4zNSwxMi41MTcsMjAuOTA4LDEzLjAwN3ogTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNiAgICBjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ3LDIzLjE0NiAgICBjLTEuODMzLDEuODMxLTQuMzUzLDIuOTYtNy4xNDcsMi45NnMtNS'+
			'4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2ICAgIGMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDcsMi45NjEgICAgYzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwx'+
			'Nikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiPgogIDxwYXRoIGQ9Ik0yMC45MDgsMTMuMDA3bC00LjkzOCw1LjQ4MWwtNC45MzgtNS40ODFjLTAuNDQzLTAuNDkxLTEuMTk5LTAuNTMxLTEuNjg5LTAuMDg4ICAgIGMtMC40OTEsMC40NDItMC41MywxLjE5OS0wLjA4OCwxLjY4OWw1LjgyNyw2LjQ2OGMwLjIyNiwwLjI1LDAuNTUxLDAuMzk2LDAuODg5LDAuMzk2czAuNjYzLTAuMTQ2LDAuODg5LTAuMzk2bDUuODI3LTYuNDY4ICAgIGMwLjQ0Mi0wLjQ5MSwwLjQwMi0xLjI0OC0wLjA4OC0xLjY4OUMyMi4xMDYsMTIuNDc3LDIxLjM1LDEyLjUxNywyMC45MDgsMTMuMDA3eiBNMTYsMy41Qz'+
			'kuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2ICAgIGMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6IE0yMy4xNDcsMjMuMTQ2ICAgIGMtMS44MzMsMS44MzEtNC4zNTMsMi45Ni03LjE0NywyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTYgICAgYzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjFjMi43OTUsMC4wMDEsNS4zMTMsMS4x'+
			'Myw3LjE0NywyLjk2MSAgICBjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ3LDIzLjE0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._down__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="down";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 80px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._down.onmouseenter=function (e) {
			me._down__img.style.visibility='hidden';
			me._down__imgo.style.visibility='inherit';
			me.elementMouseOver['down']=true;
		}
		me._down.onmousedown=function (e) {
			me.elementMouseDown['down']=true;
		}
		me._down.onmouseup=function (e) {
			me.elementMouseDown['down']=false;
		}
		me._down.onmouseleave=function (e) {
			me._down__img.style.visibility='inherit';
			me._down__imgo.style.visibility='hidden';
			me.elementMouseDown['down']=false;
			me.elementMouseOver['down']=false;
		}
		me._down.ggUpdateConditionTimer=function () {
			if (me.elementMouseDown['down']) {
				player.changeTiltLog(-1,true);
			}
		}
		me._down.ggUpdatePosition=function (useTransition) {
		}
		me._controller0.appendChild(me._down);
		el=me._left=document.createElement('div');
		els=me._left__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTMuNSwxNkMzLjUwMSw5LjA5Niw5LjA5NiwzLjUwMSwxNiwzLjVsMCwwQzIyLjkwMywzLjUwMSwyOC40OTksOS4wOTYsMjguNSwxNmwwLDAgICAgYy0wLjAwMSw2LjkwNC01LjU5NywxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNNS44OTIsMTZjMCwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2'+
			'MSw3LjE0NmwwLDAgICAgYzEuODMzLDEuODMxLDQuMzUzLDIuOTYsNy4xNDcsMi45NjFsMCwwYzIuNzk0LTAuMDAxLDUuMzE0LTEuMTMsNy4xNDctMi45NjFsMCwwYzEuODMtMS44MzIsMi45NTktNC4zNTIsMi45Ni03LjE0NmwwLDAgICAgYy0wLjAwMS0yLjc5NS0xLjEzLTUuMzE0LTIuOTYtNy4xNDdsMCwwQzIxLjMxNCw3LjAyMiwxOC43OTQsNS44OTQsMTYsNS44OTNsMCwwYy0yLjc5NCwwLTUuMzE0LDEuMTI5LTcuMTQ3LDIuOTZsMCwwICAgIEM3LjAyMSwxMC42ODYsNS44OTMsMTMuMjA1LDUuODkyLDE2TDUuODkyLDE2TDUuODkyLDE2eiIvPgogIDxwYXRoIHN0cm9rZT0iIzNDM0MzQyIgc3'+
			'Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik0xNy4zOTEsMjIuNjg2bC02LjQ2OC01LjgyN2MtMC4yNS0wLjIyNi0wLjM5Ni0wLjU1Mi0wLjM5Ni0wLjg4OWwwLDBjMC0wLjMzNywwLjE0Ni0wLjY2MywwLjM5Ni0wLjg4OSAgICBsMCwwbDYuNDY4LTUuODI2YzAuNDkxLTAuNDQyLDEuMjQ3LTAuNDAzLDEuNjg5LDAuMDg4bDAsMGMwLjQ0MiwwLjQ5LDAuNDAyLDEuMjQ3LTAuMDg4LDEuNjg5bDAsMGwtNS40ODEsNC45MzhsNS40ODEsNC45MzhsMCwwICAgIGMwLjQ5LDAuNDQyLDAuNTMsMS4xOTgsMC4wODgsMS42ODlsMCwwYy0wLjIzNiwwLjI2My0wLjU2MiwwLjM5Ni0wLjg4OSwwLjM5NmwwLDBDMTcuOTA2'+
			'LDIyLjk5MywxNy42MiwyMi44OTEsMTcuMzkxLDIyLjY4NiAgICBMMTcuMzkxLDIyLjY4NnoiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0zLjUsMTZDMy41MDEsOS4wOTYsOS4wOTYsMy41MDEsMTYsMy41bDAsMEMyMi45MDMsMy41MDEsMjguNDk5LDkuMDk2LDI4LjUsMTZsMCwwICAgIGMtMC4wMDEsNi45MDQtNS41OTcsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTUuODkyLDE2YzAsMi43OTUsMS4xMjksNS4zMTQsMi45NjEsNy4xNDZsMC'+
			'wwICAgIGMxLjgzMywxLjgzMSw0LjM1MywyLjk2LDcuMTQ3LDIuOTYxbDAsMGMyLjc5NC0wLjAwMSw1LjMxNC0xLjEzLDcuMTQ3LTIuOTYxbDAsMGMxLjgzLTEuODMyLDIuOTU5LTQuMzUyLDIuOTYtNy4xNDZsMCwwICAgIGMtMC4wMDEtMi43OTUtMS4xMy01LjMxNC0yLjk2LTcuMTQ3bDAsMEMyMS4zMTQsNy4wMjIsMTguNzk0LDUuODk0LDE2LDUuODkzbDAsMGMtMi43OTQsMC01LjMxNCwxLjEyOS03LjE0NywyLjk2bDAsMCAgICBDNy4wMjEsMTAuNjg2LDUuODkzLDEzLjIwNSw1Ljg5MiwxNkw1Ljg5MiwxNkw1Ljg5MiwxNnoiLz4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZG'+
			'RkYiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMTcuMzkxLDIyLjY4NmwtNi40NjgtNS44MjdjLTAuMjUtMC4yMjYtMC4zOTYtMC41NTItMC4zOTYtMC44ODlsMCwwYzAtMC4zMzcsMC4xNDYtMC42NjMsMC4zOTYtMC44ODkgICAgbDAsMGw2LjQ2OC01LjgyNmMwLjQ5MS0wLjQ0MiwxLjI0Ny0wLjQwMywxLjY4OSwwLjA4OGwwLDBjMC40NDIsMC40OSwwLjQwMiwxLjI0Ny0wLjA4OCwxLjY4OWwwLDBsLTUuNDgxLDQuOTM4bDUuNDgxLDQuOTM4bDAsMCAgICBjMC40OSwwLjQ0MiwwLjUzLDEuMTk4LDAuMDg4LDEuNjg5bDAsMGMtMC4yMzYsMC4yNjMtMC41NjIsMC4zOTYtMC44ODksMC4zOTZsMCwwQz'+
			'E3LjkwNiwyMi45OTMsMTcuNjIsMjIuODkxLDE3LjM5MSwyMi42ODYgICAgTDE3LjM5MSwyMi42ODZ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._left__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._left__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMy41LDE2QzMuNTAxLDkuMDk2LDkuMDk2LDMuNTAxLDE2LDMuNWwwLDBDMjIuOTAzLDMuNTAxLDI4LjQ5OSw5LjA5NiwyOC41LDE2bDAsMCAgICBjLTAuMDAxLDYuOTA0LTUuNTk3LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwz'+
			'LjUsMjIuOTA0LDMuNSwxNkwzLjUsMTZ6IE01Ljg5MiwxNmMwLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYxLDcuMTQ2bDAsMCAgICBjMS44MzMsMS44MzEsNC4zNTMsMi45Niw3LjE0NywyLjk2MWwwLDBjMi43OTQtMC4wMDEsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2MWwwLDBjMS44My0xLjgzMiwyLjk1OS00LjM1MiwyLjk2LTcuMTQ2bDAsMCAgICBjLTAuMDAxLTIuNzk1LTEuMTMtNS4zMTQtMi45Ni03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NCw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk0LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAgICAgQzcuMDIxLDEwLjY4Niw1Ljg5MywxMy4yMD'+
			'UsNS44OTIsMTZMNS44OTIsMTZMNS44OTIsMTZ6Ii8+CiAgPHBhdGggZD0iTTE3LjM5MSwyMi42ODZsLTYuNDY4LTUuODI3Yy0wLjI1LTAuMjI2LTAuMzk2LTAuNTUyLTAuMzk2LTAuODg5bDAsMGMwLTAuMzM3LDAuMTQ2LTAuNjYzLDAuMzk2LTAuODg5ICAgIGwwLDBsNi40NjgtNS44MjZjMC40OTEtMC40NDIsMS4yNDctMC40MDMsMS42ODksMC4wODhsMCwwYzAuNDQyLDAuNDksMC40MDIsMS4yNDctMC4wODgsMS42ODlsMCwwbC01LjQ4MSw0LjkzOGw1LjQ4MSw0LjkzOGwwLDAgICAgYzAuNDksMC40NDIsMC41MywxLjE5OCwwLjA4OCwxLjY4OWwwLDBjLTAuMjM2LDAuMjYzLTAuNTYyLDAuMzk2'+
			'LTAuODg5LDAuMzk2bDAsMEMxNy45MDYsMjIuOTkzLDE3LjYyLDIyLjg5MSwxNy4zOTEsMjIuNjg2ICAgIEwxNy4zOTEsMjIuNjg2eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMy41LDE2QzMuNTAxLDkuMDk2LDkuMDk2LDMuNTAxLDE2LDMuNWwwLDBDMjIuOTAzLDMuNTAxLDI4LjQ5OSw5LjA5NiwyOC41LDE2bDAsMCAgICBjLTAuMDAxLDYuOTA0LTUuNTk3LDEyLjQ5OS0xMi41LDEyLjVsMCwwQz'+
			'kuMDk2LDI4LjQ5OSwzLjUsMjIuOTA0LDMuNSwxNkwzLjUsMTZ6IE01Ljg5MiwxNmMwLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYxLDcuMTQ2bDAsMCAgICBjMS44MzMsMS44MzEsNC4zNTMsMi45Niw3LjE0NywyLjk2MWwwLDBjMi43OTQtMC4wMDEsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2MWwwLDBjMS44My0xLjgzMiwyLjk1OS00LjM1MiwyLjk2LTcuMTQ2bDAsMCAgICBjLTAuMDAxLTIuNzk1LTEuMTMtNS4zMTQtMi45Ni03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NCw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk0LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAgICAgQzcuMDIxLDEwLjY4'+
			'Niw1Ljg5MywxMy4yMDUsNS44OTIsMTZMNS44OTIsMTZMNS44OTIsMTZ6Ii8+CiAgPHBhdGggZD0iTTE3LjM5MSwyMi42ODZsLTYuNDY4LTUuODI3Yy0wLjI1LTAuMjI2LTAuMzk2LTAuNTUyLTAuMzk2LTAuODg5bDAsMGMwLTAuMzM3LDAuMTQ2LTAuNjYzLDAuMzk2LTAuODg5ICAgIGwwLDBsNi40NjgtNS44MjZjMC40OTEtMC40NDIsMS4yNDctMC40MDMsMS42ODksMC4wODhsMCwwYzAuNDQyLDAuNDksMC40MDIsMS4yNDctMC4wODgsMS42ODlsMCwwbC01LjQ4MSw0LjkzOGw1LjQ4MSw0LjkzOGwwLDAgICAgYzAuNDksMC40NDIsMC41MywxLjE5OCwwLjA4OCwxLjY4OWwwLDBjLTAuMjM2LDAuMj'+
			'YzLTAuNTYyLDAuMzk2LTAuODg5LDAuMzk2bDAsMEMxNy45MDYsMjIuOTkzLDE3LjYyLDIyLjg5MSwxNy4zOTEsMjIuNjg2ICAgIEwxNy4zOTEsMjIuNjg2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._left__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="left";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 1px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._left.onmouseenter=function (e) {
			me._left__img.style.visibility='hidden';
			me._left__imgo.style.visibility='inherit';
			me.elementMouseOver['left']=true;
		}
		me._left.onmousedown=function (e) {
			me.elementMouseDown['left']=true;
		}
		me._left.onmouseup=function (e) {
			me.elementMouseDown['left']=false;
		}
		me._left.onmouseleave=function (e) {
			me._left__img.style.visibility='inherit';
			me._left__imgo.style.visibility='hidden';
			me.elementMouseDown['left']=false;
			me.elementMouseOver['left']=false;
		}
		me._left.ggUpdateConditionTimer=function () {
			if (me.elementMouseDown['left']) {
				player.changePanLog(1,true);
			}
		}
		me._left.ggUpdatePosition=function (useTransition) {
		}
		me._controller0.appendChild(me._left);
		el=me._right=document.createElement('div');
		els=me._right__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTMuNSwxNkMzLjUwMSw5LjA5Niw5LjA5NiwzLjUwMSwxNiwzLjVsMCwwQzIyLjkwNCwzLjUwMSwyOC40OTksOS4wOTYsMjguNSwxNmwwLDAgICAgYy0wLjAwMSw2LjkwNC01LjU5NiwxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41MDEsMjIuOTA0LDMuNSwxNkwzLjUsMTZ6IE04Ljg1Myw4Ljg1MyAgICBDNy4wMjIsMTAuNjg2LDUu'+
			'ODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBjMCwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2LDcuMTQ2bDAsMGMxLjgzMywxLjgzMSw0LjM1MywyLjk2LDcuMTQ3LDIuOTYxbDAsMCAgICBjMi43OTUtMC4wMDEsNS4zMTQtMS4xMyw3LjE0Ni0yLjk2MWwwLDBjMS44MzItMS44MzIsMi45NjEtNC4zNTIsMi45NjEtNy4xNDZsMCwwYzAtMi43OTUtMS4xMjktNS4zMTQtMi45NjEtNy4xNDdsMCwwICAgIEMyMS4zMTQsNy4wMjIsMTguNzk1LDUuODk0LDE2LDUuODkzbDAsMEMxMy4yMDYsNS44OTQsMTAuNjg2LDcuMDIyLDguODUzLDguODUzTDguODUzLDguODUzeiIvPgogIDxwYXRoIHN0cm9rZT0iIzNDM0MzQy'+
			'Igc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik0xMi45MiwyMi42NTdjLTAuNDQyLTAuNDkxLTAuNDAzLTEuMjQ3LDAuMDg4LTEuNjg5bDAsMGw1LjQ4MS00LjkzOGwtNS40ODEtNC45Mzd2MCAgICBjLTAuNDkxLTAuNDQyLTAuNTMtMS4xOTktMC4wODgtMS42OWwwLDBjMC40NDEtMC40OTEsMS4xOTgtMC41MzEsMS42ODktMC4wODhsMCwwbDYuNDY4LDUuODI2ICAgIGMwLjI1MSwwLjIyNiwwLjM5NiwwLjU1MSwwLjM5NiwwLjg4OWwwLDBjMCwwLjMzNy0wLjE0NSwwLjY2My0wLjM5NiwwLjg4OWwwLDBsLTYuNDY4LDUuODI2Yy0wLjIyOSwwLjIwNi0wLjUxNSwwLjMwOC0wLjgsMC4zMDggICAgbDAsMEMx'+
			'My40ODIsMjMuMDUzLDEzLjE1NiwyMi45MTksMTIuOTIsMjIuNjU3TDEyLjkyLDIyLjY1N3oiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0zLjUsMTZDMy41MDEsOS4wOTYsOS4wOTYsMy41MDEsMTYsMy41bDAsMEMyMi45MDQsMy41MDEsMjguNDk5LDkuMDk2LDI4LjUsMTZsMCwwICAgIGMtMC4wMDEsNi45MDQtNS41OTYsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNTAxLDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNOC44NTMsOC44NTMgICAgQzcuMDIyLDEwLjY4Niw1Ljg5NCwxMy4yMD'+
			'UsNS44OTMsMTZsMCwwYzAsMi43OTUsMS4xMjksNS4zMTQsMi45Niw3LjE0NmwwLDBjMS44MzMsMS44MzEsNC4zNTMsMi45Niw3LjE0NywyLjk2MWwwLDAgICAgYzIuNzk1LTAuMDAxLDUuMzE0LTEuMTMsNy4xNDYtMi45NjFsMCwwYzEuODMyLTEuODMyLDIuOTYxLTQuMzUyLDIuOTYxLTcuMTQ2bDAsMGMwLTIuNzk1LTEuMTI5LTUuMzE0LTIuOTYxLTcuMTQ3bDAsMCAgICBDMjEuMzE0LDcuMDIyLDE4Ljc5NSw1Ljg5NCwxNiw1Ljg5M2wwLDBDMTMuMjA2LDUuODk0LDEwLjY4Niw3LjAyMiw4Ljg1Myw4Ljg1M0w4Ljg1Myw4Ljg1M3oiLz4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNG'+
			'RkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMTIuOTIsMjIuNjU3Yy0wLjQ0Mi0wLjQ5MS0wLjQwMy0xLjI0NywwLjA4OC0xLjY4OWwwLDBsNS40ODEtNC45MzhsLTUuNDgxLTQuOTM3djAgICAgYy0wLjQ5MS0wLjQ0Mi0wLjUzLTEuMTk5LTAuMDg4LTEuNjlsMCwwYzAuNDQxLTAuNDkxLDEuMTk4LTAuNTMxLDEuNjg5LTAuMDg4bDAsMGw2LjQ2OCw1LjgyNiAgICBjMC4yNTEsMC4yMjYsMC4zOTYsMC41NTEsMC4zOTYsMC44ODlsMCwwYzAsMC4zMzctMC4xNDUsMC42NjMtMC4zOTYsMC44ODlsMCwwbC02LjQ2OCw1LjgyNmMtMC4yMjksMC4yMDYtMC41MTUsMC4zMDgtMC44LDAuMzA4ICAgIG'+
			'wwLDBDMTMuNDgyLDIzLjA1MywxMy4xNTYsMjIuOTE5LDEyLjkyLDIyLjY1N0wxMi45MiwyMi42NTd6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._right__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._right__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMy41LDE2QzMuNTAxLDkuMDk2LDkuMDk2LDMuNTAxLDE2LDMuNWwwLDBDMjIuOTA0LDMuNTAxLDI4LjQ5OSw5LjA5NiwyOC41LDE2bDAsMCAgICBjLTAuMDAxLDYuOTA0LTUuNTk2LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwz'+
			'LjUwMSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUzLDguODUzICAgIEM3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYsNy4xNDZsMCwwYzEuODMzLDEuODMxLDQuMzUzLDIuOTYsNy4xNDcsMi45NjFsMCwwICAgIGMyLjc5NS0wLjAwMSw1LjMxNC0xLjEzLDcuMTQ2LTIuOTYxbDAsMGMxLjgzMi0xLjgzMiwyLjk2MS00LjM1MiwyLjk2MS03LjE0NmwwLDBjMC0yLjc5NS0xLjEyOS01LjMxNC0yLjk2MS03LjE0N2wwLDAgICAgQzIxLjMxNCw3LjAyMiwxOC43OTUsNS44OTQsMTYsNS44OTNsMCwwQzEzLjIwNiw1Ljg5NCwxMC42OD'+
			'YsNy4wMjIsOC44NTMsOC44NTNMOC44NTMsOC44NTN6Ii8+CiAgPHBhdGggZD0iTTEyLjkyLDIyLjY1N2MtMC40NDItMC40OTEtMC40MDMtMS4yNDcsMC4wODgtMS42ODlsMCwwbDUuNDgxLTQuOTM4bC01LjQ4MS00LjkzN3YwICAgIGMtMC40OTEtMC40NDItMC41My0xLjE5OS0wLjA4OC0xLjY5bDAsMGMwLjQ0MS0wLjQ5MSwxLjE5OC0wLjUzMSwxLjY4OS0wLjA4OGwwLDBsNi40NjgsNS44MjYgICAgYzAuMjUxLDAuMjI2LDAuMzk2LDAuNTUxLDAuMzk2LDAuODg5bDAsMGMwLDAuMzM3LTAuMTQ1LDAuNjYzLTAuMzk2LDAuODg5bDAsMGwtNi40NjgsNS44MjZjLTAuMjI5LDAuMjA2LTAuNTE1LDAu'+
			'MzA4LTAuOCwwLjMwOCAgICBsMCwwQzEzLjQ4MiwyMy4wNTMsMTMuMTU2LDIyLjkxOSwxMi45MiwyMi42NTdMMTIuOTIsMjIuNjU3eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMy41LDE2QzMuNTAxLDkuMDk2LDkuMDk2LDMuNTAxLDE2LDMuNWwwLDBDMjIuOTA0LDMuNTAxLDI4LjQ5OSw5LjA5NiwyOC41LDE2bDAsMCAgICBjLTAuMDAxLDYuOTA0LTUuNTk2LDEyLjQ5OS0xMi41LDEyLjVsMCwwQz'+
			'kuMDk2LDI4LjQ5OSwzLjUwMSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUzLDguODUzICAgIEM3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYsNy4xNDZsMCwwYzEuODMzLDEuODMxLDQuMzUzLDIuOTYsNy4xNDcsMi45NjFsMCwwICAgIGMyLjc5NS0wLjAwMSw1LjMxNC0xLjEzLDcuMTQ2LTIuOTYxbDAsMGMxLjgzMi0xLjgzMiwyLjk2MS00LjM1MiwyLjk2MS03LjE0NmwwLDBjMC0yLjc5NS0xLjEyOS01LjMxNC0yLjk2MS03LjE0N2wwLDAgICAgQzIxLjMxNCw3LjAyMiwxOC43OTUsNS44OTQsMTYsNS44OTNsMCwwQzEzLjIw'+
			'Niw1Ljg5NCwxMC42ODYsNy4wMjIsOC44NTMsOC44NTNMOC44NTMsOC44NTN6Ii8+CiAgPHBhdGggZD0iTTEyLjkyLDIyLjY1N2MtMC40NDItMC40OTEtMC40MDMtMS4yNDcsMC4wODgtMS42ODlsMCwwbDUuNDgxLTQuOTM4bC01LjQ4MS00LjkzN3YwICAgIGMtMC40OTEtMC40NDItMC41My0xLjE5OS0wLjA4OC0xLjY5bDAsMGMwLjQ0MS0wLjQ5MSwxLjE5OC0wLjUzMSwxLjY4OS0wLjA4OGwwLDBsNi40NjgsNS44MjYgICAgYzAuMjUxLDAuMjI2LDAuMzk2LDAuNTUxLDAuMzk2LDAuODg5bDAsMGMwLDAuMzM3LTAuMTQ1LDAuNjYzLTAuMzk2LDAuODg5bDAsMGwtNi40NjgsNS44MjZjLTAuMjI5LD'+
			'AuMjA2LTAuNTE1LDAuMzA4LTAuOCwwLjMwOCAgICBsMCwwQzEzLjQ4MiwyMy4wNTMsMTMuMTU2LDIyLjkxOSwxMi45MiwyMi42NTdMMTIuOTIsMjIuNjU3eiIvPgogPC9nPgo8L3N2Zz4K';
		me._right__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="right";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 120px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._right.onmouseenter=function (e) {
			me._right__img.style.visibility='hidden';
			me._right__imgo.style.visibility='inherit';
			me.elementMouseOver['right']=true;
		}
		me._right.onmousedown=function (e) {
			me.elementMouseDown['right']=true;
		}
		me._right.onmouseup=function (e) {
			me.elementMouseDown['right']=false;
		}
		me._right.onmouseleave=function (e) {
			me._right__img.style.visibility='inherit';
			me._right__imgo.style.visibility='hidden';
			me.elementMouseDown['right']=false;
			me.elementMouseOver['right']=false;
		}
		me._right.ggUpdateConditionTimer=function () {
			if (me.elementMouseDown['right']) {
				player.changePanLog(-1,true);
			}
		}
		me._right.ggUpdatePosition=function (useTransition) {
		}
		me._controller0.appendChild(me._right);
		el=me._zoomin=document.createElement('div');
		els=me._zoomin__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTIyLjA2MSwxNC44MDNoLTQuODY0VjkuOTM4YzAtMC42NjEtMC41MzYtMS4xOTctMS4xOTctMS4xOTdjLTAuNjYsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N3Y0Ljg2NSAgICBIOS45MzhjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTdjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDQuODY2djQuODY1YzAsMC42NiwwLjUzNiwx'+
			'LjE5NiwxLjE5NiwxLjE5NiAgICBjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtNC44NjVoNC44NjRjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NkMyMy4yNTcsMTUuMzM5LDIyLjcyMiwxNC44MDMsMjIuMDYxLDE0LjgwM3ogICAgIE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjUgICAgQzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDZjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMT'+
			'QtMS4xMjktNy4xNDYtMi45NiAgICBDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxICAgIGMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxYzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMjIuMDYxLDE0LjgwM2gt'+
			'NC44NjRWOS45MzhjMC0wLjY2MS0wLjUzNi0xLjE5Ny0xLjE5Ny0xLjE5N2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk3djQuODY1ICAgIEg5LjkzOGMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N2MwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoNC44NjZ2NC44NjVjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2ICAgIGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di00Ljg2NWg0Ljg2NGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2QzIzLjI1NywxNS4zMzksMjIuNzIyLDE0LjgwMywyMi4wNjEsMTQuODAzeiAgICAgTTE2LDMuNUM5Lj'+
			'A5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNSAgICBDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NmMtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2ICAgIEM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjEgICAgYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMs'+
			'Ny4xNDYsMi45NjFjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._zoomin__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomin__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjIuMDYxLDE0LjgwM2gtNC44NjRWOS45MzhjMC0wLjY2MS0wLjUzNi0xLjE5Ny0xLjE5Ny0xLjE5N2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk3djQuODY1ICAgIEg5LjkzOGMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5'+
			'N2MwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoNC44NjZ2NC44NjVjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2ICAgIGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di00Ljg2NWg0Ljg2NGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2QzIzLjI1NywxNS4zMzksMjIuNzIyLDE0LjgwMywyMi4wNjEsMTQuODAzeiAgICAgTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNSAgICBDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy'+
			'41eiBNMjMuMTQ2LDIzLjE0NmMtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2ICAgIEM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjEgICAgYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NjFjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmls'+
			'bD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSI+CiAgPHBhdGggZD0iTTIyLjA2MSwxNC44MDNoLTQuODY0VjkuOTM4YzAtMC42NjEtMC41MzYtMS4xOTctMS4xOTctMS4xOTdjLTAuNjYsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N3Y0Ljg2NSAgICBIOS45MzhjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTdjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDQuODY2djQuODY1YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NiAgICBjMC42NjEsMCwxLjE5Ny0wLj'+
			'UzNiwxLjE5Ny0xLjE5NnYtNC44NjVoNC44NjRjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NkMyMy4yNTcsMTUuMzM5LDIyLjcyMiwxNC44MDMsMjIuMDYxLDE0LjgwM3ogICAgIE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjUgICAgQzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDZjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NiAgICBDNy4wMjIsMjEuMzE0LDUu'+
			'ODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxICAgIGMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxYzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._zoomin__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="zoomin";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 160px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomin.onmouseenter=function (e) {
			me._zoomin__img.style.visibility='hidden';
			me._zoomin__imgo.style.visibility='inherit';
			me._tt_zoomin.style.transition='none';
			me._tt_zoomin.style.visibility=(Number(me._tt_zoomin.style.opacity)>0||!me._tt_zoomin.style.opacity)?'inherit':'hidden';
			me._tt_zoomin.ggVisible=true;
			me.elementMouseOver['zoomin']=true;
		}
		me._zoomin.onmousedown=function (e) {
			me.elementMouseDown['zoomin']=true;
		}
		me._zoomin.onmouseup=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.onmouseleave=function (e) {
			me._zoomin__img.style.visibility='inherit';
			me._zoomin__imgo.style.visibility='hidden';
			me._tt_zoomin.style.transition='none';
			me._tt_zoomin.style.visibility='hidden';
			me._tt_zoomin.ggVisible=false;
			me.elementMouseDown['zoomin']=false;
			me.elementMouseOver['zoomin']=false;
		}
		me._zoomin.ggUpdateConditionTimer=function () {
			if (me.elementMouseDown['zoomin']) {
				player.changeFovLog(-1,true);
			}
		}
		me._zoomin.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_zoomin=document.createElement('div');
		els=me._tt_zoomin__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_zoomin";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -55px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_zoomin.ggUpdateText=function() {
			var params = [];
			var hs = player._("Zoom In", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_zoomin.ggUpdateText();
		el.appendChild(els);
		me._tt_zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_zoomin.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_zoomin_white=document.createElement('div');
		els=me._tt_zoomin_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_zoomin_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_zoomin_white.ggUpdateText=function() {
			var params = [];
			var hs = player._("Zoom In", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_zoomin_white.ggUpdateText();
		el.appendChild(els);
		me._tt_zoomin_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_zoomin_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_zoomin.appendChild(me._tt_zoomin_white);
		me._zoomin.appendChild(me._tt_zoomin);
		me._controller0.appendChild(me._zoomin);
		el=me._zoomout=document.createElement('div');
		els=me._zoomout__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTIxLjc1OCwxNC44MDRIMTAuMjQxYy0wLjY2LDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxMS41MTcgICAgYzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZDMjIuOTU1LDE1LjMzOSwyMi40MTksMTQuODA0LDIxLjc1OCwxNC44MDR6IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5'+
			'NiwzLjUsMTYgICAgYzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDYgICAgYy0xLjgzMiwxLjgzMS00LjM1MiwyLjk2LTcuMTQ2LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiAgICBjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxICAgIG'+
			'MxLjgzMiwxLjgzMywyLjk2LDQuMzUyLDIuOTYxLDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDYsMjMuMTQ2eiIvPgogPC9nPgogPGc+CiAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTTIxLjc1OCwxNC44MDRIMTAuMjQxYy0wLjY2LDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxMS41MTcgICAgYzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZDMjIuOTU1LDE1LjMzOSwyMi40MTksMTQuODA0LDIxLjc1OCwxNC44MDR6IE0xNiwzLjVDOS4w'+
			'OTYsMy41LDMuNSw5LjA5NiwzLjUsMTYgICAgYzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDYgICAgYy0xLjgzMiwxLjgzMS00LjM1MiwyLjk2LTcuMTQ2LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiAgICBjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLD'+
			'cuMTQ2LDIuOTYxICAgIGMxLjgzMiwxLjgzMywyLjk2LDQuMzUyLDIuOTYxLDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDYsMjMuMTQ2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._zoomout__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomout__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuNzU4LDE0LjgwNEgxMC4yNDFjLTAuNjYsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDExLjUxNyAgICBjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NkMyMi45NTUsMTUu'+
			'MzM5LDIyLjQxOSwxNC44MDQsMjEuNzU4LDE0LjgwNHogTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNiAgICBjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NiAgICBjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2ICAgIGMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0Lj'+
			'M1Mi0yLjk2LDcuMTQ2LTIuOTYxYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NjEgICAgYzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiPgogIDxwYXRoIGQ9Ik0yMS43NTgsMTQuODA0SDEwLjI0MWMtMC42NiwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41'+
			'MzYsMS4xOTYsMS4xOTYsMS4xOTZoMTEuNTE3ICAgIGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2QzIyLjk1NSwxNS4zMzksMjIuNDE5LDE0LjgwNCwyMS43NTgsMTQuODA0eiBNMTYsMy41QzkuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2ICAgIGMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6IE0yMy4xNDYsMjMuMTQ2ICAgIGMtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxNCw1Lj'+
			'g5NCwxOC43OTUsNS44OTMsMTYgICAgYzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjFjMi43OTUsMC4wMDEsNS4zMTMsMS4xMyw3LjE0NiwyLjk2MSAgICBjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._zoomout__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="zoomout";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 200px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomout.onmouseenter=function (e) {
			me._zoomout__img.style.visibility='hidden';
			me._zoomout__imgo.style.visibility='inherit';
			me._tt_zoomout.style.transition='none';
			me._tt_zoomout.style.visibility=(Number(me._tt_zoomout.style.opacity)>0||!me._tt_zoomout.style.opacity)?'inherit':'hidden';
			me._tt_zoomout.ggVisible=true;
			me.elementMouseOver['zoomout']=true;
		}
		me._zoomout.onmousedown=function (e) {
			me.elementMouseDown['zoomout']=true;
		}
		me._zoomout.onmouseup=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.onmouseleave=function (e) {
			me._zoomout__img.style.visibility='inherit';
			me._zoomout__imgo.style.visibility='hidden';
			me._tt_zoomout.style.transition='none';
			me._tt_zoomout.style.visibility='hidden';
			me._tt_zoomout.ggVisible=false;
			me.elementMouseDown['zoomout']=false;
			me.elementMouseOver['zoomout']=false;
		}
		me._zoomout.ggUpdateConditionTimer=function () {
			if (me.elementMouseDown['zoomout']) {
				player.changeFovLog(1,true);
			}
		}
		me._zoomout.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_zoomout=document.createElement('div');
		els=me._tt_zoomout__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_zoomout";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -55px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_zoomout.ggUpdateText=function() {
			var params = [];
			var hs = player._("Zoom Out", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_zoomout.ggUpdateText();
		el.appendChild(els);
		me._tt_zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_zoomout.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_zoomout_white=document.createElement('div');
		els=me._tt_zoomout_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_zoomout_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_zoomout_white.ggUpdateText=function() {
			var params = [];
			var hs = player._("Zoom Out", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_zoomout_white.ggUpdateText();
		el.appendChild(els);
		me._tt_zoomout_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_zoomout_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_zoomout.appendChild(me._tt_zoomout_white);
		me._zoomout.appendChild(me._tt_zoomout);
		me._controller0.appendChild(me._zoomout);
		el=me._autorotate=document.createElement('div');
		els=me._autorotate__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPGc+CiAgIDxwYXRoIHN0cm9rZT0iIzNDM0MzQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik0zLjUsMTZjMC02LjkwNCw1LjU5Ni0xMi41LDEyLjUtMTIuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCAgICAgYy0wLjAwMSw2LjkwNC01LjU5NiwxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNOC44NTMsOC44NTQgICAgIGMtMS44MzEsMS44MzMt'+
			'Mi45Niw0LjM1Mi0yLjk2LDcuMTQ3bDAsMGMwLDIuNzk0LDEuMTI5LDUuMzE0LDIuOTYsNy4xNDdsMCwwYzEuODMyLDEuODMsNC4zNTIsMi45Niw3LjE0NywyLjk2bDAsMCAgICAgYzIuNzk1LDAsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2bDAsMGMxLjgzMS0xLjgzMywyLjk1OS00LjM1MywyLjk2LTcuMTQ3bDAsMGMtMC4wMDEtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDAgICAgIGMtMS44MzMtMS44MzItNC4zNTMtMi45Ni03LjE0Ny0yLjk2bDAsMEMxMy4yMDUsNS44OTQsMTAuNjg2LDcuMDIyLDguODUzLDguODU0TDguODUzLDguODU0eiIvPgogIDwvZz4KICA8cGF0aCBzdHJva2U9Ii'+
			'MzQzNDM0MiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTguMDcsMjAuMDAxYy0wLjE3NC0wLjYzOCwwLjIwMy0xLjI5NSwwLjg0MS0xLjQ2OWwwLDBjMS4xMzQtMC4zMDYsMi4wNTUtMC43ODksMi42MzMtMS4zMDVsMCwwICAgIGMwLjU4NC0wLjUyNiwwLjc5Ny0xLjAwOCwwLjc5OC0xLjQ0NGwwLDBjLTAuMDAyLTAuMzEtMC4xMDItMC42MTctMC4zNTktMC45N2wwLDBjLTAuMjU2LTAuMzUtMC42NzgtMC43MjEtMS4yNDctMS4wNDVsMCwwICAgIGMtMS4xMzctMC42NTYtMi44NC0xLjExLTQuNzM1LTEuMTA2bDAsMGMtMS40MjItMC4wMDEtMi43MzUsMC4yNS0zLjc4MywwLjY1N2wwLDBjLTEuMDUx'+
			'LDAuNDAyLTEuODE5LDAuOTY5LTIuMjAxLDEuNDk1bDAsMCAgICBjLTAuMjU3LDAuMzU0LTAuMzU2LDAuNjYxLTAuMzU4LDAuOTdsMCwwYzAuMDAxLDAuMjg4LDAuMDg3LDAuNTcxLDAuMzA2LDAuODk1bDAsMGMwLjIxNywwLjMyMSwwLjU3NSwwLjY2NiwxLjA2NSwwLjk3OGwwLDAgICAgaDAuMDAxYzAuNTU3LDAuMzU2LDAuNzIsMS4wOTYsMC4zNjQsMS42NTJsMCwwYy0wLjM1NSwwLjU1Ny0xLjA5NSwwLjcyLTEuNjUyLDAuMzY0bDAsMGMtMC43MDYtMC40NTEtMS4zMS0wLjk5NC0xLjc1NS0xLjY0NmwwLDAgICAgYy0wLjQ0NC0wLjY0Ny0wLjcyMy0xLjQyMy0wLjcyMi0yLjI0M2wwLDBjLTAuMD'+
			'AxLTAuODgzLDAuMzIxLTEuNzEyLDAuODI3LTIuMzkybDAsMGMwLjUwNy0wLjY4NCwxLjE4OC0xLjI0NCwxLjk4My0xLjdsMCwwICAgIGMxLjU5Mi0wLjkwNywzLjY1Ny0xLjQxOSw1LjkyNS0xLjQyM2wwLDBjMS43LDAsMy4yODgsMC4yOTMsNC42NDYsMC44MThsMCwwYzEuMzU1LDAuNTI5LDIuNDk4LDEuMjgxLDMuMjYxLDIuMzA1bDAsMCAgICBjMC41MDYsMC42OCwwLjgyOSwxLjUwOCwwLjgyNiwyLjM5MmwwLDBjMC4wMDEsMS4yODgtMC42NjgsMi40MTMtMS42MDIsMy4yMzNsMCwwYy0wLjk0MiwwLjgzMi0yLjE3OCwxLjQzOC0zLjU5NCwxLjgyNWwwLDAgICAgYy0wLjEwNCwwLjAyOC0wLjIx'+
			'MSwwLjA0Mi0wLjMxNCwwLjA0MmwwLDBDMTguNjk2LDIwLjg4NCwxOC4yMTQsMjAuNTMzLDE4LjA3LDIwLjAwMUwxOC4wNywyMC4wMDF6Ii8+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTE2LjM5NiwyMy42MjFsLTMuMzczLTMuMDM5Yy0wLjI1MS0wLjIyNi0wLjM5Ni0wLjU1MS0wLjM5Ni0wLjg4OWwwLDBjMC0wLjMzNywwLjE0Ni0wLjY2MywwLjM5Ni0wLjg4OSAgICBsMCwwbDMuMzc0LTMuMDM5YzAuNDkxLTAuNDQyLDEuMjQ3LTAuNDAzLDEuNjg5LDAuMDg4bDAsMGMwLjQ0MiwwLjQ5MSwwLjQwMiwxLjI0Ny0wLjA4OCwxLjY4OWwwLDBsLTIuMzg2LD'+
			'IuMTVsMi4zODYsMi4xNDkgICAgYzAuNDksMC40NDIsMC41MywxLjE5OSwwLjA4OCwxLjY5bDAsMGMtMC4yMzYsMC4yNjItMC41NjIsMC4zOTUtMC44OSwwLjM5NWwwLDBDMTYuOTEyLDIzLjkyOCwxNi42MjUsMjMuODI2LDE2LjM5NiwyMy42MjEgICAgTDE2LjM5NiwyMy42MjF6Ii8+CiA8L2c+CiA8Zz4KICA8Zz4KICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTTMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjUsMTIuNS0xMi41bDAsMGM2LjkwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwICAgICBjLTAuMDAxLDYuOTA0LTUu'+
			'NTk2LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTA0LDMuNSwxNkwzLjUsMTZ6IE04Ljg1Myw4Ljg1NCAgICAgYy0xLjgzMSwxLjgzMy0yLjk2LDQuMzUyLTIuOTYsNy4xNDdsMCwwYzAsMi43OTQsMS4xMjksNS4zMTQsMi45Niw3LjE0N2wwLDBjMS44MzIsMS44Myw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwICAgICBjMi43OTUsMCw1LjMxNC0xLjEzLDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMzLDIuOTU5LTQuMzUzLDIuOTYtNy4xNDdsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCAgICAgYy0xLjgzMy0xLjgzMi00LjM1My0yLj'+
			'k2LTcuMTQ3LTIuOTZsMCwwQzEzLjIwNSw1Ljg5NCwxMC42ODYsNy4wMjIsOC44NTMsOC44NTRMOC44NTMsOC44NTR6Ii8+CiAgPC9nPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0xOC4wNywyMC4wMDFjLTAuMTc0LTAuNjM4LDAuMjAzLTEuMjk1LDAuODQxLTEuNDY5bDAsMGMxLjEzNC0wLjMwNiwyLjA1NS0wLjc4OSwyLjYzMy0xLjMwNWwwLDAgICAgYzAuNTg0LTAuNTI2LDAuNzk3LTEuMDA4LDAuNzk4LTEuNDQ0bDAsMGMtMC4wMDItMC4zMS0wLjEwMi0wLjYxNy0wLjM1OS0wLjk3bDAsMGMtMC4yNTYtMC4zNS0wLjY3OC0w'+
			'LjcyMS0xLjI0Ny0xLjA0NWwwLDAgICAgYy0xLjEzNy0wLjY1Ni0yLjg0LTEuMTEtNC43MzUtMS4xMDZsMCwwYy0xLjQyMi0wLjAwMS0yLjczNSwwLjI1LTMuNzgzLDAuNjU3bDAsMGMtMS4wNTEsMC40MDItMS44MTksMC45NjktMi4yMDEsMS40OTVsMCwwICAgIGMtMC4yNTcsMC4zNTQtMC4zNTYsMC42NjEtMC4zNTgsMC45N2wwLDBjMC4wMDEsMC4yODgsMC4wODcsMC41NzEsMC4zMDYsMC44OTVsMCwwYzAuMjE3LDAuMzIxLDAuNTc1LDAuNjY2LDEuMDY1LDAuOTc4bDAsMCAgICBoMC4wMDFjMC41NTcsMC4zNTYsMC43MiwxLjA5NiwwLjM2NCwxLjY1MmwwLDBjLTAuMzU1LDAuNTU3LTEuMDk1LD'+
			'AuNzItMS42NTIsMC4zNjRsMCwwYy0wLjcwNi0wLjQ1MS0xLjMxLTAuOTk0LTEuNzU1LTEuNjQ2bDAsMCAgICBjLTAuNDQ0LTAuNjQ3LTAuNzIzLTEuNDIzLTAuNzIyLTIuMjQzbDAsMGMtMC4wMDEtMC44ODMsMC4zMjEtMS43MTIsMC44MjctMi4zOTJsMCwwYzAuNTA3LTAuNjg0LDEuMTg4LTEuMjQ0LDEuOTgzLTEuN2wwLDAgICAgYzEuNTkyLTAuOTA3LDMuNjU3LTEuNDE5LDUuOTI1LTEuNDIzbDAsMGMxLjcsMCwzLjI4OCwwLjI5Myw0LjY0NiwwLjgxOGwwLDBjMS4zNTUsMC41MjksMi40OTgsMS4yODEsMy4yNjEsMi4zMDVsMCwwICAgIGMwLjUwNiwwLjY4LDAuODI5LDEuNTA4LDAuODI2LDIu'+
			'MzkybDAsMGMwLjAwMSwxLjI4OC0wLjY2OCwyLjQxMy0xLjYwMiwzLjIzM2wwLDBjLTAuOTQyLDAuODMyLTIuMTc4LDEuNDM4LTMuNTk0LDEuODI1bDAsMCAgICBjLTAuMTA0LDAuMDI4LTAuMjExLDAuMDQyLTAuMzE0LDAuMDQybDAsMEMxOC42OTYsMjAuODg0LDE4LjIxNCwyMC41MzMsMTguMDcsMjAuMDAxTDE4LjA3LDIwLjAwMXoiLz4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMTYuMzk2LDIzLjYyMWwtMy4zNzMtMy4wMzljLTAuMjUxLTAuMjI2LTAuMzk2LTAuNTUxLTAuMzk2LTAuODg5bDAsMGMwLTAuMzM3LDAuMTQ2LT'+
			'AuNjYzLDAuMzk2LTAuODg5ICAgIGwwLDBsMy4zNzQtMy4wMzljMC40OTEtMC40NDIsMS4yNDctMC40MDMsMS42ODksMC4wODhsMCwwYzAuNDQyLDAuNDkxLDAuNDAyLDEuMjQ3LTAuMDg4LDEuNjg5bDAsMGwtMi4zODYsMi4xNWwyLjM4NiwyLjE0OSAgICBjMC40OSwwLjQ0MiwwLjUzLDEuMTk5LDAuMDg4LDEuNjlsMCwwYy0wLjIzNiwwLjI2Mi0wLjU2MiwwLjM5NS0wLjg5LDAuMzk1bDAsMEMxNi45MTIsMjMuOTI4LDE2LjYyNSwyMy44MjYsMTYuMzk2LDIzLjYyMSAgICBMMTYuMzk2LDIzLjYyMXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._autorotate__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._autorotate__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjUsMTIuNS0xMi41bDAsMGM2LjkwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwICAgICBjLTAuMDAxLDYuOTA0LTUuNTk2LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5'+
			'OSwzLjUsMjIuOTA0LDMuNSwxNkwzLjUsMTZ6IE04Ljg1Myw4Ljg1NCAgICAgYy0xLjgzMSwxLjgzMy0yLjk2LDQuMzUyLTIuOTYsNy4xNDdsMCwwYzAsMi43OTQsMS4xMjksNS4zMTQsMi45Niw3LjE0N2wwLDBjMS44MzIsMS44Myw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwICAgICBjMi43OTUsMCw1LjMxNC0xLjEzLDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMzLDIuOTU5LTQuMzUzLDIuOTYtNy4xNDdsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCAgICAgYy0xLjgzMy0xLjgzMi00LjM1My0yLjk2LTcuMTQ3LTIuOTZsMCwwQzEzLjIwNSw1Ljg5NCwxMC42OD'+
			'YsNy4wMjIsOC44NTMsOC44NTRMOC44NTMsOC44NTR6Ii8+CiAgPC9nPgogIDxwYXRoIGQ9Ik0xOC4wNywyMC4wMDFjLTAuMTc0LTAuNjM4LDAuMjAzLTEuMjk1LDAuODQxLTEuNDY5bDAsMGMxLjEzNC0wLjMwNiwyLjA1NS0wLjc4OSwyLjYzMy0xLjMwNWwwLDAgICAgYzAuNTg0LTAuNTI2LDAuNzk3LTEuMDA4LDAuNzk4LTEuNDQ0bDAsMGMtMC4wMDItMC4zMS0wLjEwMi0wLjYxNy0wLjM1OS0wLjk3bDAsMGMtMC4yNTYtMC4zNS0wLjY3OC0wLjcyMS0xLjI0Ny0xLjA0NWwwLDAgICAgYy0xLjEzNy0wLjY1Ni0yLjg0LTEuMTEtNC43MzUtMS4xMDZsMCwwYy0xLjQyMi0wLjAwMS0yLjczNSwwLjI1'+
			'LTMuNzgzLDAuNjU3bDAsMGMtMS4wNTEsMC40MDItMS44MTksMC45NjktMi4yMDEsMS40OTVsMCwwICAgIGMtMC4yNTcsMC4zNTQtMC4zNTYsMC42NjEtMC4zNTgsMC45N2wwLDBjMC4wMDEsMC4yODgsMC4wODcsMC41NzEsMC4zMDYsMC44OTVsMCwwYzAuMjE3LDAuMzIxLDAuNTc1LDAuNjY2LDEuMDY1LDAuOTc4bDAsMCAgICBoMC4wMDFjMC41NTcsMC4zNTYsMC43MiwxLjA5NiwwLjM2NCwxLjY1MmwwLDBjLTAuMzU1LDAuNTU3LTEuMDk1LDAuNzItMS42NTIsMC4zNjRsMCwwYy0wLjcwNi0wLjQ1MS0xLjMxLTAuOTk0LTEuNzU1LTEuNjQ2bDAsMCAgICBjLTAuNDQ0LTAuNjQ3LTAuNzIzLTEuND'+
			'IzLTAuNzIyLTIuMjQzbDAsMGMtMC4wMDEtMC44ODMsMC4zMjEtMS43MTIsMC44MjctMi4zOTJsMCwwYzAuNTA3LTAuNjg0LDEuMTg4LTEuMjQ0LDEuOTgzLTEuN2wwLDAgICAgYzEuNTkyLTAuOTA3LDMuNjU3LTEuNDE5LDUuOTI1LTEuNDIzbDAsMGMxLjcsMCwzLjI4OCwwLjI5Myw0LjY0NiwwLjgxOGwwLDBjMS4zNTUsMC41MjksMi40OTgsMS4yODEsMy4yNjEsMi4zMDVsMCwwICAgIGMwLjUwNiwwLjY4LDAuODI5LDEuNTA4LDAuODI2LDIuMzkybDAsMGMwLjAwMSwxLjI4OC0wLjY2OCwyLjQxMy0xLjYwMiwzLjIzM2wwLDBjLTAuOTQyLDAuODMyLTIuMTc4LDEuNDM4LTMuNTk0LDEuODI1bDAs'+
			'MCAgICBjLTAuMTA0LDAuMDI4LTAuMjExLDAuMDQyLTAuMzE0LDAuMDQybDAsMEMxOC42OTYsMjAuODg0LDE4LjIxNCwyMC41MzMsMTguMDcsMjAuMDAxTDE4LjA3LDIwLjAwMXoiLz4KICA8cGF0aCBkPSJNMTYuMzk2LDIzLjYyMWwtMy4zNzMtMy4wMzljLTAuMjUxLTAuMjI2LTAuMzk2LTAuNTUxLTAuMzk2LTAuODg5bDAsMGMwLTAuMzM3LDAuMTQ2LTAuNjYzLDAuMzk2LTAuODg5ICAgIGwwLDBsMy4zNzQtMy4wMzljMC40OTEtMC40NDIsMS4yNDctMC40MDMsMS42ODksMC4wODhsMCwwYzAuNDQyLDAuNDkxLDAuNDAyLDEuMjQ3LTAuMDg4LDEuNjg5bDAsMGwtMi4zODYsMi4xNWwyLjM4NiwyLj'+
			'E0OSAgICBjMC40OSwwLjQ0MiwwLjUzLDEuMTk5LDAuMDg4LDEuNjlsMCwwYy0wLjIzNiwwLjI2Mi0wLjU2MiwwLjM5NS0wLjg5LDAuMzk1bDAsMEMxNi45MTIsMjMuOTI4LDE2LjYyNSwyMy44MjYsMTYuMzk2LDIzLjYyMSAgICBMMTYuMzk2LDIzLjYyMXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZjMC02LjkwNCw1LjU5Ni0xMi41LDEyLjUtMTIuNWwwLDBjNi45MDQsMCwx'+
			'Mi40OTksNS41OTYsMTIuNSwxMi41bDAsMCAgICAgYy0wLjAwMSw2LjkwNC01LjU5NiwxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNOC44NTMsOC44NTQgICAgIGMtMS44MzEsMS44MzMtMi45Niw0LjM1Mi0yLjk2LDcuMTQ3bDAsMGMwLDIuNzk0LDEuMTI5LDUuMzE0LDIuOTYsNy4xNDdsMCwwYzEuODMyLDEuODMsNC4zNTIsMi45Niw3LjE0NywyLjk2bDAsMCAgICAgYzIuNzk1LDAsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2bDAsMGMxLjgzMS0xLjgzMywyLjk1OS00LjM1MywyLjk2LTcuMTQ3bDAsMGMtMC4wMDEtMi43OTUtMS4xMjktNS'+
			'4zMTQtMi45Ni03LjE0N2wwLDAgICAgIGMtMS44MzMtMS44MzItNC4zNTMtMi45Ni03LjE0Ny0yLjk2bDAsMEMxMy4yMDUsNS44OTQsMTAuNjg2LDcuMDIyLDguODUzLDguODU0TDguODUzLDguODU0eiIvPgogIDwvZz4KICA8cGF0aCBkPSJNMTguMDcsMjAuMDAxYy0wLjE3NC0wLjYzOCwwLjIwMy0xLjI5NSwwLjg0MS0xLjQ2OWwwLDBjMS4xMzQtMC4zMDYsMi4wNTUtMC43ODksMi42MzMtMS4zMDVsMCwwICAgIGMwLjU4NC0wLjUyNiwwLjc5Ny0xLjAwOCwwLjc5OC0xLjQ0NGwwLDBjLTAuMDAyLTAuMzEtMC4xMDItMC42MTctMC4zNTktMC45N2wwLDBjLTAuMjU2LTAuMzUtMC42NzgtMC43MjEt'+
			'MS4yNDctMS4wNDVsMCwwICAgIGMtMS4xMzctMC42NTYtMi44NC0xLjExLTQuNzM1LTEuMTA2bDAsMGMtMS40MjItMC4wMDEtMi43MzUsMC4yNS0zLjc4MywwLjY1N2wwLDBjLTEuMDUxLDAuNDAyLTEuODE5LDAuOTY5LTIuMjAxLDEuNDk1bDAsMCAgICBjLTAuMjU3LDAuMzU0LTAuMzU2LDAuNjYxLTAuMzU4LDAuOTdsMCwwYzAuMDAxLDAuMjg4LDAuMDg3LDAuNTcxLDAuMzA2LDAuODk1bDAsMGMwLjIxNywwLjMyMSwwLjU3NSwwLjY2NiwxLjA2NSwwLjk3OGwwLDAgICAgaDAuMDAxYzAuNTU3LDAuMzU2LDAuNzIsMS4wOTYsMC4zNjQsMS42NTJsMCwwYy0wLjM1NSwwLjU1Ny0xLjA5NSwwLjcyLT'+
			'EuNjUyLDAuMzY0bDAsMGMtMC43MDYtMC40NTEtMS4zMS0wLjk5NC0xLjc1NS0xLjY0NmwwLDAgICAgYy0wLjQ0NC0wLjY0Ny0wLjcyMy0xLjQyMy0wLjcyMi0yLjI0M2wwLDBjLTAuMDAxLTAuODgzLDAuMzIxLTEuNzEyLDAuODI3LTIuMzkybDAsMGMwLjUwNy0wLjY4NCwxLjE4OC0xLjI0NCwxLjk4My0xLjdsMCwwICAgIGMxLjU5Mi0wLjkwNywzLjY1Ny0xLjQxOSw1LjkyNS0xLjQyM2wwLDBjMS43LDAsMy4yODgsMC4yOTMsNC42NDYsMC44MThsMCwwYzEuMzU1LDAuNTI5LDIuNDk4LDEuMjgxLDMuMjYxLDIuMzA1bDAsMCAgICBjMC41MDYsMC42OCwwLjgyOSwxLjUwOCwwLjgyNiwyLjM5Mmww'+
			'LDBjMC4wMDEsMS4yODgtMC42NjgsMi40MTMtMS42MDIsMy4yMzNsMCwwYy0wLjk0MiwwLjgzMi0yLjE3OCwxLjQzOC0zLjU5NCwxLjgyNWwwLDAgICAgYy0wLjEwNCwwLjAyOC0wLjIxMSwwLjA0Mi0wLjMxNCwwLjA0MmwwLDBDMTguNjk2LDIwLjg4NCwxOC4yMTQsMjAuNTMzLDE4LjA3LDIwLjAwMUwxOC4wNywyMC4wMDF6Ii8+CiAgPHBhdGggZD0iTTE2LjM5NiwyMy42MjFsLTMuMzczLTMuMDM5Yy0wLjI1MS0wLjIyNi0wLjM5Ni0wLjU1MS0wLjM5Ni0wLjg4OWwwLDBjMC0wLjMzNywwLjE0Ni0wLjY2MywwLjM5Ni0wLjg4OSAgICBsMCwwbDMuMzc0LTMuMDM5YzAuNDkxLTAuNDQyLDEuMjQ3LT'+
			'AuNDAzLDEuNjg5LDAuMDg4bDAsMGMwLjQ0MiwwLjQ5MSwwLjQwMiwxLjI0Ny0wLjA4OCwxLjY4OWwwLDBsLTIuMzg2LDIuMTVsMi4zODYsMi4xNDkgICAgYzAuNDksMC40NDIsMC41MywxLjE5OSwwLjA4OCwxLjY5bDAsMGMtMC4yMzYsMC4yNjItMC41NjIsMC4zOTUtMC44OSwwLjM5NWwwLDBDMTYuOTEyLDIzLjkyOCwxNi42MjUsMjMuODI2LDE2LjM5NiwyMy42MjEgICAgTDE2LjM5NiwyMy42MjF6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._autorotate__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="autorotate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 240px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._autorotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._autorotate.onclick=function (e) {
			player.toggleAutorotate();
		}
		me._autorotate.onmouseenter=function (e) {
			me._autorotate__img.style.visibility='hidden';
			me._autorotate__imgo.style.visibility='inherit';
			me._tt_autorotate.style.transition='none';
			me._tt_autorotate.style.visibility=(Number(me._tt_autorotate.style.opacity)>0||!me._tt_autorotate.style.opacity)?'inherit':'hidden';
			me._tt_autorotate.ggVisible=true;
			me.elementMouseOver['autorotate']=true;
		}
		me._autorotate.onmouseleave=function (e) {
			me._autorotate__img.style.visibility='inherit';
			me._autorotate__imgo.style.visibility='hidden';
			me._tt_autorotate.style.transition='none';
			me._tt_autorotate.style.visibility='hidden';
			me._tt_autorotate.ggVisible=false;
			me.elementMouseOver['autorotate']=false;
		}
		me._autorotate.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_autorotate=document.createElement('div');
		els=me._tt_autorotate__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_autorotate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -65px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_autorotate.ggUpdateText=function() {
			var params = [];
			var hs = player._("Start\/Stop Autorotation", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_autorotate.ggUpdateText();
		el.appendChild(els);
		me._tt_autorotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_autorotate.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_autorotate_white=document.createElement('div');
		els=me._tt_autorotate_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_autorotate_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_autorotate_white.ggUpdateText=function() {
			var params = [];
			var hs = player._("Start\/Stop Autorotation", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_autorotate_white.ggUpdateText();
		el.appendChild(els);
		me._tt_autorotate_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_autorotate_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_autorotate.appendChild(me._tt_autorotate_white);
		me._autorotate.appendChild(me._tt_autorotate);
		me._controller0.appendChild(me._autorotate);
		el=me._info=document.createElement('div');
		els=me._info__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNSwxNiwzLjVsMCwwYzYuOTAzLDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAgICAgIGMtMC4wMDEsNi45MDMtNS41OTcsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTguODU0LDguODUzICAgICBDNy4wMjIsMTAuNjg2LDUu'+
			'ODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBjMC4wMDEsMi43OTUsMS4xMjksNS4zMTQsMi45NjEsNy4xNDZsMCwwYzEuODMyLDEuODMxLDQuMzUyLDIuOTYsNy4xNDYsMi45NmwwLDAgICAgIGMyLjc5NSwwLDUuMzE0LTEuMTI5LDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMyLDIuOTU5LTQuMzUyLDIuOTYtNy4xNDZsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCAgICAgQzIxLjMxMyw3LjAyMiwxOC43OTUsNS44OTMsMTYsNS44OTJsMCwwQzEzLjIwNSw1Ljg5MywxMC42ODYsNy4wMjIsOC44NTQsOC44NTNMOC44NTQsOC44NTN6Ii8+CiAgPC9nPgogIDxnPgogICA8cG'+
			'F0aCBkPSJNMTQuOTYzLDEwLjA1VjkuNTIxYzAtMC42NjEsMC41MzYtMS4xOTYsMS4xOTctMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNiwxLjE5NiwxLjE5NmwwLDB2MC41MjkgICAgIGMwLDAuNjYxLTAuNTM2LDEuMTk2LTEuMTk2LDEuMTk2bDAsMEMxNS41LDExLjI0NywxNC45NjMsMTAuNzExLDE0Ljk2MywxMC4wNUwxNC45NjMsMTAuMDV6Ii8+CiAgIDxnPgogICAgPHBhdGggZD0iTTE4LjUzMiwyMC4zOTFoLTEuMTc2di02LjQ3M2MwLTAuMDIxLTAuMDA1LTAuMDQyLTAuMDA2LTAuMDYzYzAtMC4wMTQsMC4wMDQtMC4wMjYsMC4wMDQtMC4wNCAgICAgIGMwLTAuNjYxLTAuNTM2LTEuMTk2'+
			'LTEuMTk2LTEuMTk2aC0yLjIyNmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMS4wMzF2NS4zNzloLTEuMjA3ICAgICAgYy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5Nmg0Ljc3NWMwLjY2LDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTYgICAgICBDMTkuNzI5LDIwLjkyNiwxOS4xOTIsMjAuMzkxLDE4LjUzMiwyMC4zOTF6Ii8+CiAgIDwvZz4KICA8L2c+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIj'+
			'4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41LDE2LDMuNWwwLDBjNi45MDMsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCAgICAgYy0wLjAwMSw2LjkwMy01LjU5NywxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwMywzLjUsMTZMMy41LDE2eiBNOC44NTQsOC44NTMgICAgIEM3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLjAwMSwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2MSw3LjE0NmwwLDBjMS44MzIsMS44MzEsNC4zNTIsMi45Niw3LjE0NiwyLjk2bDAsMCAgICAgYzIuNzk1LDAsNS4zMTQtMS4xMjks'+
			'Ny4xNDctMi45NmwwLDBjMS44MzEtMS44MzIsMi45NTktNC4zNTIsMi45Ni03LjE0NmwwLDBjLTAuMDAxLTIuNzk1LTEuMTI5LTUuMzE0LTIuOTYtNy4xNDdsMCwwICAgICBDMjEuMzEzLDcuMDIyLDE4Ljc5NSw1Ljg5MywxNiw1Ljg5MmwwLDBDMTMuMjA1LDUuODkzLDEwLjY4Niw3LjAyMiw4Ljg1NCw4Ljg1M0w4Ljg1NCw4Ljg1M3oiLz4KICA8L2c+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xNC45NjMsMTAuMDVWOS41MjFjMC0wLjY2MSwwLjUzNi0xLjE5NiwxLjE5Ny0xLjE5NmwwLDBjMC42NiwwLDEuMTk2LDAuNTM2LDEuMTk2LDEuMTk2bDAsMHYwLjUyOSAgICAgYzAsMC42NjEtMC41MzYsMS4xOT'+
			'YtMS4xOTYsMS4xOTZsMCwwQzE1LjUsMTEuMjQ3LDE0Ljk2MywxMC43MTEsMTQuOTYzLDEwLjA1TDE0Ljk2MywxMC4wNXoiLz4KICAgPGc+CiAgICA8cGF0aCBkPSJNMTguNTMyLDIwLjM5MWgtMS4xNzZ2LTYuNDczYzAtMC4wMjEtMC4wMDUtMC4wNDItMC4wMDYtMC4wNjNjMC0wLjAxNCwwLjAwNC0wLjAyNiwwLjAwNC0wLjA0ICAgICAgYzAtMC42NjEtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTIuMjI2Yy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgxLjAzMXY1LjM3OWgtMS4yMDcgICAgICBjLTAuNjYxLDAtMS4xOTcsMC41'+
			'MzUtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDQuNzc1YzAuNjYsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NiAgICAgIEMxOS43MjksMjAuOTI2LDE5LjE5MiwyMC4zOTEsMTguNTMyLDIwLjM5MXoiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._info__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._info__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41LDE2LDMuNWwwLDBjNi45MDMsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCAgICAgYy0wLjAwMSw2LjkwMy01LjU5NywxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTks'+
			'My41LDIyLjkwMywzLjUsMTZMMy41LDE2eiBNOC44NTQsOC44NTMgICAgIEM3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLjAwMSwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2MSw3LjE0NmwwLDBjMS44MzIsMS44MzEsNC4zNTIsMi45Niw3LjE0NiwyLjk2bDAsMCAgICAgYzIuNzk1LDAsNS4zMTQtMS4xMjksNy4xNDctMi45NmwwLDBjMS44MzEtMS44MzIsMi45NTktNC4zNTIsMi45Ni03LjE0NmwwLDBjLTAuMDAxLTIuNzk1LTEuMTI5LTUuMzE0LTIuOTYtNy4xNDdsMCwwICAgICBDMjEuMzEzLDcuMDIyLDE4Ljc5NSw1Ljg5MywxNiw1Ljg5MmwwLDBDMTMuMjA1LDUuODkzLD'+
			'EwLjY4Niw3LjAyMiw4Ljg1NCw4Ljg1M0w4Ljg1NCw4Ljg1M3oiLz4KICA8L2c+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xNC45NjMsMTAuMDVWOS41MjFjMC0wLjY2MSwwLjUzNi0xLjE5NiwxLjE5Ny0xLjE5NmwwLDBjMC42NiwwLDEuMTk2LDAuNTM2LDEuMTk2LDEuMTk2bDAsMHYwLjUyOSAgICAgYzAsMC42NjEtMC41MzYsMS4xOTYtMS4xOTYsMS4xOTZsMCwwQzE1LjUsMTEuMjQ3LDE0Ljk2MywxMC43MTEsMTQuOTYzLDEwLjA1TDE0Ljk2MywxMC4wNXoiLz4KICAgPGc+CiAgICA8cGF0aCBkPSJNMTguNTMyLDIwLjM5MWgtMS4xNzZ2LTYuNDczYzAtMC4wMjEtMC4wMDUtMC4wNDItMC4wMDYtMC4w'+
			'NjNjMC0wLjAxNCwwLjAwNC0wLjAyNiwwLjAwNC0wLjA0ICAgICAgYzAtMC42NjEtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTIuMjI2Yy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgxLjAzMXY1LjM3OWgtMS4yMDcgICAgICBjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDQuNzc1YzAuNjYsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NiAgICAgIEMxOS43MjksMjAuOTI2LDE5LjE5MiwyMC4zOTEsMTguNTMyLDIwLjM5MXoiLz4KICAgPC9nPgogIDwvZz4KID'+
			'wvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNSwxNiwzLjVsMCwwYzYuOTAzLDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAgICAgIGMtMC4wMDEsNi45MDMtNS41OTcsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTguODU0LDguODUzICAgICBDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIw'+
			'NSw1Ljg5MywxNmwwLDBjMC4wMDEsMi43OTUsMS4xMjksNS4zMTQsMi45NjEsNy4xNDZsMCwwYzEuODMyLDEuODMxLDQuMzUyLDIuOTYsNy4xNDYsMi45NmwwLDAgICAgIGMyLjc5NSwwLDUuMzE0LTEuMTI5LDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMyLDIuOTU5LTQuMzUyLDIuOTYtNy4xNDZsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCAgICAgQzIxLjMxMyw3LjAyMiwxOC43OTUsNS44OTMsMTYsNS44OTJsMCwwQzEzLjIwNSw1Ljg5MywxMC42ODYsNy4wMjIsOC44NTQsOC44NTNMOC44NTQsOC44NTN6Ii8+CiAgPC9nPgogIDxnPgogICA8cGF0aCBkPSJNMT'+
			'QuOTYzLDEwLjA1VjkuNTIxYzAtMC42NjEsMC41MzYtMS4xOTYsMS4xOTctMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNiwxLjE5NiwxLjE5NmwwLDB2MC41MjkgICAgIGMwLDAuNjYxLTAuNTM2LDEuMTk2LTEuMTk2LDEuMTk2bDAsMEMxNS41LDExLjI0NywxNC45NjMsMTAuNzExLDE0Ljk2MywxMC4wNUwxNC45NjMsMTAuMDV6Ii8+CiAgIDxnPgogICAgPHBhdGggZD0iTTE4LjUzMiwyMC4zOTFoLTEuMTc2di02LjQ3M2MwLTAuMDIxLTAuMDA1LTAuMDQyLTAuMDA2LTAuMDYzYzAtMC4wMTQsMC4wMDQtMC4wMjYsMC4wMDQtMC4wNCAgICAgIGMwLTAuNjYxLTAuNTM2LTEuMTk2LTEuMTk2LTEu'+
			'MTk2aC0yLjIyNmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMS4wMzF2NS4zNzloLTEuMjA3ICAgICAgYy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5Nmg0Ljc3NWMwLjY2LDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTYgICAgICBDMTkuNzI5LDIwLjkyNiwxOS4xOTIsMjAuMzkxLDE4LjUzMiwyMC4zOTF6Ii8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._info__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 280px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info.onmouseenter=function (e) {
			me._info__img.style.visibility='hidden';
			me._info__imgo.style.visibility='inherit';
			me._tt_info.style.transition='none';
			me._tt_info.style.visibility=(Number(me._tt_info.style.opacity)>0||!me._tt_info.style.opacity)?'inherit':'hidden';
			me._tt_info.ggVisible=true;
			me.elementMouseOver['info']=true;
		}
		me._info.onmouseleave=function (e) {
			me._info__img.style.visibility='inherit';
			me._info__imgo.style.visibility='hidden';
			me._tt_info.style.transition='none';
			me._tt_info.style.visibility='hidden';
			me._tt_info.ggVisible=false;
			me.elementMouseOver['info']=false;
		}
		me._info.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_info=document.createElement('div');
		els=me._tt_info__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -55px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_info.ggUpdateText=function() {
			var params = [];
			var hs = player._("Show Information", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_info.ggUpdateText();
		el.appendChild(els);
		me._tt_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_info_white=document.createElement('div');
		els=me._tt_info_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_info_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_info_white.ggUpdateText=function() {
			var params = [];
			var hs = player._("Show Information", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_info_white.ggUpdateText();
		el.appendChild(els);
		me._tt_info_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_info_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_info.appendChild(me._tt_info_white);
		me._info.appendChild(me._tt_info);
		me._controller0.appendChild(me._info);
		el=me._movemode=document.createElement('div');
		els=me._movemode__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTE2LDMuNUM5LjA5NiwzLjUsMy41MDEsOS4wOTYsMy41LDE2YzAsNi45MDQsNS41OTYsMTIuNSwxMi41LDEyLjVjNi45MDQtMC4wMDEsMTIuNS01LjU5NiwxMi41LTEyLjUgICAgQzI4LjQ5OSw5LjA5NiwyMi45MDQsMy41LDE2LDMuNXogTTIzLjMyNCwyMi45NjJsLTAuNDktMC44OTZjMC42OTQtMS43NiwwLjU2NS0zLjk4OS0wLjE2MS01LjcyMiAg'+
			'ICBjLTAuMDA3LTAuMTMzLTAuMDM2LTAuMjY3LTAuMDk2LTAuMzk1bC0yLjI3OS00Ljk0OGMtMC4yNDctMC41MzMtMC44NzktMC43NjYtMS40MTItMC41MjFjLTAuNTMzLDAuMjQ2LTAuNzY2LDAuODc3LTAuNTIxLDEuNDExICAgIGwxLjQxLDMuMDU4bC0wLjIyNiwwLjA5NWwtMy4yODgtNi4wMDdjLTAuMjgyLTAuNTE1LTAuOTI4LTAuNzA0LTEuNDQzLTAuNDIyYy0wLjUxNSwwLjI4Mi0wLjcwNCwwLjkyOC0wLjQyMiwxLjQ0M2wzLjE4NCw1LjgxNyAgICBsLTAuMjE1LDAuMDlsLTMuODgzLTcuMDk0Yy0wLjI4Mi0wLjUxNi0wLjkyOS0wLjcwNS0xLjQ0My0wLjQyMmMtMC41MTYsMC4yODItMC43MD'+
			'UsMC45MjgtMC40MjIsMS40NDNsMy43OCw2LjkwNWwtMC4yNjMsMC4xMTEgICAgbC0xLjc2Ny0yLjA4MmwtMi4zODUtMi44MTFjLTAuMzgtMC40NDgtMS4wNTEtMC41MDMtMS40OTktMC4xMjNjLTAuNDQ4LDAuMzc5LTAuNTAzLDEuMDUxLTAuMTIzLDEuNDk5bDIuMzg1LDIuODExbDIuMzQsMi43NTkgICAgbDEuMTI5LDIuMzQ4bC0wLjIyNiwwLjE2OGMtMC4wNTQtMC4wNzQtMC4xMTQtMC4xNDUtMC4xODYtMC4yMDdsLTMuMjM1LTIuNzljLTAuNS0wLjQzMi0xLjI1NS0wLjM3Ni0xLjY4NywwLjEyNCAgICBjLTAuNDMyLDAuNS0wLjM3NiwxLjI1NiwwLjEyNCwxLjY4N2wzLjA0NiwyLjYyOWwtMC4w'+
			'MDIsMC4wMDJjMC4wMzQsMC4wMjksMC4wNjgsMC4wNTYsMC4xMDMsMC4wODVsMC4wODcsMC4wNzUgICAgYzAuMDA3LDAuMDA2LDAuMDE1LDAuMDEsMC4wMjIsMC4wMTZjMS41MDIsMS4yNTcsMy4wNjEsMi4wMzksNC42ODgsMi4wNjhsMC4zNjcsMC42NzJjLTAuNzQ0LDAuMTc0LTEuNTE5LDAuMjctMi4zMTgsMC4yNyAgICBjLTIuNzk1LTAuMDAxLTUuMzE0LTEuMTMtNy4xNDctMi45NjFDNy4wMjIsMjEuMzEzLDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NCwxLjEyOS01LjMxNCwyLjk2MS03LjE0NyAgICBjMS44MzMtMS44MzEsNC4zNTItMi45NTksNy4xNDctMi45NmMyLjc5NCwwLj'+
			'AwMSw1LjMxNCwxLjEzLDcuMTQ3LDIuOTZjMS44MzEsMS44MzMsMi45Niw0LjM1MywyLjk2MSw3LjE0NyAgICBDMjYuMTA3LDE4LjcwMywyNS4wNSwyMS4xNDYsMjMuMzI0LDIyLjk2MnoiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0xNiwzLjVDOS4wOTYsMy41LDMuNTAxLDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjUsMTIuNSwxMi41YzYuOTA0LTAuMDAxLDEyLjUtNS41OTYsMTIuNS0xMi41ICAgIEMyOC40OTksOS4wOTYsMjIuOTA0LDMuNSwxNiwzLjV6IE0yMy4zMjQsMjIuOTYybC0wLjQ5'+
			'LTAuODk2YzAuNjk0LTEuNzYsMC41NjUtMy45ODktMC4xNjEtNS43MjIgICAgYy0wLjAwNy0wLjEzMy0wLjAzNi0wLjI2Ny0wLjA5Ni0wLjM5NWwtMi4yNzktNC45NDhjLTAuMjQ3LTAuNTMzLTAuODc5LTAuNzY2LTEuNDEyLTAuNTIxYy0wLjUzMywwLjI0Ni0wLjc2NiwwLjg3Ny0wLjUyMSwxLjQxMSAgICBsMS40MSwzLjA1OGwtMC4yMjYsMC4wOTVsLTMuMjg4LTYuMDA3Yy0wLjI4Mi0wLjUxNS0wLjkyOC0wLjcwNC0xLjQ0My0wLjQyMmMtMC41MTUsMC4yODItMC43MDQsMC45MjgtMC40MjIsMS40NDNsMy4xODQsNS44MTcgICAgbC0wLjIxNSwwLjA5bC0zLjg4My03LjA5NGMtMC4yODItMC41MT'+
			'YtMC45MjktMC43MDUtMS40NDMtMC40MjJjLTAuNTE2LDAuMjgyLTAuNzA1LDAuOTI4LTAuNDIyLDEuNDQzbDMuNzgsNi45MDVsLTAuMjYzLDAuMTExICAgIGwtMS43NjctMi4wODJsLTIuMzg1LTIuODExYy0wLjM4LTAuNDQ4LTEuMDUxLTAuNTAzLTEuNDk5LTAuMTIzYy0wLjQ0OCwwLjM3OS0wLjUwMywxLjA1MS0wLjEyMywxLjQ5OWwyLjM4NSwyLjgxMWwyLjM0LDIuNzU5ICAgIGwxLjEyOSwyLjM0OGwtMC4yMjYsMC4xNjhjLTAuMDU0LTAuMDc0LTAuMTE0LTAuMTQ1LTAuMTg2LTAuMjA3bC0zLjIzNS0yLjc5Yy0wLjUtMC40MzItMS4yNTUtMC4zNzYtMS42ODcsMC4xMjQgICAgYy0wLjQzMiww'+
			'LjUtMC4zNzYsMS4yNTYsMC4xMjQsMS42ODdsMy4wNDYsMi42MjlsLTAuMDAyLDAuMDAyYzAuMDM0LDAuMDI5LDAuMDY4LDAuMDU2LDAuMTAzLDAuMDg1bDAuMDg3LDAuMDc1ICAgIGMwLjAwNywwLjAwNiwwLjAxNSwwLjAxLDAuMDIyLDAuMDE2YzEuNTAyLDEuMjU3LDMuMDYxLDIuMDM5LDQuNjg4LDIuMDY4bDAuMzY3LDAuNjcyYy0wLjc0NCwwLjE3NC0xLjUxOSwwLjI3LTIuMzE4LDAuMjcgICAgYy0yLjc5NS0wLjAwMS01LjMxNC0xLjEzLTcuMTQ3LTIuOTYxQzcuMDIyLDIxLjMxMyw1Ljg5NCwxOC43OTUsNS44OTMsMTZjMC4wMDEtMi43OTQsMS4xMjktNS4zMTQsMi45NjEtNy4xNDcgICAgYz'+
			'EuODMzLTEuODMxLDQuMzUyLTIuOTU5LDcuMTQ3LTIuOTZjMi43OTQsMC4wMDEsNS4zMTQsMS4xMyw3LjE0NywyLjk2YzEuODMxLDEuODMzLDIuOTYsNC4zNTMsMi45NjEsNy4xNDcgICAgQzI2LjEwNywxOC43MDMsMjUuMDUsMjEuMTQ2LDIzLjMyNCwyMi45NjJ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._movemode__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._movemode__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMTYsMy41QzkuMDk2LDMuNSwzLjUwMSw5LjA5NiwzLjUsMTZjMCw2LjkwNCw1LjU5NiwxMi41LDEyLjUsMTIuNWM2LjkwNC0wLjAwMSwxMi41LTUuNTk2LDEyLjUtMTIuNSAgICBDMjguNDk5LDkuMDk2LDIyLjkwNCwzLjUsMTYsMy41eiBNMjMu'+
			'MzI0LDIyLjk2MmwtMC40OS0wLjg5NmMwLjY5NC0xLjc2LDAuNTY1LTMuOTg5LTAuMTYxLTUuNzIyICAgIGMtMC4wMDctMC4xMzMtMC4wMzYtMC4yNjctMC4wOTYtMC4zOTVsLTIuMjc5LTQuOTQ4Yy0wLjI0Ny0wLjUzMy0wLjg3OS0wLjc2Ni0xLjQxMi0wLjUyMWMtMC41MzMsMC4yNDYtMC43NjYsMC44NzctMC41MjEsMS40MTEgICAgbDEuNDEsMy4wNThsLTAuMjI2LDAuMDk1bC0zLjI4OC02LjAwN2MtMC4yODItMC41MTUtMC45MjgtMC43MDQtMS40NDMtMC40MjJjLTAuNTE1LDAuMjgyLTAuNzA0LDAuOTI4LTAuNDIyLDEuNDQzbDMuMTg0LDUuODE3ICAgIGwtMC4yMTUsMC4wOWwtMy44ODMtNy'+
			'4wOTRjLTAuMjgyLTAuNTE2LTAuOTI5LTAuNzA1LTEuNDQzLTAuNDIyYy0wLjUxNiwwLjI4Mi0wLjcwNSwwLjkyOC0wLjQyMiwxLjQ0M2wzLjc4LDYuOTA1bC0wLjI2MywwLjExMSAgICBsLTEuNzY3LTIuMDgybC0yLjM4NS0yLjgxMWMtMC4zOC0wLjQ0OC0xLjA1MS0wLjUwMy0xLjQ5OS0wLjEyM2MtMC40NDgsMC4zNzktMC41MDMsMS4wNTEtMC4xMjMsMS40OTlsMi4zODUsMi44MTFsMi4zNCwyLjc1OSAgICBsMS4xMjksMi4zNDhsLTAuMjI2LDAuMTY4Yy0wLjA1NC0wLjA3NC0wLjExNC0wLjE0NS0wLjE4Ni0wLjIwN2wtMy4yMzUtMi43OWMtMC41LTAuNDMyLTEuMjU1LTAuMzc2LTEuNjg3LDAu'+
			'MTI0ICAgIGMtMC40MzIsMC41LTAuMzc2LDEuMjU2LDAuMTI0LDEuNjg3bDMuMDQ2LDIuNjI5bC0wLjAwMiwwLjAwMmMwLjAzNCwwLjAyOSwwLjA2OCwwLjA1NiwwLjEwMywwLjA4NWwwLjA4NywwLjA3NSAgICBjMC4wMDcsMC4wMDYsMC4wMTUsMC4wMSwwLjAyMiwwLjAxNmMxLjUwMiwxLjI1NywzLjA2MSwyLjAzOSw0LjY4OCwyLjA2OGwwLjM2NywwLjY3MmMtMC43NDQsMC4xNzQtMS41MTksMC4yNy0yLjMxOCwwLjI3ICAgIGMtMi43OTUtMC4wMDEtNS4zMTQtMS4xMy03LjE0Ny0yLjk2MUM3LjAyMiwyMS4zMTMsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk0LDEuMTI5LTUuMzE0LD'+
			'IuOTYxLTcuMTQ3ICAgIGMxLjgzMy0xLjgzMSw0LjM1Mi0yLjk1OSw3LjE0Ny0yLjk2YzIuNzk0LDAuMDAxLDUuMzE0LDEuMTMsNy4xNDcsMi45NmMxLjgzMSwxLjgzMywyLjk2LDQuMzUzLDIuOTYxLDcuMTQ3ICAgIEMyNi4xMDcsMTguNzAzLDI1LjA1LDIxLjE0NiwyMy4zMjQsMjIuOTYyeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMTYsMy41QzkuMDk2LDMuNSwzLjUwMSw5LjA5NiwzLjUsMTZj'+
			'MCw2LjkwNCw1LjU5NiwxMi41LDEyLjUsMTIuNWM2LjkwNC0wLjAwMSwxMi41LTUuNTk2LDEyLjUtMTIuNSAgICBDMjguNDk5LDkuMDk2LDIyLjkwNCwzLjUsMTYsMy41eiBNMjMuMzI0LDIyLjk2MmwtMC40OS0wLjg5NmMwLjY5NC0xLjc2LDAuNTY1LTMuOTg5LTAuMTYxLTUuNzIyICAgIGMtMC4wMDctMC4xMzMtMC4wMzYtMC4yNjctMC4wOTYtMC4zOTVsLTIuMjc5LTQuOTQ4Yy0wLjI0Ny0wLjUzMy0wLjg3OS0wLjc2Ni0xLjQxMi0wLjUyMWMtMC41MzMsMC4yNDYtMC43NjYsMC44NzctMC41MjEsMS40MTEgICAgbDEuNDEsMy4wNThsLTAuMjI2LDAuMDk1bC0zLjI4OC02LjAwN2MtMC4yODItMC'+
			'41MTUtMC45MjgtMC43MDQtMS40NDMtMC40MjJjLTAuNTE1LDAuMjgyLTAuNzA0LDAuOTI4LTAuNDIyLDEuNDQzbDMuMTg0LDUuODE3ICAgIGwtMC4yMTUsMC4wOWwtMy44ODMtNy4wOTRjLTAuMjgyLTAuNTE2LTAuOTI5LTAuNzA1LTEuNDQzLTAuNDIyYy0wLjUxNiwwLjI4Mi0wLjcwNSwwLjkyOC0wLjQyMiwxLjQ0M2wzLjc4LDYuOTA1bC0wLjI2MywwLjExMSAgICBsLTEuNzY3LTIuMDgybC0yLjM4NS0yLjgxMWMtMC4zOC0wLjQ0OC0xLjA1MS0wLjUwMy0xLjQ5OS0wLjEyM2MtMC40NDgsMC4zNzktMC41MDMsMS4wNTEtMC4xMjMsMS40OTlsMi4zODUsMi44MTFsMi4zNCwyLjc1OSAgICBsMS4x'+
			'MjksMi4zNDhsLTAuMjI2LDAuMTY4Yy0wLjA1NC0wLjA3NC0wLjExNC0wLjE0NS0wLjE4Ni0wLjIwN2wtMy4yMzUtMi43OWMtMC41LTAuNDMyLTEuMjU1LTAuMzc2LTEuNjg3LDAuMTI0ICAgIGMtMC40MzIsMC41LTAuMzc2LDEuMjU2LDAuMTI0LDEuNjg3bDMuMDQ2LDIuNjI5bC0wLjAwMiwwLjAwMmMwLjAzNCwwLjAyOSwwLjA2OCwwLjA1NiwwLjEwMywwLjA4NWwwLjA4NywwLjA3NSAgICBjMC4wMDcsMC4wMDYsMC4wMTUsMC4wMSwwLjAyMiwwLjAxNmMxLjUwMiwxLjI1NywzLjA2MSwyLjAzOSw0LjY4OCwyLjA2OGwwLjM2NywwLjY3MmMtMC43NDQsMC4xNzQtMS41MTksMC4yNy0yLjMxOCwwLj'+
			'I3ICAgIGMtMi43OTUtMC4wMDEtNS4zMTQtMS4xMy03LjE0Ny0yLjk2MUM3LjAyMiwyMS4zMTMsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk0LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3ICAgIGMxLjgzMy0xLjgzMSw0LjM1Mi0yLjk1OSw3LjE0Ny0yLjk2YzIuNzk0LDAuMDAxLDUuMzE0LDEuMTMsNy4xNDcsMi45NmMxLjgzMSwxLjgzMywyLjk2LDQuMzUzLDIuOTYxLDcuMTQ3ICAgIEMyNi4xMDcsMTguNzAzLDI1LjA1LDIxLjE0NiwyMy4zMjQsMjIuOTYyeiIvPgogPC9nPgo8L3N2Zz4K';
		me._movemode__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="movemode";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 320px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._movemode.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._movemode.onclick=function (e) {
			player.changeViewMode(2);
		}
		me._movemode.onmouseenter=function (e) {
			me._movemode__img.style.visibility='hidden';
			me._movemode__imgo.style.visibility='inherit';
			me._tt_movemode.style.transition='none';
			me._tt_movemode.style.visibility=(Number(me._tt_movemode.style.opacity)>0||!me._tt_movemode.style.opacity)?'inherit':'hidden';
			me._tt_movemode.ggVisible=true;
			me.elementMouseOver['movemode']=true;
		}
		me._movemode.onmouseleave=function (e) {
			me._movemode__img.style.visibility='inherit';
			me._movemode__imgo.style.visibility='hidden';
			me._tt_movemode.style.transition='none';
			me._tt_movemode.style.visibility='hidden';
			me._tt_movemode.ggVisible=false;
			me.elementMouseOver['movemode']=false;
		}
		me._movemode.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_movemode=document.createElement('div');
		els=me._tt_movemode__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_movemode";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -65px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_movemode.ggUpdateText=function() {
			var params = [];
			var hs = player._("Change Control Mode", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_movemode.ggUpdateText();
		el.appendChild(els);
		me._tt_movemode.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_movemode.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_movemode_white=document.createElement('div');
		els=me._tt_movemode_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_movemode_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_movemode_white.ggUpdateText=function() {
			var params = [];
			var hs = player._("Change Control Mode", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_movemode_white.ggUpdateText();
		el.appendChild(els);
		me._tt_movemode_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_movemode_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_movemode.appendChild(me._tt_movemode_white);
		me._movemode.appendChild(me._tt_movemode);
		me._controller0.appendChild(me._movemode);
		el=me._fullscreen=document.createElement('div');
		els=me._fullscreen__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTI4LjE0OSw3LjAzNGMtMC4yMjMtMC4yMjMtMC41MzEtMC4zNTEtMC44NDYtMC4zNTFINC42OTdjLTAuMzE1LDAtMC42MjQsMC4xMjctMC44NDYsMC4zNTEgICAgQzMuNjI4LDcuMjU3LDMuNSw3LjU2NCwzLjUsNy44OHY4LjExOGMwLDAuMDAxLDAsMC4wMDIsMCwwLjAwMnY4LjEyYzAsMC4zMTUsMC4xMjcsMC42MjMsMC4zNSwwLjg0NiAgICBjMC4y'+
			'MjMsMC4yMjQsMC41MzEsMC4zNTEsMC44NDYsMC4zNTFIMTZjMCwwLDAuMDAxLDAsMC4wMDEsMGgxMS4zMDJjMC4zMTksMCwwLjYyLTAuMTI0LDAuODQ2LTAuMzUxICAgIGMwLjIyNy0wLjIyNiwwLjM1MS0wLjUyNiwwLjM1MS0wLjg0NlY3Ljg4QzI4LjUsNy41NjQsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzNHogTTE0LjgwNCwyMi45MjRINS44OTN2LTUuNzI4aDguOTExVjIyLjkyNHogICAgIE0yNi4xMDcsMjIuOTI0aC04LjkxMVYxNmMwLTAuMzE1LTAuMTI4LTAuNjIzLTAuMzUtMC44NDZjLTAuMjIzLTAuMjIzLTAuNTMxLTAuMzUxLTAuODQ2LTAuMzUxSDUuODkzVjkuMDc3aDIwLjIxNVYyMi'+
			'45MjR6ICAgICBNMTguNjgyLDE1LjEzNWMwLjE3OCwwLDAuMzU3LTAuMDUsMC41MTctMC4xNTZsMC4yMjEtMC4xNDhjMC40MjgtMC4yODYsMC41NDItMC44NjMsMC4yNTctMS4yOTEgICAgYy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5LTAuMjU3bC0wLjIyMiwwLjE0N2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTcsMS4yOTEgICAgQzE4LjA4NywxNC45OSwxOC4zODIsMTUuMTM1LDE4LjY4MiwxNS4xMzV6IE0yNC4yMDgsMTEuNDQyYzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTYtMC4xNTdsMC4yMjItMC4xNDggICAgYzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU2LTEuMjkx'+
			'Yy0wLjI4NS0wLjQyNy0wLjg2Mi0wLjU0Mi0xLjI5LTAuMjU2bC0wLjIyMiwwLjE0N2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTYsMS4yOSAgICBDMjMuNjEzLDExLjI5NywyMy45MDcsMTEuNDQyLDI0LjIwOCwxMS40NDJ6IE0yMS40NDQsMTMuMjg5YzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDcgICAgYzAuNDI4LTAuMjg2LDAuNTQyLTAuODYzLDAuMjU3LTEuMjkxYy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1N2wtMC4yMiwwLjE0N2MtMC40MjgsMC4yODYtMC41NDMsMC44NjMtMC4yNTcsMS4yOTEgICAgQzIwLjg1LDEzLjE0NCwyMS'+
			'4xNDUsMTMuMjg5LDIxLjQ0NCwxMy4yODl6Ii8+CiA8L2c+CiA8Zz4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiBkPSJNMjguMTQ5LDcuMDM0Yy0wLjIyMy0wLjIyMy0wLjUzMS0wLjM1MS0wLjg0Ni0wLjM1MUg0LjY5N2MtMC4zMTUsMC0wLjYyNCwwLjEyNy0wLjg0NiwwLjM1MSAgICBDMy42MjgsNy4yNTcsMy41LDcuNTY0LDMuNSw3Ljg4djguMTE4YzAsMC4wMDEsMCwwLjAwMiwwLDAuMDAydjguMTJjMCwwLjMxNSwwLjEyNywwLjYyMywwLjM1LDAuODQ2ICAgIGMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MUgxNmMw'+
			'LDAsMC4wMDEsMCwwLjAwMSwwaDExLjMwMmMwLjMxOSwwLDAuNjItMC4xMjQsMC44NDYtMC4zNTEgICAgYzAuMjI3LTAuMjI2LDAuMzUxLTAuNTI2LDAuMzUxLTAuODQ2VjcuODhDMjguNSw3LjU2NCwyOC4zNzIsNy4yNTcsMjguMTQ5LDcuMDM0eiBNMTQuODA0LDIyLjkyNEg1Ljg5M3YtNS43MjhoOC45MTFWMjIuOTI0eiAgICAgTTI2LjEwNywyMi45MjRoLTguOTExVjE2YzAtMC4zMTUtMC4xMjgtMC42MjMtMC4zNS0wLjg0NmMtMC4yMjMtMC4yMjMtMC41MzEtMC4zNTEtMC44NDYtMC4zNTFINS44OTNWOS4wNzdoMjAuMjE1VjIyLjkyNHogICAgIE0xOC42ODIsMTUuMTM1YzAuMTc4LDAsMC4zNT'+
			'ctMC4wNSwwLjUxNy0wLjE1NmwwLjIyMS0wLjE0OGMwLjQyOC0wLjI4NiwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5MSAgICBjLTAuMjg1LTAuNDI4LTAuODYzLTAuNTQyLTEuMjktMC4yNTdsLTAuMjIyLDAuMTQ3Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MSAgICBDMTguMDg3LDE0Ljk5LDE4LjM4MiwxNS4xMzUsMTguNjgyLDE1LjEzNXogTTI0LjIwOCwxMS40NDJjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNi0wLjE1N2wwLjIyMi0wLjE0OCAgICBjMC40MjgtMC4yODUsMC41NDItMC44NjMsMC4yNTYtMS4yOTFjLTAuMjg1LTAuNDI3LTAuODYyLTAuNTQyLTEuMjktMC4yNTZs'+
			'LTAuMjIyLDAuMTQ3Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NiwxLjI5ICAgIEMyMy42MTMsMTEuMjk3LDIzLjkwNywxMS40NDIsMjQuMjA4LDExLjQ0MnogTTIxLjQ0NCwxMy4yODljMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNy0wLjE1N2wwLjIyMS0wLjE0NyAgICBjMC40MjgtMC4yODYsMC41NDItMC44NjMsMC4yNTctMS4yOTFjLTAuMjg1LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU3bC0wLjIyLDAuMTQ3Yy0wLjQyOCwwLjI4Ni0wLjU0MywwLjg2My0wLjI1NywxLjI5MSAgICBDMjAuODUsMTMuMTQ0LDIxLjE0NSwxMy4yODksMjEuNDQ0LDEzLjI4OXoiLz4KIDwvZz4KPC'+
			'9zdmc+Cg==';
		me._fullscreen__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._fullscreen__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjguMTQ5LDcuMDM0Yy0wLjIyMy0wLjIyMy0wLjUzMS0wLjM1MS0wLjg0Ni0wLjM1MUg0LjY5N2MtMC4zMTUsMC0wLjYyNCwwLjEyNy0wLjg0NiwwLjM1MSAgICBDMy42MjgsNy4yNTcsMy41LDcuNTY0LDMuNSw3Ljg4djguMTE4YzAsMC4wMDEs'+
			'MCwwLjAwMiwwLDAuMDAydjguMTJjMCwwLjMxNSwwLjEyNywwLjYyMywwLjM1LDAuODQ2ICAgIGMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MUgxNmMwLDAsMC4wMDEsMCwwLjAwMSwwaDExLjMwMmMwLjMxOSwwLDAuNjItMC4xMjQsMC44NDYtMC4zNTEgICAgYzAuMjI3LTAuMjI2LDAuMzUxLTAuNTI2LDAuMzUxLTAuODQ2VjcuODhDMjguNSw3LjU2NCwyOC4zNzIsNy4yNTcsMjguMTQ5LDcuMDM0eiBNMTQuODA0LDIyLjkyNEg1Ljg5M3YtNS43MjhoOC45MTFWMjIuOTI0eiAgICAgTTI2LjEwNywyMi45MjRoLTguOTExVjE2YzAtMC4zMTUtMC4xMjgtMC42MjMtMC4zNS0wLjg0Nm'+
			'MtMC4yMjMtMC4yMjMtMC41MzEtMC4zNTEtMC44NDYtMC4zNTFINS44OTNWOS4wNzdoMjAuMjE1VjIyLjkyNHogICAgIE0xOC42ODIsMTUuMTM1YzAuMTc4LDAsMC4zNTctMC4wNSwwLjUxNy0wLjE1NmwwLjIyMS0wLjE0OGMwLjQyOC0wLjI4NiwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5MSAgICBjLTAuMjg1LTAuNDI4LTAuODYzLTAuNTQyLTEuMjktMC4yNTdsLTAuMjIyLDAuMTQ3Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MSAgICBDMTguMDg3LDE0Ljk5LDE4LjM4MiwxNS4xMzUsMTguNjgyLDE1LjEzNXogTTI0LjIwOCwxMS40NDJjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUx'+
			'Ni0wLjE1N2wwLjIyMi0wLjE0OCAgICBjMC40MjgtMC4yODUsMC41NDItMC44NjMsMC4yNTYtMS4yOTFjLTAuMjg1LTAuNDI3LTAuODYyLTAuNTQyLTEuMjktMC4yNTZsLTAuMjIyLDAuMTQ3Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NiwxLjI5ICAgIEMyMy42MTMsMTEuMjk3LDIzLjkwNywxMS40NDIsMjQuMjA4LDExLjQ0MnogTTIxLjQ0NCwxMy4yODljMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNy0wLjE1N2wwLjIyMS0wLjE0NyAgICBjMC40MjgtMC4yODYsMC41NDItMC44NjMsMC4yNTctMS4yOTFjLTAuMjg1LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU3bC0wLjIyLDAuMT'+
			'Q3Yy0wLjQyOCwwLjI4Ni0wLjU0MywwLjg2My0wLjI1NywxLjI5MSAgICBDMjAuODUsMTMuMTQ0LDIxLjE0NSwxMy4yODksMjEuNDQ0LDEzLjI4OXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSI+CiAgPHBhdGggZD0iTTI4LjE0OSw3LjAzNGMtMC4yMjMtMC4yMjMtMC41MzEtMC4zNTEtMC44NDYtMC4zNTFINC42OTdjLTAuMzE1LDAtMC42MjQsMC4xMjctMC44NDYsMC4zNTEgICAgQzMuNjI4LDcuMjU3LDMuNSw3LjU2NCwz'+
			'LjUsNy44OHY4LjExOGMwLDAuMDAxLDAsMC4wMDIsMCwwLjAwMnY4LjEyYzAsMC4zMTUsMC4xMjcsMC42MjMsMC4zNSwwLjg0NiAgICBjMC4yMjMsMC4yMjQsMC41MzEsMC4zNTEsMC44NDYsMC4zNTFIMTZjMCwwLDAuMDAxLDAsMC4wMDEsMGgxMS4zMDJjMC4zMTksMCwwLjYyLTAuMTI0LDAuODQ2LTAuMzUxICAgIGMwLjIyNy0wLjIyNiwwLjM1MS0wLjUyNiwwLjM1MS0wLjg0NlY3Ljg4QzI4LjUsNy41NjQsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzNHogTTE0LjgwNCwyMi45MjRINS44OTN2LTUuNzI4aDguOTExVjIyLjkyNHogICAgIE0yNi4xMDcsMjIuOTI0aC04LjkxMVYxNmMwLTAuMzE1LT'+
			'AuMTI4LTAuNjIzLTAuMzUtMC44NDZjLTAuMjIzLTAuMjIzLTAuNTMxLTAuMzUxLTAuODQ2LTAuMzUxSDUuODkzVjkuMDc3aDIwLjIxNVYyMi45MjR6ICAgICBNMTguNjgyLDE1LjEzNWMwLjE3OCwwLDAuMzU3LTAuMDUsMC41MTctMC4xNTZsMC4yMjEtMC4xNDhjMC40MjgtMC4yODYsMC41NDItMC44NjMsMC4yNTctMS4yOTEgICAgYy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5LTAuMjU3bC0wLjIyMiwwLjE0N2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTcsMS4yOTEgICAgQzE4LjA4NywxNC45OSwxOC4zODIsMTUuMTM1LDE4LjY4MiwxNS4xMzV6IE0yNC4yMDgsMTEuNDQyYzAu'+
			'MTc4LDAsMC4zNTctMC4wNTEsMC41MTYtMC4xNTdsMC4yMjItMC4xNDggICAgYzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU2LTEuMjkxYy0wLjI4NS0wLjQyNy0wLjg2Mi0wLjU0Mi0xLjI5LTAuMjU2bC0wLjIyMiwwLjE0N2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTYsMS4yOSAgICBDMjMuNjEzLDExLjI5NywyMy45MDcsMTEuNDQyLDI0LjIwOCwxMS40NDJ6IE0yMS40NDQsMTMuMjg5YzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDcgICAgYzAuNDI4LTAuMjg2LDAuNTQyLTAuODYzLDAuMjU3LTEuMjkxYy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi'+
			'0xLjI5MS0wLjI1N2wtMC4yMiwwLjE0N2MtMC40MjgsMC4yODYtMC41NDMsMC44NjMtMC4yNTcsMS4yOTEgICAgQzIwLjg1LDEzLjE0NCwyMS4xNDUsMTMuMjg5LDIxLjQ0NCwxMy4yODl6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._fullscreen__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 360px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._fullscreen.onmouseenter=function (e) {
			me._fullscreen__img.style.visibility='hidden';
			me._fullscreen__imgo.style.visibility='inherit';
			me._tt_fullscreen.style.transition='none';
			me._tt_fullscreen.style.visibility=(Number(me._tt_fullscreen.style.opacity)>0||!me._tt_fullscreen.style.opacity)?'inherit':'hidden';
			me._tt_fullscreen.ggVisible=true;
			me.elementMouseOver['fullscreen']=true;
		}
		me._fullscreen.onmouseleave=function (e) {
			me._fullscreen__img.style.visibility='inherit';
			me._fullscreen__imgo.style.visibility='hidden';
			me._tt_fullscreen.style.transition='none';
			me._tt_fullscreen.style.visibility='hidden';
			me._tt_fullscreen.ggVisible=false;
			me.elementMouseOver['fullscreen']=false;
		}
		me._fullscreen.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_fullscreen=document.createElement('div');
		els=me._tt_fullscreen__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(0,0,0,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -55px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_fullscreen.ggUpdateText=function() {
			var params = [];
			var hs = player._("Fullscreen", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_fullscreen.ggUpdateText();
		el.appendChild(els);
		me._tt_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_fullscreen.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_fullscreen_white=document.createElement('div');
		els=me._tt_fullscreen_white__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_fullscreen_white";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 18px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_fullscreen_white.ggUpdateText=function() {
			var params = [];
			var hs = player._("Fullscreen", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_fullscreen_white.ggUpdateText();
		el.appendChild(els);
		me._tt_fullscreen_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_fullscreen_white.ggUpdatePosition=function (useTransition) {
		}
		me._tt_fullscreen.appendChild(me._tt_fullscreen_white);
		me._fullscreen.appendChild(me._tt_fullscreen);
		me._controller0.appendChild(me._fullscreen);
		el=me._button_mute=document.createElement('div');
		el.ggId="button_mute";
		el.ggDx=181;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : -4px;';
		hs+='height : 45px;';
		hs+='left : calc(50% - ((45px + 0px) / 2) + 181px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._button_mute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_mute.ggUpdatePosition=function (useTransition) {
		}
		el=me._unmute=document.createElement('div');
		els=me._unmute__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNSAgICBDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ3LDIzLjE0N2MtMS44MzMsMS44My00LjM1MywyLjk1OS03LjE0NywyLjk2Yy0yLjc5NS0wLjAw'+
			'MS01LjMxNC0xLjEzLTcuMTQ2LTIuOTYgICAgQzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTZjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MSAgICBjMi43OTUsMC4wMDEsNS4zMTMsMS4xMyw3LjE0NywyLjk2MWMxLjgzMSwxLjgzMywyLjk1OSw0LjM1MiwyLjk2LDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDcsMjMuMTQ3eiAgICAgTTE2LjAzMiw4LjkxN2MtMC40NDMtMC4xODYtMC45NTgtMC4wODctMS4zMDEsMC4yNDhsLTMuMTAzLDMuMDM3bC0yLjIzOCwwYy0wLjMxNSwwLT'+
			'AuNjI0LDAuMTI3LTAuODQ2LDAuMzUgICAgcy0wLjM1MSwwLjUzMS0wLjM1MSwwLjg0NnY1LjI5NmMwLDAuMzE1LDAuMTI4LDAuNjI0LDAuMzUxLDAuODQ3czAuNTMxLDAuMzUsMC44NDYsMC4zNWgyLjIzOGwzLjEwMywzLjAzOCAgICBjMC4yMjgsMC4yMjMsMC41MzEsMC4zNDEsMC44MzgsMC4zNDFjMC4xNTYsMCwwLjMxMy0wLjAzLDAuNDYyLTAuMDkzYzAuNDQzLTAuMTg2LDAuNzMzLTAuNjIyLDAuNzMzLTEuMTAzVjEwLjAyICAgIEMxNi43NjUsOS41NCwxNi40NzUsOS4xMDMsMTYuMDMyLDguOTE3eiBNMTQuMzcyLDE5LjIyOWwtMS40MTctMS4zODljLTAuMjI2LTAuMjIxLTAuNTIyLTAuMzQx'+
			'LTAuODM3LTAuMzQxaC0xLjUzMXYtMi45MDVoMS41MzEgICAgYzAuMzE1LDAsMC42MTItMC4xMjEsMC44MzctMC4zNDFsMS40MTctMS4zODhWMTkuMjI5eiBNMTkuNTQzLDE4Ljk3OWMwLjc4NC0wLjc0NSwxLjI4LTEuODA3LDEuMjgtMi45NzggICAgYzAtMS4xNDYtMC40NzUtMi4xODktMS4yMy0yLjkzMmMtMC4zNjYtMC4zNi0wLjk1NS0wLjM1NS0xLjMxNSwwLjAxMWMtMC4zNiwwLjM2Ni0wLjM1NSwwLjk1NSwwLjAxMSwxLjMxNSAgICBjMC40MTgsMC40MTIsMC42NzQsMC45NzUsMC42NzQsMS42MDVjMCwwLjY0My0wLjI2OCwxLjIxNC0wLjcwMiwxLjYzYy0wLjM3MiwwLjM1NC0wLjM4NywwLj'+
			'k0My0wLjAzMiwxLjMxNSAgICBjMC4xODMsMC4xOTIsMC40MjksMC4yODksMC42NzUsMC4yODlDMTkuMTMzLDE5LjIzNSwxOS4zNjMsMTkuMTUsMTkuNTQzLDE4Ljk3OUwxOS41NDMsMTguOTc5eiBNMjAuNzY2LDkuMTMyICAgIGMtMC40MTQtMC4zMDYtMC45OTYtMC4yMTctMS4zMDEsMC4xOTdjLTAuMzA1LDAuNDE0LTAuMjE3LDAuOTk2LDAuMTk3LDEuMzAxYzEuNjQ5LDEuMjE3LDIuNzE3LDMuMTY0LDIuNzE3LDUuMzY5ICAgIGMwLDIuMjIzLTEuMDg0LDQuMTgzLTIuNzU2LDUuMzk3Yy0wLjQxNywwLjMwMy0wLjUwOSwwLjg4NC0wLjIwNiwxLjMwMWMwLjE4MiwwLjI1LDAuNDY2LDAuMzgzLDAu'+
			'NzU0LDAuMzgzICAgIGMwLjE4OSwwLDAuMzgxLTAuMDU4LDAuNTQ2LTAuMTc3aC0wLjAwMWMyLjEzMy0xLjU0NywzLjUyNC00LjA2NiwzLjUyNC02LjkwNEMyNC4yNCwxMy4xODMsMjIuODcxLDEwLjY4MSwyMC43NjYsOS4xMzJ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8cGF0aCBkPSJNMTYsMy41QzkuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2YzAsNi45MDQsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTYsMTIuNS0xMi41ICAgIEMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNi'+
			'wzLjV6IE0yMy4xNDcsMjMuMTQ3Yy0xLjgzMywxLjgzLTQuMzUzLDIuOTU5LTcuMTQ3LDIuOTZjLTIuNzk1LTAuMDAxLTUuMzE0LTEuMTMtNy4xNDYtMi45NiAgICBDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxICAgIGMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ3LDIuOTYxYzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDd6ICAgICBNMTYuMDMyLDguOTE3Yy0w'+
			'LjQ0My0wLjE4Ni0wLjk1OC0wLjA4Ny0xLjMwMSwwLjI0OGwtMy4xMDMsMy4wMzdsLTIuMjM4LDBjLTAuMzE1LDAtMC42MjQsMC4xMjctMC44NDYsMC4zNSAgICBzLTAuMzUxLDAuNTMxLTAuMzUxLDAuODQ2djUuMjk2YzAsMC4zMTUsMC4xMjgsMC42MjQsMC4zNTEsMC44NDdzMC41MzEsMC4zNSwwLjg0NiwwLjM1aDIuMjM4bDMuMTAzLDMuMDM4ICAgIGMwLjIyOCwwLjIyMywwLjUzMSwwLjM0MSwwLjgzOCwwLjM0MWMwLjE1NiwwLDAuMzEzLTAuMDMsMC40NjItMC4wOTNjMC40NDMtMC4xODYsMC43MzMtMC42MjIsMC43MzMtMS4xMDNWMTAuMDIgICAgQzE2Ljc2NSw5LjU0LDE2LjQ3NSw5LjEwMy'+
			'wxNi4wMzIsOC45MTd6IE0xNC4zNzIsMTkuMjI5bC0xLjQxNy0xLjM4OWMtMC4yMjYtMC4yMjEtMC41MjItMC4zNDEtMC44MzctMC4zNDFoLTEuNTMxdi0yLjkwNWgxLjUzMSAgICBjMC4zMTUsMCwwLjYxMi0wLjEyMSwwLjgzNy0wLjM0MWwxLjQxNy0xLjM4OFYxOS4yMjl6IE0xOS41NDMsMTguOTc5YzAuNzg0LTAuNzQ1LDEuMjgtMS44MDcsMS4yOC0yLjk3OCAgICBjMC0xLjE0Ni0wLjQ3NS0yLjE4OS0xLjIzLTIuOTMyYy0wLjM2Ni0wLjM2LTAuOTU1LTAuMzU1LTEuMzE1LDAuMDExYy0wLjM2LDAuMzY2LTAuMzU1LDAuOTU1LDAuMDExLDEuMzE1ICAgIGMwLjQxOCwwLjQxMiwwLjY3NCwwLjk3'+
			'NSwwLjY3NCwxLjYwNWMwLDAuNjQzLTAuMjY4LDEuMjE0LTAuNzAyLDEuNjNjLTAuMzcyLDAuMzU0LTAuMzg3LDAuOTQzLTAuMDMyLDEuMzE1ICAgIGMwLjE4MywwLjE5MiwwLjQyOSwwLjI4OSwwLjY3NSwwLjI4OUMxOS4xMzMsMTkuMjM1LDE5LjM2MywxOS4xNSwxOS41NDMsMTguOTc5TDE5LjU0MywxOC45Nzl6IE0yMC43NjYsOS4xMzIgICAgYy0wLjQxNC0wLjMwNi0wLjk5Ni0wLjIxNy0xLjMwMSwwLjE5N2MtMC4zMDUsMC40MTQtMC4yMTcsMC45OTYsMC4xOTcsMS4zMDFjMS42NDksMS4yMTcsMi43MTcsMy4xNjQsMi43MTcsNS4zNjkgICAgYzAsMi4yMjMtMS4wODQsNC4xODMtMi43NTYsNS'+
			'4zOTdjLTAuNDE3LDAuMzAzLTAuNTA5LDAuODg0LTAuMjA2LDEuMzAxYzAuMTgyLDAuMjUsMC40NjYsMC4zODMsMC43NTQsMC4zODMgICAgYzAuMTg5LDAsMC4zODEtMC4wNTgsMC41NDYtMC4xNzdoLTAuMDAxYzIuMTMzLTEuNTQ3LDMuNTI0LTQuMDY2LDMuNTI0LTYuOTA0QzI0LjI0LDEzLjE4MywyMi44NzEsMTAuNjgxLDIwLjc2Niw5LjEzMnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._unmute__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._unmute__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMTYsMy41QzkuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2YzAsNi45MDQsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTYsMTIuNS0xMi41ICAgIEMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6IE0y'+
			'My4xNDcsMjMuMTQ3Yy0xLjgzMywxLjgzLTQuMzUzLDIuOTU5LTcuMTQ3LDIuOTZjLTIuNzk1LTAuMDAxLTUuMzE0LTEuMTMtNy4xNDYtMi45NiAgICBDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxICAgIGMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ3LDIuOTYxYzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NywyMy4xNDd6ICAgICBNMTYuMDMyLDguOTE3Yy0wLjQ0My0wLj'+
			'E4Ni0wLjk1OC0wLjA4Ny0xLjMwMSwwLjI0OGwtMy4xMDMsMy4wMzdsLTIuMjM4LDBjLTAuMzE1LDAtMC42MjQsMC4xMjctMC44NDYsMC4zNSAgICBzLTAuMzUxLDAuNTMxLTAuMzUxLDAuODQ2djUuMjk2YzAsMC4zMTUsMC4xMjgsMC42MjQsMC4zNTEsMC44NDdzMC41MzEsMC4zNSwwLjg0NiwwLjM1aDIuMjM4bDMuMTAzLDMuMDM4ICAgIGMwLjIyOCwwLjIyMywwLjUzMSwwLjM0MSwwLjgzOCwwLjM0MWMwLjE1NiwwLDAuMzEzLTAuMDMsMC40NjItMC4wOTNjMC40NDMtMC4xODYsMC43MzMtMC42MjIsMC43MzMtMS4xMDNWMTAuMDIgICAgQzE2Ljc2NSw5LjU0LDE2LjQ3NSw5LjEwMywxNi4wMzIs'+
			'OC45MTd6IE0xNC4zNzIsMTkuMjI5bC0xLjQxNy0xLjM4OWMtMC4yMjYtMC4yMjEtMC41MjItMC4zNDEtMC44MzctMC4zNDFoLTEuNTMxdi0yLjkwNWgxLjUzMSAgICBjMC4zMTUsMCwwLjYxMi0wLjEyMSwwLjgzNy0wLjM0MWwxLjQxNy0xLjM4OFYxOS4yMjl6IE0xOS41NDMsMTguOTc5YzAuNzg0LTAuNzQ1LDEuMjgtMS44MDcsMS4yOC0yLjk3OCAgICBjMC0xLjE0Ni0wLjQ3NS0yLjE4OS0xLjIzLTIuOTMyYy0wLjM2Ni0wLjM2LTAuOTU1LTAuMzU1LTEuMzE1LDAuMDExYy0wLjM2LDAuMzY2LTAuMzU1LDAuOTU1LDAuMDExLDEuMzE1ICAgIGMwLjQxOCwwLjQxMiwwLjY3NCwwLjk3NSwwLjY3NC'+
			'wxLjYwNWMwLDAuNjQzLTAuMjY4LDEuMjE0LTAuNzAyLDEuNjNjLTAuMzcyLDAuMzU0LTAuMzg3LDAuOTQzLTAuMDMyLDEuMzE1ICAgIGMwLjE4MywwLjE5MiwwLjQyOSwwLjI4OSwwLjY3NSwwLjI4OUMxOS4xMzMsMTkuMjM1LDE5LjM2MywxOS4xNSwxOS41NDMsMTguOTc5TDE5LjU0MywxOC45Nzl6IE0yMC43NjYsOS4xMzIgICAgYy0wLjQxNC0wLjMwNi0wLjk5Ni0wLjIxNy0xLjMwMSwwLjE5N2MtMC4zMDUsMC40MTQtMC4yMTcsMC45OTYsMC4xOTcsMS4zMDFjMS42NDksMS4yMTcsMi43MTcsMy4xNjQsMi43MTcsNS4zNjkgICAgYzAsMi4yMjMtMS4wODQsNC4xODMtMi43NTYsNS4zOTdjLTAu'+
			'NDE3LDAuMzAzLTAuNTA5LDAuODg0LTAuMjA2LDEuMzAxYzAuMTgyLDAuMjUsMC40NjYsMC4zODMsMC43NTQsMC4zODMgICAgYzAuMTg5LDAsMC4zODEtMC4wNTgsMC41NDYtMC4xNzdoLTAuMDAxYzIuMTMzLTEuNTQ3LDMuNTI0LTQuMDY2LDMuNTI0LTYuOTA0QzI0LjI0LDEzLjE4MywyMi44NzEsMTAuNjgxLDIwLjc2Niw5LjEzMnoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSI+CiAgPHBhdGggZD0iTTE2LDMuNUM5LjA5Ni'+
			'wzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNSAgICBDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ3LDIzLjE0N2MtMS44MzMsMS44My00LjM1MywyLjk1OS03LjE0NywyLjk2Yy0yLjc5NS0wLjAwMS01LjMxNC0xLjEzLTcuMTQ2LTIuOTYgICAgQzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTZjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MSAgICBjMi43OTUsMC4wMDEsNS4z'+
			'MTMsMS4xMyw3LjE0NywyLjk2MWMxLjgzMSwxLjgzMywyLjk1OSw0LjM1MiwyLjk2LDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDcsMjMuMTQ3eiAgICAgTTE2LjAzMiw4LjkxN2MtMC40NDMtMC4xODYtMC45NTgtMC4wODctMS4zMDEsMC4yNDhsLTMuMTAzLDMuMDM3bC0yLjIzOCwwYy0wLjMxNSwwLTAuNjI0LDAuMTI3LTAuODQ2LDAuMzUgICAgcy0wLjM1MSwwLjUzMS0wLjM1MSwwLjg0NnY1LjI5NmMwLDAuMzE1LDAuMTI4LDAuNjI0LDAuMzUxLDAuODQ3czAuNTMxLDAuMzUsMC44NDYsMC4zNWgyLjIzOGwzLjEwMywzLjAzOCAgICBjMC4yMjgsMC4yMjMsMC41MzEsMC'+
			'4zNDEsMC44MzgsMC4zNDFjMC4xNTYsMCwwLjMxMy0wLjAzLDAuNDYyLTAuMDkzYzAuNDQzLTAuMTg2LDAuNzMzLTAuNjIyLDAuNzMzLTEuMTAzVjEwLjAyICAgIEMxNi43NjUsOS41NCwxNi40NzUsOS4xMDMsMTYuMDMyLDguOTE3eiBNMTQuMzcyLDE5LjIyOWwtMS40MTctMS4zODljLTAuMjI2LTAuMjIxLTAuNTIyLTAuMzQxLTAuODM3LTAuMzQxaC0xLjUzMXYtMi45MDVoMS41MzEgICAgYzAuMzE1LDAsMC42MTItMC4xMjEsMC44MzctMC4zNDFsMS40MTctMS4zODhWMTkuMjI5eiBNMTkuNTQzLDE4Ljk3OWMwLjc4NC0wLjc0NSwxLjI4LTEuODA3LDEuMjgtMi45NzggICAgYzAtMS4xNDYtMC40'+
			'NzUtMi4xODktMS4yMy0yLjkzMmMtMC4zNjYtMC4zNi0wLjk1NS0wLjM1NS0xLjMxNSwwLjAxMWMtMC4zNiwwLjM2Ni0wLjM1NSwwLjk1NSwwLjAxMSwxLjMxNSAgICBjMC40MTgsMC40MTIsMC42NzQsMC45NzUsMC42NzQsMS42MDVjMCwwLjY0My0wLjI2OCwxLjIxNC0wLjcwMiwxLjYzYy0wLjM3MiwwLjM1NC0wLjM4NywwLjk0My0wLjAzMiwxLjMxNSAgICBjMC4xODMsMC4xOTIsMC40MjksMC4yODksMC42NzUsMC4yODlDMTkuMTMzLDE5LjIzNSwxOS4zNjMsMTkuMTUsMTkuNTQzLDE4Ljk3OUwxOS41NDMsMTguOTc5eiBNMjAuNzY2LDkuMTMyICAgIGMtMC40MTQtMC4zMDYtMC45OTYtMC4yMT'+
			'ctMS4zMDEsMC4xOTdjLTAuMzA1LDAuNDE0LTAuMjE3LDAuOTk2LDAuMTk3LDEuMzAxYzEuNjQ5LDEuMjE3LDIuNzE3LDMuMTY0LDIuNzE3LDUuMzY5ICAgIGMwLDIuMjIzLTEuMDg0LDQuMTgzLTIuNzU2LDUuMzk3Yy0wLjQxNywwLjMwMy0wLjUwOSwwLjg4NC0wLjIwNiwxLjMwMWMwLjE4MiwwLjI1LDAuNDY2LDAuMzgzLDAuNzU0LDAuMzgzICAgIGMwLjE4OSwwLDAuMzgxLTAuMDU4LDAuNTQ2LTAuMTc3aC0wLjAwMWMyLjEzMy0xLjU0NywzLjUyNC00LjA2NiwzLjUyNC02LjkwNEMyNC4yNCwxMy4xODMsMjIuODcxLDEwLjY4MSwyMC43NjYsOS4xMzJ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._unmute__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="unmute";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._unmute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._unmute.onclick=function (e) {
			player.unmute("_all");
			me._unmute.style.transition='none';
			me._unmute.style.visibility='hidden';
			me._unmute.ggVisible=false;
			me._mute.style.transition='none';
			me._mute.style.visibility=(Number(me._mute.style.opacity)>0||!me._mute.style.opacity)?'inherit':'hidden';
			me._mute.ggVisible=true;
		}
		me._unmute.onmouseenter=function (e) {
			me._unmute__img.style.visibility='hidden';
			me._unmute__imgo.style.visibility='inherit';
			me.elementMouseOver['unmute']=true;
			me._tt_unmute.logicBlock_visible();
		}
		me._unmute.onmouseleave=function (e) {
			me._unmute__img.style.visibility='inherit';
			me._unmute__imgo.style.visibility='hidden';
			me.elementMouseOver['unmute']=false;
			me._tt_unmute.logicBlock_visible();
		}
		me._unmute.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_unmute=document.createElement('div');
		els=me._tt_unmute__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_unmute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'translate(-50%, 0px) ' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : calc(50% - ((0px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='transform : translate(-50%, 0px);;';
		hs+='visibility : hidden;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border : 0px solid #000000;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_unmute.ggUpdateText=function() {
			var params = [];
			var hs = player._("Unmute", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_unmute.ggUpdateText();
		el.appendChild(els);
		me._tt_unmute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_unmute.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_unmute.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_unmute.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_unmute.style.transition='left 0s, top 0s';
				if (me._tt_unmute.ggCurrentLogicStatePosition == 0) {
					me._tt_unmute.style.left = 'calc(50% - (0px / 2))';
					me._tt_unmute.style.top='-25px';
				}
				else {
					me._tt_unmute.style.left='calc(50% - ((0px + 0px) / 2) + 0px)';
					me._tt_unmute.style.top='32px';
				}
			}
		}
		me._tt_unmute.logicBlock_position();
		me._tt_unmute.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['unmute'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_unmute.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_unmute.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_unmute.style.transition='left 0s, top 0s';
				if (me._tt_unmute.ggCurrentLogicStateVisible == 0) {
					me._tt_unmute.style.visibility=(Number(me._tt_unmute.style.opacity)>0||!me._tt_unmute.style.opacity)?'inherit':'hidden';
					me._tt_unmute.ggVisible=true;
				}
				else {
					me._tt_unmute.style.visibility="hidden";
					me._tt_unmute.ggVisible=false;
				}
			}
		}
		me._tt_unmute.logicBlock_visible();
		me._tt_unmute.ggUpdatePosition=function (useTransition) {
		}
		me._unmute.appendChild(me._tt_unmute);
		me._button_mute.appendChild(me._unmute);
		el=me._mute=document.createElement('div');
		els=me._mute__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTE2LjAzMSw4LjkxN2MtMC40NDItMC4xODYtMC45NTgtMC4wODctMS4zLDAuMjQ4bC0zLjEwMywzLjAzN2wtMi4yMzgsMGMtMC4zMTUsMC0wLjYyNCwwLjEyNy0wLjg0NiwwLjM1ICAgIGMtMC4yMjMsMC4yMjMtMC4zNTEsMC41MzEtMC4zNTEsMC44NDZ2NS4yOTZjMCwwLjMxNSwwLjEyOCwwLjYyMywwLjM1MSwwLjg0N2MwLjIyMywwLjIyMiwwLjUz'+
			'MSwwLjM1MSwwLjg0NiwwLjM1MWgyLjIzOCAgICBsMy4xMDMsMy4wMzdjMC4yMjcsMC4yMjMsMC41MywwLjM0MSwwLjgzOCwwLjM0MWMwLjE1NiwwLDAuMzEzLTAuMDMsMC40NjItMC4wOTNjMC40NDMtMC4xODcsMC43MzMtMC42MjMsMC43MzMtMS4xMDNWMTAuMDIgICAgQzE2Ljc2NCw5LjUzOSwxNi40NzQsOS4xMDMsMTYuMDMxLDguOTE3eiBNMTQuMzcyLDE5LjIyOGwtMS40MTgtMS4zODhjLTAuMjI1LTAuMjIxLTAuNTIyLTAuMzQyLTAuODM3LTAuMzQyaC0xLjUzdi0yLjkwNGgxLjUzMSAgICBjMC4zMTUsMCwwLjYxMi0wLjEyMSwwLjgzNy0wLjM0MWwxLjQxOC0xLjM4OFYxOS4yMjh6IE0xNi'+
			'wzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41ICAgIGM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NywyMy4xNDZjLTEuODMzLDEuODMxLTQuMzUzLDIuOTYtNy4xNDcsMi45NiAgICBzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzEzLDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0NyAgICBjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2YzIuNzk1LDAsNS4zMTMsMS4x'+
			'Myw3LjE0NywyLjk2YzEuODMxLDEuODMzLDIuOTU5LDQuMzUyLDIuOTYsNy4xNDcgICAgQzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxMywyMy4xNDcsMjMuMTQ2eiBNMjIuMzI3LDE2LjAzMWwxLjQ4NS0xLjQ4NWMwLjM2My0wLjM2NCwwLjM2My0wLjk1MywwLTEuMzE2ICAgIGMtMC4zNjQtMC4zNjMtMC45NTMtMC4zNjMtMS4zMTUsMGwtMS40ODUsMS40ODVsLTEuNDg1LTEuNDg1Yy0wLjM2My0wLjM2My0wLjk1Mi0wLjM2My0xLjMxNiwwYy0wLjM2MiwwLjM2NC0wLjM2MiwwLjk1MywwLDEuMzE2ICAgIGwxLjQ4NSwxLjQ4NWwtMS40ODUsMS40ODVjLTAuMzYyLDAuMzYyLTAuMzYyLDAuOTUyLD'+
			'AsMS4zMTVjMC4xODMsMC4xODIsMC40MiwwLjI3MiwwLjY1OCwwLjI3MnMwLjQ3Ny0wLjA5MSwwLjY1OC0wLjI3MiAgICBsMS40ODUtMS40ODVsMS40ODUsMS40ODVjMC4xODEsMC4xODIsMC40MTksMC4yNzIsMC42NTcsMC4yNzJzMC40NzctMC4wOTEsMC42NTgtMC4yNzJjMC4zNjMtMC4zNjMsMC4zNjMtMC45NTMsMC0xLjMxNSAgICBMMjIuMzI3LDE2LjAzMXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0xNi4wMzEsOC45MTdjLTAuNDQyLTAuMTg2LTAuOTU4LTAuMDg3LTEuMywwLjI0OGwtMy4xMDMs'+
			'My4wMzdsLTIuMjM4LDBjLTAuMzE1LDAtMC42MjQsMC4xMjctMC44NDYsMC4zNSAgICBjLTAuMjIzLDAuMjIzLTAuMzUxLDAuNTMxLTAuMzUxLDAuODQ2djUuMjk2YzAsMC4zMTUsMC4xMjgsMC42MjMsMC4zNTEsMC44NDdjMC4yMjMsMC4yMjIsMC41MzEsMC4zNTEsMC44NDYsMC4zNTFoMi4yMzggICAgbDMuMTAzLDMuMDM3YzAuMjI3LDAuMjIzLDAuNTMsMC4zNDEsMC44MzgsMC4zNDFjMC4xNTYsMCwwLjMxMy0wLjAzLDAuNDYyLTAuMDkzYzAuNDQzLTAuMTg3LDAuNzMzLTAuNjIzLDAuNzMzLTEuMTAzVjEwLjAyICAgIEMxNi43NjQsOS41MzksMTYuNDc0LDkuMTAzLDE2LjAzMSw4LjkxN3ogTT'+
			'E0LjM3MiwxOS4yMjhsLTEuNDE4LTEuMzg4Yy0wLjIyNS0wLjIyMS0wLjUyMi0wLjM0Mi0wLjgzNy0wLjM0MmgtMS41M3YtMi45MDRoMS41MzEgICAgYzAuMzE1LDAsMC42MTItMC4xMjEsMC44MzctMC4zNDFsMS40MTgtMS4zODhWMTkuMjI4eiBNMTYsMy41QzkuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2YzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNSAgICBjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNUMyOC40OTksOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6IE0yMy4xNDcsMjMuMTQ2Yy0xLjgzMywxLjgzMS00LjM1MywyLjk2LTcuMTQ3LDIuOTYgICAgcy01LjMxNC0x'+
			'LjEyOS03LjE0Ni0yLjk2QzcuMDIyLDIxLjMxMyw1Ljg5NCwxOC43OTUsNS44OTMsMTZjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDcgICAgYzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NmMyLjc5NSwwLDUuMzEzLDEuMTMsNy4xNDcsMi45NmMxLjgzMSwxLjgzMywyLjk1OSw0LjM1MiwyLjk2LDcuMTQ3ICAgIEMyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTMsMjMuMTQ3LDIzLjE0NnogTTIyLjMyNywxNi4wMzFsMS40ODUtMS40ODVjMC4zNjMtMC4zNjQsMC4zNjMtMC45NTMsMC0xLjMxNiAgICBjLTAuMzY0LTAuMzYzLTAuOTUzLTAuMzYzLTEuMzE1LDBsLTEuND'+
			'g1LDEuNDg1bC0xLjQ4NS0xLjQ4NWMtMC4zNjMtMC4zNjMtMC45NTItMC4zNjMtMS4zMTYsMGMtMC4zNjIsMC4zNjQtMC4zNjIsMC45NTMsMCwxLjMxNiAgICBsMS40ODUsMS40ODVsLTEuNDg1LDEuNDg1Yy0wLjM2MiwwLjM2Mi0wLjM2MiwwLjk1MiwwLDEuMzE1YzAuMTgzLDAuMTgyLDAuNDIsMC4yNzIsMC42NTgsMC4yNzJzMC40NzctMC4wOTEsMC42NTgtMC4yNzIgICAgbDEuNDg1LTEuNDg1bDEuNDg1LDEuNDg1YzAuMTgxLDAuMTgyLDAuNDE5LDAuMjcyLDAuNjU3LDAuMjcyczAuNDc3LTAuMDkxLDAuNjU4LTAuMjcyYzAuMzYzLTAuMzYzLDAuMzYzLTAuOTUzLDAtMS4zMTUgICAgTDIyLjMy'+
			'NywxNi4wMzF6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._mute__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._mute__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMTYuMDMxLDguOTE3Yy0wLjQ0Mi0wLjE4Ni0wLjk1OC0wLjA4Ny0xLjMsMC4yNDhsLTMuMTAzLDMuMDM3bC0yLjIzOCwwYy0wLjMxNSwwLTAuNjI0LDAuMTI3LTAuODQ2LDAuMzUgICAgYy0wLjIyMywwLjIyMy0wLjM1MSwwLjUzMS0wLjM1MSww'+
			'Ljg0NnY1LjI5NmMwLDAuMzE1LDAuMTI4LDAuNjIzLDAuMzUxLDAuODQ3YzAuMjIzLDAuMjIyLDAuNTMxLDAuMzUxLDAuODQ2LDAuMzUxaDIuMjM4ICAgIGwzLjEwMywzLjAzN2MwLjIyNywwLjIyMywwLjUzLDAuMzQxLDAuODM4LDAuMzQxYzAuMTU2LDAsMC4zMTMtMC4wMywwLjQ2Mi0wLjA5M2MwLjQ0My0wLjE4NywwLjczMy0wLjYyMywwLjczMy0xLjEwM1YxMC4wMiAgICBDMTYuNzY0LDkuNTM5LDE2LjQ3NCw5LjEwMywxNi4wMzEsOC45MTd6IE0xNC4zNzIsMTkuMjI4bC0xLjQxOC0xLjM4OGMtMC4yMjUtMC4yMjEtMC41MjItMC4zNDItMC44MzctMC4zNDJoLTEuNTN2LTIuOTA0aDEuNTMxIC'+
			'AgIGMwLjMxNSwwLDAuNjEyLTAuMTIxLDAuODM3LTAuMzQxbDEuNDE4LTEuMzg4VjE5LjIyOHogTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjUgICAgYzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ3LDIzLjE0NmMtMS44MzMsMS44MzEtNC4zNTMsMi45Ni03LjE0NywyLjk2ICAgIHMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTMsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcu'+
			'MTQ3ICAgIGMxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTZjMi43OTUsMCw1LjMxMywxLjEzLDcuMTQ3LDIuOTZjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3LjE0NyAgICBDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzEzLDIzLjE0NywyMy4xNDZ6IE0yMi4zMjcsMTYuMDMxbDEuNDg1LTEuNDg1YzAuMzYzLTAuMzY0LDAuMzYzLTAuOTUzLDAtMS4zMTYgICAgYy0wLjM2NC0wLjM2My0wLjk1My0wLjM2My0xLjMxNSwwbC0xLjQ4NSwxLjQ4NWwtMS40ODUtMS40ODVjLTAuMzYzLTAuMzYzLTAuOTUyLTAuMzYzLTEuMzE2LDBjLTAuMzYyLDAuMzY0LTAuMzYyLDAuOTUzLDAsMS'+
			'4zMTYgICAgbDEuNDg1LDEuNDg1bC0xLjQ4NSwxLjQ4NWMtMC4zNjIsMC4zNjItMC4zNjIsMC45NTIsMCwxLjMxNWMwLjE4MywwLjE4MiwwLjQyLDAuMjcyLDAuNjU4LDAuMjcyczAuNDc3LTAuMDkxLDAuNjU4LTAuMjcyICAgIGwxLjQ4NS0xLjQ4NWwxLjQ4NSwxLjQ4NWMwLjE4MSwwLjE4MiwwLjQxOSwwLjI3MiwwLjY1NywwLjI3MnMwLjQ3Ny0wLjA5MSwwLjY1OC0wLjI3MmMwLjM2My0wLjM2MywwLjM2My0wLjk1MywwLTEuMzE1ICAgIEwyMi4zMjcsMTYuMDMxeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgdHJhbnNmb3Jt'+
			'PSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMTYuMDMxLDguOTE3Yy0wLjQ0Mi0wLjE4Ni0wLjk1OC0wLjA4Ny0xLjMsMC4yNDhsLTMuMTAzLDMuMDM3bC0yLjIzOCwwYy0wLjMxNSwwLTAuNjI0LDAuMTI3LTAuODQ2LDAuMzUgICAgYy0wLjIyMywwLjIyMy0wLjM1MSwwLjUzMS0wLjM1MSwwLjg0NnY1LjI5NmMwLDAuMzE1LDAuMTI4LDAuNjIzLDAuMzUxLDAuODQ3YzAuMjIzLDAuMjIyLDAuNTMxLDAuMzUxLDAuODQ2LDAuMzUxaDIuMjM4ICAgIGwzLjEwMywzLjAzN2MwLjIyNywwLjIyMywwLjUzLDAuMzQxLDAuODM4LDAuMzQxYz'+
			'AuMTU2LDAsMC4zMTMtMC4wMywwLjQ2Mi0wLjA5M2MwLjQ0My0wLjE4NywwLjczMy0wLjYyMywwLjczMy0xLjEwM1YxMC4wMiAgICBDMTYuNzY0LDkuNTM5LDE2LjQ3NCw5LjEwMywxNi4wMzEsOC45MTd6IE0xNC4zNzIsMTkuMjI4bC0xLjQxOC0xLjM4OGMtMC4yMjUtMC4yMjEtMC41MjItMC4zNDItMC44MzctMC4zNDJoLTEuNTN2LTIuOTA0aDEuNTMxICAgIGMwLjMxNSwwLDAuNjEyLTAuMTIxLDAuODM3LTAuMzQxbDEuNDE4LTEuMzg4VjE5LjIyOHogTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjUgICAgYzYuOTAzLTAuMDAx'+
			'LDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ3LDIzLjE0NmMtMS44MzMsMS44MzEtNC4zNTMsMi45Ni03LjE0NywyLjk2ICAgIHMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTMsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3ICAgIGMxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTZjMi43OTUsMCw1LjMxMywxLjEzLDcuMTQ3LDIuOTZjMS44MzEsMS44MzMsMi45NTksNC4zNTIsMi45Niw3LjE0NyAgICBDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMz'+
			'EzLDIzLjE0NywyMy4xNDZ6IE0yMi4zMjcsMTYuMDMxbDEuNDg1LTEuNDg1YzAuMzYzLTAuMzY0LDAuMzYzLTAuOTUzLDAtMS4zMTYgICAgYy0wLjM2NC0wLjM2My0wLjk1My0wLjM2My0xLjMxNSwwbC0xLjQ4NSwxLjQ4NWwtMS40ODUtMS40ODVjLTAuMzYzLTAuMzYzLTAuOTUyLTAuMzYzLTEuMzE2LDBjLTAuMzYyLDAuMzY0LTAuMzYyLDAuOTUzLDAsMS4zMTYgICAgbDEuNDg1LDEuNDg1bC0xLjQ4NSwxLjQ4NWMtMC4zNjIsMC4zNjItMC4zNjIsMC45NTIsMCwxLjMxNWMwLjE4MywwLjE4MiwwLjQyLDAuMjcyLDAuNjU4LDAuMjcyczAuNDc3LTAuMDkxLDAuNjU4LTAuMjcyICAgIGwxLjQ4NS0x'+
			'LjQ4NWwxLjQ4NSwxLjQ4NWMwLjE4MSwwLjE4MiwwLjQxOSwwLjI3MiwwLjY1NywwLjI3MnMwLjQ3Ny0wLjA5MSwwLjY1OC0wLjI3MmMwLjM2My0wLjM2MywwLjM2My0wLjk1MywwLTEuMzE1ICAgIEwyMi4zMjcsMTYuMDMxeiIvPgogPC9nPgo8L3N2Zz4K';
		me._mute__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="mute";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -3px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._mute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mute.onclick=function (e) {
			player.mute("_all");
			me._mute.style.transition='none';
			me._mute.style.visibility='hidden';
			me._mute.ggVisible=false;
			me._unmute.style.transition='none';
			me._unmute.style.visibility=(Number(me._unmute.style.opacity)>0||!me._unmute.style.opacity)?'inherit':'hidden';
			me._unmute.ggVisible=true;
		}
		me._mute.onmouseenter=function (e) {
			me._mute__img.style.visibility='hidden';
			me._mute__imgo.style.visibility='inherit';
			me.elementMouseOver['mute']=true;
			me._tt_mute.logicBlock_visible();
		}
		me._mute.onmouseleave=function (e) {
			me._mute__img.style.visibility='inherit';
			me._mute__imgo.style.visibility='hidden';
			me.elementMouseOver['mute']=false;
			me._tt_mute.logicBlock_visible();
		}
		me._mute.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_mute=document.createElement('div');
		els=me._tt_mute__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_mute";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'translate(-50%, 0px) ' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : calc(50% - ((0px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='transform : translate(-50%, 0px);;';
		hs+='visibility : hidden;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border : 0px solid #000000;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_mute.ggUpdateText=function() {
			var params = [];
			var hs = player._("Mute", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_mute.ggUpdateText();
		el.appendChild(els);
		me._tt_mute.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_mute.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_mute.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_mute.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_mute.style.transition='left 0s, top 0s';
				if (me._tt_mute.ggCurrentLogicStatePosition == 0) {
					me._tt_mute.style.left = 'calc(50% - (0px / 2))';
					me._tt_mute.style.top='-25px';
				}
				else {
					me._tt_mute.style.left='calc(50% - ((0px + 0px) / 2) + 0px)';
					me._tt_mute.style.top='32px';
				}
			}
		}
		me._tt_mute.logicBlock_position();
		me._tt_mute.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['mute'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_mute.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_mute.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_mute.style.transition='left 0s, top 0s';
				if (me._tt_mute.ggCurrentLogicStateVisible == 0) {
					me._tt_mute.style.visibility=(Number(me._tt_mute.style.opacity)>0||!me._tt_mute.style.opacity)?'inherit':'hidden';
					me._tt_mute.ggVisible=true;
				}
				else {
					me._tt_mute.style.visibility="hidden";
					me._tt_mute.ggVisible=false;
				}
			}
		}
		me._tt_mute.logicBlock_visible();
		me._tt_mute.ggUpdatePosition=function (useTransition) {
		}
		me._mute.appendChild(me._tt_mute);
		me._button_mute.appendChild(me._mute);
		me._controller0.appendChild(me._button_mute);
		me.divSkin.appendChild(me._controller0);
		el=me._controller=document.createElement('div');
		el.ggId="controller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._controller.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controller.onmouseenter=function (e) {
			me.elementMouseOver['controller']=true;
		}
		me._controller.onmouseleave=function (e) {
			me.elementMouseOver['controller']=false;
		}
		me._controller.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['controller']) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
		}
		me._controller.ggUpdatePosition=function (useTransition) {
		}
		el=me._show_controller_button=document.createElement('div');
		els=me._show_controller_button__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzU2NiAtMjYwNiAzMiAzMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zOmdyYXBoPSJodHRwOi8vbnMuYWRvYmUuY29tL0dyYXBocy8xLjAvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMj'+
			'AwMC9zdmciIHg9IjBweCIgdmlld0JveD0iLTM1NjYgLTI2MDYgMzIgMzIiIHhtbG5zOmE9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVTVkdWaWV3ZXJFeHRlbnNpb25zLzMuMC8iIGhlaWdodD0iMzJweCIgdmVyc2lvbj0iMS4xIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczp4PSJodHRwOi8vbnMuYWRvYmUuY29tL0V4dGVuc2liaWxpdHkvMS4wLyIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIj4KIDxnIGlkPSJMYXllcl8xIi8+CiA8ZyBpZD0iRWJlbmVfMSIvPgogPGcgaWQ9IkxheWVy'+
			'XzIiPgogIDxnPgogICA8Zz4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiByPSIyLjc2IiBjeD0iLTM1NTkuMzMzIiBvcGFjaXR5PSIwLjQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMS41IiBjeT0iLTI1OTAuMzc2IiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im11bHRpcGx5Ii8+CiAgICA8Y2lyY2xlIHI9IjIuNzYiIGN4PSItMzU1OS4zMzMiIGZpbGw9IiNGRkZGRkYiIGN5PSItMjU5MC4zNzYiLz4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiByPSIyLjc2IiBjeD0iLTM1NTkuMzMzIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjAuMiIgY3k9Ii0yNTkwLjM3NiIvPgogIC'+
			'A8L2c+CiAgIDxnPgogICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIHI9IjIuNzYiIGN4PSItMzU0MC42NjciIG9wYWNpdHk9IjAuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGN5PSItMjU5MC4zNzYiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiLz4KICAgIDxjaXJjbGUgcj0iMi43NiIgY3g9Ii0zNTQwLjY2NyIgZmlsbD0iI0ZGRkZGRiIgY3k9Ii0yNTkwLjM3NiIvPgogICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIHI9IjIuNzYiIGN4PSItMzU0MC42NjciIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC4yIiBjeT0iLTI1OTAuMzc2Ii8+CiAgIDwvZz4K'+
			'ICA8L2c+CiAgPGc+CiAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiByPSIyLjc2IiBjeD0iLTM1NTAiIG9wYWNpdHk9IjAuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGN5PSItMjU5MC4zNzYiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiLz4KICAgPGNpcmNsZSByPSIyLjc2IiBjeD0iLTM1NTAiIGZpbGw9IiNGRkZGRkYiIGN5PSItMjU5MC4zNzYiLz4KICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIHI9IjIuNzYiIGN4PSItMzU1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGN5PSItMjU5MC4zNzYiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._show_controller_button__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._show_controller_button__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzU2NiAtMjU3MS4zMzMgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3'+
			'JnLzIwMDAvc3ZnIiB4PSIwcHgiIHZpZXdCb3g9Ii0zNTY2IC0yNTcxLjMzMyAzMiAzMiIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIgaGVpZ2h0PSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHk9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOng9Imh0dHA6Ly9ucy5hZG9iZS5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIiB4bWxuczppPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlSWxsdXN0cmF0b3IvMTAuMC8iPgogPGcgaWQ9IkxheWVyXzEiLz4KIDxnIGlkPSJFYmVuZV8xIi8+CiA8ZyBp'+
			'ZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxnPgogICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIHI9IjMuMDM2IiBjeD0iLTM1NjAuMjY2IiBvcGFjaXR5PSIwLjQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMS41IiBjeT0iLTI1NTUuNzA5IiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im11bHRpcGx5Ii8+CiAgICA8Y2lyY2xlIHI9IjMuMDM2IiBjeD0iLTM1NjAuMjY2IiBmaWxsPSIjRkZGRkZGIiBjeT0iLTI1NTUuNzA5Ii8+CiAgICA8Y2lyY2xlIHN0cm9rZT0iIzAwMDAwMCIgcj0iMy4wMzYiIGN4PSItMzU2MC4yNjYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC4yIiBjeT0iLTI1NT'+
			'UuNzA5Ii8+CiAgIDwvZz4KICAgPGc+CiAgICA8Y2lyY2xlIHN0cm9rZT0iIzAwMDAwMCIgcj0iMy4wMzYiIGN4PSItMzUzOS43MzMiIG9wYWNpdHk9IjAuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGN5PSItMjU1NS43MDkiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiLz4KICAgIDxjaXJjbGUgcj0iMy4wMzYiIGN4PSItMzUzOS43MzMiIGZpbGw9IiNGRkZGRkYiIGN5PSItMjU1NS43MDkiLz4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiByPSIzLjAzNiIgY3g9Ii0zNTM5LjczMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGN5PSItMjU1NS43'+
			'MDkiLz4KICAgPC9nPgogIDwvZz4KICA8Zz4KICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIHI9IjMuMDM2IiBjeD0iLTM1NTAiIG9wYWNpdHk9IjAuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGN5PSItMjU1NS43MDkiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiLz4KICAgPGNpcmNsZSByPSIzLjAzNiIgY3g9Ii0zNTUwIiBmaWxsPSIjRkZGRkZGIiBjeT0iLTI1NTUuNzA5Ii8+CiAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiByPSIzLjAzNiIgY3g9Ii0zNTUwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjAuMiIgY3k9Ii0yNTU1LjcwOSIvPgogIDwvZz'+
			'4KIDwvZz4KPC9zdmc+Cg==';
		me._show_controller_button__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="show_controller_button";
		el.ggDx=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 27px;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : calc(50% - ((45px + 0px) / 2) - 1px);';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._show_controller_button.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._show_controller_button.onclick=function (e) {
			me._hide_timer.ggTimeout=Number("5") * 1000.0;
			me._hide_timer.ggTimestamp=skin.ggCurrentTime;
		}
		me._show_controller_button.onmouseenter=function (e) {
			me._show_controller_button__img.style.visibility='hidden';
			me._show_controller_button__imgo.style.visibility='inherit';
			me.elementMouseOver['show_controller_button']=true;
			me._tt_show_controller.logicBlock_visible();
		}
		me._show_controller_button.onmouseleave=function (e) {
			me._show_controller_button__img.style.visibility='inherit';
			me._show_controller_button__imgo.style.visibility='hidden';
			me.elementMouseOver['show_controller_button']=false;
			me._tt_show_controller.logicBlock_visible();
		}
		me._show_controller_button.ggUpdatePosition=function (useTransition) {
		}
		el=me._hide_timer=document.createElement('div');
		el.ggTimestamp=skin.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=5000;
		el.ggId="hide_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._hide_timer.ggIsActive=function() {
			return (me._hide_timer.ggTimestamp + me._hide_timer.ggTimeout) >= skin.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hide_timer.ggActivate=function () {
			if (player.transitionsDisabled) {
				me._controller0.style.transition='none';
			} else {
				me._controller0.style.transition='all 500ms ease-out 0ms';
			}
			me._controller0.style.opacity='1';
			me._controller0.style.visibility=me._controller0.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._show_controller_button.style.transition='none';
			} else {
				me._show_controller_button.style.transition='all 500ms ease-out 0ms';
			}
			me._show_controller_button.style.opacity='0';
			me._show_controller_button.style.visibility='hidden';
		}
		me._hide_timer.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._show_controller_button.style.transition='none';
			} else {
				me._show_controller_button.style.transition='all 500ms ease-out 0ms';
			}
			me._show_controller_button.style.opacity='1';
			me._show_controller_button.style.visibility=me._show_controller_button.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._controller0.style.transition='none';
			} else {
				me._controller0.style.transition='all 500ms ease-out 0ms';
			}
			me._controller0.style.opacity='0';
			me._controller0.style.visibility='hidden';
		}
		me._hide_timer.ggUpdatePosition=function (useTransition) {
		}
		me._show_controller_button.appendChild(me._hide_timer);
		el=me._tt_show_controller=document.createElement('div');
		els=me._tt_show_controller__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_show_controller";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 20px;';
		hs+='left : calc(50% - ((120px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_show_controller.ggUpdateText=function() {
			var params = [];
			var hs = player._("Show Controller", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_show_controller.ggUpdateText();
		el.appendChild(els);
		me._tt_show_controller.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_show_controller.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_show_controller.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_show_controller.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_show_controller.style.transition='left 0s, top 0s';
				if (me._tt_show_controller.ggCurrentLogicStatePosition == 0) {
					me._tt_show_controller.style.left = 'calc(50% - (120px / 2))';
					me._tt_show_controller.style.top='-25px';
				}
				else {
					me._tt_show_controller.style.left='calc(50% - ((120px + 0px) / 2) + 0px)';
					me._tt_show_controller.style.top='32px';
				}
			}
		}
		me._tt_show_controller.logicBlock_position();
		me._tt_show_controller.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['show_controller_button'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_show_controller.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_show_controller.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_show_controller.style.transition='left 0s, top 0s';
				if (me._tt_show_controller.ggCurrentLogicStateVisible == 0) {
					me._tt_show_controller.style.visibility=(Number(me._tt_show_controller.style.opacity)>0||!me._tt_show_controller.style.opacity)?'inherit':'hidden';
					me._tt_show_controller.ggVisible=true;
				}
				else {
					me._tt_show_controller.style.visibility="hidden";
					me._tt_show_controller.ggVisible=false;
				}
			}
		}
		me._tt_show_controller.logicBlock_visible();
		me._tt_show_controller.ggUpdatePosition=function (useTransition) {
		}
		me._show_controller_button.appendChild(me._tt_show_controller);
		me._controller.appendChild(me._show_controller_button);
		me.divSkin.appendChild(me._controller);
		el=me._url_hs_popup=document.createElement('div');
		el.ggId="url_hs_popup";
		el.ggDx=-6;
		el.ggDy=-3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #141414;';
		hs+='border : 0px solid #000000;';
		hs+='border-radius : 18px;';
		hs+='cursor : default;';
		hs+='height : 92.66%;';
		hs+='left : calc(50% - ((92.6563% + 0px) / 2) - 6px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((92.66% + 0px) / 2) - 3px);';
		hs+='visibility : hidden;';
		hs+='width : 92.6563%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._url_hs_popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._url_hs_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_url_hs_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._url_hs_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._url_hs_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._url_hs_popup.style.transition='';
				if (me._url_hs_popup.ggCurrentLogicStateVisible == 0) {
					me._url_hs_popup.style.visibility=(Number(me._url_hs_popup.style.opacity)>0||!me._url_hs_popup.style.opacity)?'inherit':'hidden';
					me._url_hs_popup.ggVisible=true;
				}
				else {
					me._url_hs_popup.style.visibility="hidden";
					me._url_hs_popup.ggVisible=false;
				}
			}
		}
		me._url_hs_popup.logicBlock_visible();
		me._url_hs_popup.ggUpdatePosition=function (useTransition) {
		}
		el=me._url_hs_popup_close=document.createElement('div');
		els=me._url_hs_popup_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBkYXRhLW5hbWU9InF1YWRyYXRvIGNlbnRyYXRvcmUiIGlkPSJxdWFkcmF0b19jZW50cmF0b3JlIj4KICA8cmVjdCB3aWR0aD0iNjQiIHN0eWxlPSJmaWxsOm5vbmUiIGhlaWdodD0iNjQiLz4KIDwvZz4KIDxnIGlkPSJpY29uYSI+CiAgPGxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2U2ZTZlNjtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6NHB4IiB4MT0iMjAuNjkiIHkyPSI0My4zMSIgeTE9IjIwLjY5IiB4Mj0iNDMuMzEiLz4KICA8bGluZSBzdHlsZT0iZm'+
			'lsbDpub25lO3N0cm9rZTojZTZlNmU2O3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0cHgiIHgxPSI0My4zMSIgeTI9IjQzLjMxIiB5MT0iMjAuNjkiIHgyPSIyMC42OSIvPgogPC9nPgo8L3N2Zz4K';
		me._url_hs_popup_close__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._url_hs_popup_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBpZD0iaGlnaGxpZ2h0Ij4KICA8Y2lyY2xlIHI9IjI3IiBjeD0iMzIiIGN5PSIzMiIgc3R5bGU9ImZpbGw6IzRkNGQ0ZCIvPgogPC9nPgogPGcgZGF0YS1uYW1lPSJxdWFkcmF0byBjZW50cmF0b3JlIiBpZD0icXVhZHJhdG9fY2VudHJhdG9yZSI+CiAgPHJlY3Qgd2lkdGg9IjY0IiBzdHlsZT0iZmlsbDpub25lIiBoZWlnaHQ9IjY0Ii8+CiA8L2c+CiA8ZyBpZD0iaWNvbmEiPgogIDxsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMxNDE0MTQ7c3Ryb2tlLW1pdGVybGltaXQ6MT'+
			'A7c3Ryb2tlLXdpZHRoOjRweDsgc3Ryb2tlLW9wYWNpdHk6MSIgeTI9IjQzLjMxIiB4MT0iMjAuNjkiIHkxPSIyMC42OSIgeDI9IjQzLjMxIi8+CiAgPGxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzE0MTQxNDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6NHB4OyBzdHJva2Utb3BhY2l0eToxIiB5Mj0iNDMuMzEiIHgxPSI0My4zMSIgeTE9IjIwLjY5IiB4Mj0iMjAuNjkiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._url_hs_popup_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="url_hs_popup_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._url_hs_popup_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._url_hs_popup_close.onclick=function (e) {
			player.setVariableValue('vis_url_hs_popup', false);
		}
		me._url_hs_popup_close.onmouseenter=function (e) {
			me._url_hs_popup_close__img.style.visibility='hidden';
			me._url_hs_popup_close__imgo.style.visibility='inherit';
			me.elementMouseOver['url_hs_popup_close']=true;
		}
		me._url_hs_popup_close.onmouseleave=function (e) {
			me._url_hs_popup_close__img.style.visibility='inherit';
			me._url_hs_popup_close__imgo.style.visibility='hidden';
			me.elementMouseOver['url_hs_popup_close']=false;
		}
		me._url_hs_popup_close.ggUpdatePosition=function (useTransition) {
		}
		me._url_hs_popup.appendChild(me._url_hs_popup_close);
		el=me._url_hs_popup_title=document.createElement('div');
		els=me._url_hs_popup_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="url_hs_popup_title";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(230,230,230,1);';
		hs+='cursor : default;';
		hs+='height : 28px;';
		hs+='left : calc(50% - ((calc(100% - 50px) + 0px) / 2) + 2px);';
		hs+='position : absolute;';
		hs+='top : 18px;';
		hs+='visibility : inherit;';
		hs+='width : calc(100% - 50px);';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='font-size: 22px;';
		hs+='font-weight: 500;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: nowrap;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		hs+='text-overflow: ellipsis;';
		els.setAttribute('style',hs);
		me._url_hs_popup_title.ggUpdateText=function() {
			var params = [];
			var hs = player._("", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._url_hs_popup_title.ggUpdateText();
		el.appendChild(els);
		me._url_hs_popup_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._url_hs_popup_title.ggUpdatePosition=function (useTransition) {
		}
		me._url_hs_popup.appendChild(me._url_hs_popup_title);
		el=me._url_hs_popup_iframe=document.createElement('div');
		els=me._url_hs_popup_iframe__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="url_hs_popup_iframe";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 25px;';
		hs+='color : #000000;';
		hs+='cursor : default;';
		hs+='height : calc(100% - 100px);';
		hs+='left : calc(50% - ((calc(100% - 50px) + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : calc(100% - 50px);';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._url_hs_popup_iframe.ggUpdateText=function() {
			var params = [];
			var hs = player._("", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._url_hs_popup_iframe.ggUpdateText();
		el.appendChild(els);
		me._url_hs_popup_iframe.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._url_hs_popup_iframe.ggUpdatePosition=function (useTransition) {
		}
		me._url_hs_popup.appendChild(me._url_hs_popup_iframe);
		me.divSkin.appendChild(me._url_hs_popup);
		el=me._music_banner=document.createElement('div');
		els=me._music_banner__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTI4LjQ5OSwxNS4zNDRsLTcuNjQsMS45ODNWOS4yNDJsNy42NC0xLjkwNVYxNS4zNDR6IE0xOS44MzYsOS4yMjl2Ny45MzNsLTcuNjczLTMuODMzVjUuNDE2ICAgQzEyLjE2Myw1LjQxNiwxOS43NzgsOS4yMDksMTkuODM2LDkuMjI5eiBNMTEuMTQxLDUuMTU1djguMDkyTDMuNSwxNS4xNjZWNy4wNkwxMS4xNDEsNS4xNTV6IE0zLjUsMTYuMjJsNy42'+
			'NDEtMS45MTl2OC4zMiAgIGMwLDAuMDQ1LDAuMDA4LDAuMDksMC4wMTksMC4xMzJMMy41LDI0LjY2MlYxNi4yMnogTTEyLjMzNSwyMi44MzhjLTAuMDYzLTAuMDMyLTAuMTI3LTAuMDU4LTAuMTk0LTAuMDggICBjMC4wMTItMC4wNDQsMC4wMjEtMC4wOSwwLjAyMS0wLjEzN3YtOC4xNDlsNy42NzMsMy44MzJ2OC4yODFMMTIuMzM1LDIyLjgzOHogTTIwLjg1OSwyNi44NDZ2LTguNDYybDcuNjQtMS45ODJMMjguNSwyNC45NCAgIEwyMC44NTksMjYuODQ2eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTI4Lj'+
			'Q5OSwxNS4zNDRsLTcuNjQsMS45ODNWOS4yNDJsNy42NC0xLjkwNVYxNS4zNDR6IE0xOS44MzYsOS4yMjl2Ny45MzNsLTcuNjczLTMuODMzVjUuNDE2ICAgQzEyLjE2Myw1LjQxNiwxOS43NzgsOS4yMDksMTkuODM2LDkuMjI5eiBNMTEuMTQxLDUuMTU1djguMDkyTDMuNSwxNS4xNjZWNy4wNkwxMS4xNDEsNS4xNTV6IE0zLjUsMTYuMjJsNy42NDEtMS45MTl2OC4zMiAgIGMwLDAuMDQ1LDAuMDA4LDAuMDksMC4wMTksMC4xMzJMMy41LDI0LjY2MlYxNi4yMnogTTEyLjMzNSwyMi44MzhjLTAuMDYzLTAuMDMyLTAuMTI3LTAuMDU4LTAuMTk0LTAuMDggICBjMC4wMTItMC4wNDQsMC4wMjEtMC4wOSww'+
			'LjAyMS0wLjEzN3YtOC4xNDlsNy42NzMsMy44MzJ2OC4yODFMMTIuMzM1LDIyLjgzOHogTTIwLjg1OSwyNi44NDZ2LTguNDYybDcuNjQtMS45ODJMMjguNSwyNC45NCAgIEwyMC44NTksMjYuODQ2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._music_banner__img.setAttribute('src',hs);
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._music_banner__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjxzdmcgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIGlkPSJMYXllcl8xIiBoZWlnaHQ9IjMycHgiIHZlcnNpb249IjEuMS'+
			'IgYmFzZVByb2ZpbGU9ImJhc2ljIiB5PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjguNDk5LDE1LjM0NGwtNy42NCwxLjk4M1Y5LjI0Mmw3LjY0LTEuOTA1VjE1LjM0NHogTTE5LjgzNiw5LjIyOXY3LjkzM2wtNy42NzMtMy44MzNWNS40MTYgICBDMTIuMTYzLDUuNDE2LDE5Ljc3OCw5LjIwOSwxOS44MzYsOS4yMjl6IE0xMS4x'+
			'NDEsNS4xNTV2OC4wOTJMMy41LDE1LjE2NlY3LjA2TDExLjE0MSw1LjE1NXogTTMuNSwxNi4yMmw3LjY0MS0xLjkxOXY4LjMyICAgYzAsMC4wNDUsMC4wMDgsMC4wOSwwLjAxOSwwLjEzMkwzLjUsMjQuNjYyVjE2LjIyeiBNMTIuMzM1LDIyLjgzOGMtMC4wNjMtMC4wMzItMC4xMjctMC4wNTgtMC4xOTQtMC4wOCAgIGMwLjAxMi0wLjA0NCwwLjAyMS0wLjA5LDAuMDIxLTAuMTM3di04LjE0OWw3LjY3MywzLjgzMnY4LjI4MUwxMi4zMzUsMjIuODM4eiBNMjAuODU5LDI2Ljg0NnYtOC40NjJsNy42NC0xLjk4MkwyOC41LDI0Ljk0ICAgTDIwLjg1OSwyNi44NDZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9Ii'+
			'MwMDAwMDAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiPgogIDxwYXRoIGQ9Ik0yOC40OTksMTUuMzQ0bC03LjY0LDEuOTgzVjkuMjQybDcuNjQtMS45MDVWMTUuMzQ0eiBNMTkuODM2LDkuMjI5djcuOTMzbC03LjY3My0zLjgzM1Y1LjQxNiAgIEMxMi4xNjMsNS40MTYsMTkuNzc4LDkuMjA5LDE5LjgzNiw5LjIyOXogTTExLjE0MSw1LjE1NXY4LjA5MkwzLjUsMTUuMTY2VjcuMDZMMTEuMTQxLDUuMTU1eiBNMy41LDE2LjIybDcuNjQxLTEuOTE5djguMzIgICBjMCwwLjA0NSww'+
			'LjAwOCwwLjA5LDAuMDE5LDAuMTMyTDMuNSwyNC42NjJWMTYuMjJ6IE0xMi4zMzUsMjIuODM4Yy0wLjA2My0wLjAzMi0wLjEyNy0wLjA1OC0wLjE5NC0wLjA4ICAgYzAuMDEyLTAuMDQ0LDAuMDIxLTAuMDksMC4wMjEtMC4xMzd2LTguMTQ5bDcuNjczLDMuODMydjguMjgxTDEyLjMzNSwyMi44Mzh6IE0yMC44NTksMjYuODQ2di04LjQ2Mmw3LjY0LTEuOTgyTDI4LjUsMjQuOTQgICBMMjAuODU5LDI2Ljg0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._music_banner__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggSubElementOver = elo;
		el.ggId="Music_Banner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 13px;';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='position : absolute;';
		hs+='right : 15px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._music_banner.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._music_banner.onclick=function (e) {
				player.playSound("Element01","1");
		}
		me._music_banner.onmouseenter=function (e) {
			me._music_banner__img.style.visibility='hidden';
			me._music_banner__imgo.style.visibility='inherit';
			me.elementMouseOver['music_banner']=true;
		}
		me._music_banner.onmouseleave=function (e) {
			me._music_banner__img.style.visibility='inherit';
			me._music_banner__imgo.style.visibility='hidden';
			me.elementMouseOver['music_banner']=false;
		}
		me._music_banner.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._music_banner);
		el=me._banner=document.createElement('div');
		el.ggId="Banner";
		el.ggDx=35;
		el.ggDy=-21;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : calc(100% - env(safe-area-inset-top) - env(safe-area-inset-bottom));';
		hs+='left : env(safe-area-inset-left);';
		hs+='position : absolute;';
		hs+='top : env(safe-area-inset-top);';
		hs+='visibility : inherit;';
		hs+='width : calc(100% - env(safe-area-inset-left) - env(safe-area-inset-right));';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._banner.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._banner.ggUpdatePosition=function (useTransition) {
		}
		el=me._instructionbox=document.createElement('div');
		els=me._instructionbox__img=document.createElement('img');
		els.className='ggskin ggskin_instructionbox';
		hs=basePath + 'images/instructionbox.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="instruction-box";
		el.ggDx=-5058;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 440px;';
		hs+='left : calc(50% - ((720px + 0px) / 2) - 5058px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((440px + 0px) / 2) + 0px);';
		hs+='visibility : hidden;';
		hs+='width : 720px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._instructionbox.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._instructionbox.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getViewerSize(true).width >= 1024)) && 
				((player.getIsMobile() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._instructionbox.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._instructionbox.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._instructionbox.style.transition='';
				if (me._instructionbox.ggCurrentLogicStateVisible == 0) {
					me._instructionbox.style.visibility=(Number(me._instructionbox.style.opacity)>0||!me._instructionbox.style.opacity)?'inherit':'hidden';
					me._instructionbox.ggVisible=true;
				}
				else {
					me._instructionbox.style.visibility="hidden";
					me._instructionbox.ggVisible=false;
				}
			}
		}
		me._instructionbox.logicBlock_visible();
		me._instructionbox.onclick=function (e) {
			me._instructionbox.ggVisible = !me._instructionbox.ggVisible;
			var flag=me._instructionbox.ggVisible;
			me._instructionbox.style.transition='none';
			me._instructionbox.style.visibility=((flag)&&(Number(me._instructionbox.style.opacity)>0||!me._instructionbox.style.opacity))?'inherit':'hidden';
		}
		me._instructionbox.ggUpdatePosition=function (useTransition) {
		}
		el=me._okinstrbutton0=document.createElement('div');
		els=me._okinstrbutton0__img=document.createElement('img');
		els.className='ggskin ggskin_okinstrbutton0';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABkCAYAAAD32uk+AAAgAElEQVR4nO2dd3gc1bn/v2dmtqpZlmw123IFO6bXXcAS4cYOLbQ4SCRASEIS7s2Te2W4tARwCCahJVISCAnlR7+RAlwuDtjGpolAVhDAMSShuMSS1SxLsurWmTm/P2ZXuzNzRlpJu1rJPp/n0bOaeeec854p3zl9AA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4WQekmkHpgUVngKyreGPABZn2pXxQBt9T2JN9fpM+8HhzFSkTDuQcSo8s8m2htcBLKONvl/iraZIpl1KigrPSlLpvY1urXdiTfWNmXaHw5mJHN4CWOGZRbY1vAHgCNroOw9rql9HhceFCk+RZZi3mjrwVlMIt9TMg/'+
			'X5G8KGum5UePJQ4cm3jGtD3d7JuE+31v+WVHpvoFvrVaypvnkycXE4nMOJCk8eCTX/lYSag9havzphXxMJNVOLv6dR4RGxtb6GhJpVi2PasbV+OSo8S0ioeZ9VXNhan5pS29b6h6Px3ZGS+DgcziFOhSeHhJrfJaHmELbWnx3dl01CzW+PIn5/jIrfNaOIX1dU/BaSUHPzKOJ3ayqzQ0LNT6QjXg7nUOfw6wSp8OSQbQ1bAZxAG32XYE31y6jwZJNtDZsArLII9SxdXfV13FJzNan0/hbs83aANvrOwoa6oWi1eiErItro+wnWVN/ufKT+YulE7wXazphR/0ss9if+Eu1HkPNxCYBscQgvC0EcSDaOmW6PnQPQ6etjWu3TwYeptmv/R0AR8rf7+gMdTR8GOpoaAx1NPRgnh5cAakL3CoCTaaNvLdZUb0SFx022NbwE'+
			'4IsWoTbS1VVfxS01V5BK76Ngn7Ne2uj7N2yo6ybbGhph0ZtMG30/w5rqHzsfqb9MPMn7FKEQNUPsAP3vuB5+4+90vHHTYOcCOA18mGo7+xiZUGzs+bD29z3b67YiScRkD5zxVHiyyLaGzQA8tNFXhTXVL6LC44yK31kWoV6iq6vW4paay0ml9xEAAuOYXtro+xI21HVGxW8JKyLa6LsLa6p/5Hykvlo8yfs0AHGst08yb6fJxjHT7dPBh0zbp4MPmbYDEAiwwl3ivaLg+HWVAD4KdDZ1jhXo8BBArZS3GcDptNH3daypfj4qfi8AWG0Raku05PdVUul9HGzx66eNvi9jQ11bdCjNkRZx1eLIM25wPlJfLZ6siR/Ab/xU2KeDD5m2TwcfMm03HLPIXeL9jqvYIw/seu7t0cKwHupDiwqPK1rKO502+i7HmupnUeGxR8'+
			'XvbItQW+nqqotxS80lpNL7JKzFbw021O2Nit8Ki7hq6eqqa52P6sWPw+GkFcld7P3ZEd9q3uQq9ritDjq0BVAr5f0JQCVt9H0Ta6rro+L3LKzF7/Wo+J0fFT+WYA3SRt+52FD3L7Kt4TVYi9+DdHXVtc5v1lzGxY/DyQjnzD+7odFV7JnNMh66nSCa+L0IYE1U/J5EhUci2xqeB3CBRag36Oqq83FLzZdJpbcBgI1xTEz8/km2NbwJ4GiLuB6iq6uucV5VUxVr82M17Ep9vSi7/25IQwNj54mOfUjawo8jLPOmmiG+pyq87hzMMN9TFZ6kMW0qukFt+VCcCxDJPwOKa/FYHSnbPn+8fI3Jx0m6OG0hoebLoInfa1hT/XR034UALrIIMkRXV92MCo+L3LpuAwA76yDa6Hsca6obSaj5hwBOsIhrL11ddYfzqpoq8WTv'+
			'U7Do7bX19mDBfeth7xqzrZbD4YyCnH00QsWXQslaYdmTHOjw3brvleoNieEOWQHMNI7H6i+TTvI+BUbJDxSQ+g5iwX3r4ehsz5CHHM6hBYWAUNm3EC44J7ZD90sogi1bqo4I7G/aFwszpQJIbq4pB4UKQCWAAkCNbcO8rQJQ1Hvq5Kn0MRU4Hqu/TDzZepyf1HcQC+7l4sfhpIPQ3K8hVFxlNZaw/rMnyi+LHTs1AniGJ1vc1PA0gAsnOTBSAR0RSoUkCiY1CCiNiizV70NsH6ASw7YxLjJK3AAUwg4ngqIKgMjKgzjQh/K7b+Pix+GkEX/5dZBzvdqGXlOU7r/VlvfsqGsDpmI1mDM85eLmho2gOCYFsYmYwT2p4mA/yu/hJT8OJ924Wn+PoSNWgkq5RpPoLvZc1bMDdwJpHgYjbK4/Vdzc8B6QEvGb0YyIX0dbpl'+
			'3hcA55iDIEe9fzTJu7yPvV2P9pE0Bhc/2ZZJX3VQBz05XGTEEcHMCCe34CR3trpl3hcA4b7AdfA9QQy3Ssq8iTB6RJAMnm+q+QVd4tALLTEf9MQhwcQPk96+Fs2zf2wRwOJ2UQNQhx+FOWSXAXe04E0tAGSLbUryarvM+CwmF1jH3/AYAIoAIBIAACASUCQAhAYv9r+wEBVIxuzzDEoUGt5MfFj8PJCGJwD5TsY1mmEiDFAki21J9GVnlfANjiR8IRlN/1G+S/+ZdJpUNFEZQQQNBEk0Z/R4Q04XdEaIkQP04XRtDiYoUz7teFFfQ+kHh82jaBa/dO3uHB4WQQEum3Ms0FUimAqzxLSIX3T6DIYpnFoWEsvvlnyP7HZ5NOiigKH8HN4VgQyT0WkfxT4Wp9GkTxZ9qdzGJdc5SBVAngKk+u8ErDSwCYE47FgUEsve6n'+
			'cO/6V0qS43A4bCKzTsHw4nWAYIPiXoKsnRsgyIOZditjUGmWlWkYSFEniLC1oR7AcpZNHBjEspr1XPw4nDQTLjgTw0uuAwRtDQ8lawmGjrwDqr0ww55lDsW10Mq0D0hBCZC8Uv9TAOewbMKwH0tu2ADXv1omm8y0R3EtABUs+310EHkAYmh/mj3iTEcokQDBBqIEUhpvsOQSBEsv09qhod1jVMqF6pqHweU/Q/bODRADh/5zmAgVXFCyvmBl3g5MUgDJ1vpzySov+0tksozFP74bWZ/tnkwSM4bhpTdCdVh/TjgRcehz5Hz6ozR7xJluBIsvQbDkYkBwwtn2DJyd/5eyuKmYBRACIg/C1fwwbP3bEVjwLYQLvwgq5QBUTVlaM4XIrEqASKxltXb27KjrBiYjgBWeRaTC+4zVml0Lah9Gzt/+MeHoZxpUSn7II1GG0u'+
			'gJZ9oi2ADRBQAIzT0npQLobGsAqAzH/k0QZK3n0733t7D1vgMq5UEMHl6D8CmxIzT3YqbNv9/3v7H/JyaAFR6XsLXheQDMFsY5L2xBwcuvTSjqmQiFACpYrrptgsja4qdUcOp7qdQICI1oNiIChio1q0ePCg6AGKZHJ8SjO1Zk+KgEQEBBIQCi0xBABVGDY+aHCi4ornmgYhaIGoDobwFRzVU8c37DIFRm+5Zgi4dPLq+U2EbaweL5DIJAXwqiEEBFNwhVTP5SYgeEsR8PovgZ14qOVHHjvujHLQihLlNcVLADxB4fB4v4+FciD4KwZzVodhqGq+0PoIILctaykWshDX2e3LWwuNaU2LS45H4QRmmHEhGqowRUygElEojihxDuynjHS6joUlBbAdPm72yqj/0/IQEk2xoeAsXxLFvWPz/HvPsfm0i0aYEKArovXI2e'+
			'sysRWDQfEAU4W9qR/+rbmPvsJghhs1BMBEfnCwBVQNQgVNcChAsq9faOF7SHRXBA8u8BAAyurIXqmJMQx0a4Wp8EAETyvfAvrtHFkbf9myDKsG7fwFG/AbXrO9+lvveRvesu3T4qONB//JMmv7N23glb/3YtvSXrdDYS7kbeR9dY5llxL0ag7OuQc4/WCxNVYOv/EM59j+vaOgeOqgNNaJB37nsCzv1/AgD0H/uoTrRcLf8Pjq5NE8prqPgiBMuqdPsc+1+Ca9/jAIBgyVcRLL5YEy1C4Gp5DI6ul3XH+xf9AJHZp1vmPUbW5z+Fai9EYOF/xHcqAczafoXmS9H5CM77hi4MkQfhbnnEFFdgwdUIF1p8oJBSCKEO2LvfgGP/SybRH++1MN57oCpyPrkRol/rrBxYWac16USvSd72K4GEF7CcvRzB4gsh5x5jelEDgL'+
			'3rFbhbHmbnJc3IWUchPMdq0Xds6tlR97fYxvgFcFv9DwBczjJJB/ux6Nb7QGRl3NGmg/Cc2dh9143wL9d/qdJ/xCL4j1iE7q98CUtv+DmcLZMbrEygwtX2P/F08083CaC9+3WIoQ59QEMJB2rY2ma0A9qb3m4eeSTnHKW9jRPiUG3MEUpQXOWw9W+HnH2EycZYSWOExOEWJoiIyKyTIWevQPanP4YY1BaAIFTRlSF0JTwqQ/cFAkP+x5NX1rkLzTkb9q4tEEOdmkAklnZZpWUpx5wvBkQJmEqqo/lCFD9y/r4OgtxnjkwdZelLQqA6SxGc9w1EZp2M7M9vHykRTuRamPJMBATmXYnsz2/XzKJTH58aPz5YshbB0ktHnZ0lBjMz+0m1FSCw8DrNN0bzXPffam9P3B7fMJhba04lFd5fslNWsegntbB3944rynShZLmx'+
			'81frTeKXSGh+CT67/3aEC/NTnbppD6GMl4LhJiQ0LnBENT6U1PTWj8w6iZ286IScrf9OE0s8AG2oBAAoOSvNRsGuVZUMqLZ8DC/6T/YDl5imlA3/wn9P2GE4BwniMKqIYHx5Zb48BAnBeZcz7ca0NN+TFEB50Cxco+QLSoAtfgCz2YKFkn0EgqVaCXfi18KcZzn3aETyTtR80eUpfu+F870IllWPOTVVGvwkiZykFkokBBZeDyqyr52/0/eLnh117yXuS74EWOEpJLeuew6U/a2Mst89jZztfx+Pv2ml84qLECwvG/M4uSAfHd+pQvndv0tZ2myxY4misQSY8ACYbObwkVmnxuNS/Lp2NDnvWNgGP44Ht7FFXnYvhSrlQHGVM+2qLRdiSN82FJrzZV0JishDcO+pBVH8CJZ+DXJe/FMpSvZyKM4yreRhOAe6h8yUX6'+
			'MAJp9XlqABQCT/VE0sjYJletkAzvZntTSUAILzr9T18Ds6X4To3wMquCFEeqFS/bkbLV9WvrGOFYd3wdneACrlITD/Kl1HW7jwLDhbn5rwtbDyIzDvSkj92/Uv54T8BMuqDT7ugbPtGRDFD9VRhMiskyBnr4QYaLbOZ5oIln0binup1ceUPujeUWcaepFcCbDCI5JXG54DMI9lzmt8F0X1G8fhanqhhKD7PIu2FAa9a1ZBdTB1fYIOMIYcMKu0+n3hwrMwvOR6DC+5Tqti6MIb2nwcJVBd8cth379JN+8xkqf/XhO1sUfEU0eh1tZF2JMLqZRn2ifn6SeXS4MfwzawA9LwTjg6XzQdr2QtBcB4MSSWlEYpRY03r8xzraWCwPwrzQ8/o+Rl63sP9p43Ye97F0TWt7uKwzth730Hju5tIGrYnN5o+bKo5srZX4BquEZE'+
			'DYIoIYjDn8Pe/ao+CSkbqqNowtfCyg/VVYbwnDXMarziKIbq1BcqHPtfHEnP3vs2svbUIffj7zPjTifh2V9EpMD00bcYffu2VK0NdDaFjYbkSoC31dwDoJJlcrS0YeGdv0nWzykhXFQIebblFBgTqtOBwJJyZP1zZ2ocYJb2xi4Bqq75UF3zmVGaq78n67Ztgx9DyVoCOU/rm1Kd86HaZkOIaE0SViVAgGgDaC1gCaBqn6PbJnK8cVwI9zDiiJZcRhMeU0kpfr7Gm1eT6CSgZC1DmOiri+bmBmMGrH1j2cEQj3hYRnVbcGJo+U9N++WcozC0/ChIAx/B1vuOOZzoHv+1ELMt/YgRLL3UIOLa+VEdxaZjhYi5Ok+meMyh4lqM4LzvWdr9nb5vBDqb9rJsY5cAX61fSyq91zID+wNYctPdEANjD5WYSqh99PYQFnIOcw'+
			'2HCTqQXBXYuqTCwFglzE8QBTUEcegziMO74vsIgZx3XPyQhE4QIdQFIRjvkKFSPO/SwEf6ZG2M9hSDgCS2BzEfLAtBGrXjIlEAx5lXc1VSPxhfcS80pDWWAI4heAaSzdfIrjHGkBJ5QCtpGvcr/glci5DZLyUEIRDvtKC2XH2bcez8CKxaklbfVG0FCJReCv/8b2N40Q/NNZg0QcUs+Bf9N6hFG6i/w3dH65bqTUwjxhLASs8KUum1HNOycMP9cO6bfss92bt6AGV8PdGODvO4rIliHG+m7WRUMQ0lDyHUBXF4N8Th3RCC+vOaWAJUpVwoWUcmhsTgF+5BuPDfdGEiuXFRSLyhhWA7bH1/NftDZTgMg3NZPcGxcYwj/tjipUTKeEiEUPS7x8aHlVL2/wBiHUkTyatRdJwdz8d9YDBWCdBc4jNsG/OcWAIylYYYNQF5'+
			'AK6WR2E72KTbLw3+QxsOdGCbWSSVIITwgfFfi3B0KExCnokahKvlUdOxI/bovWdMCwDU6GIDqr0AodJLES46F5GCSvNLJk34F66DardcdP7V1i3Vt40W3loAKz3Z5LWGF2CxqvPcP7yIWW+9m6yfU4oQDCHng+Q7ZJzNbZMeCpMIq+eUNU/YKJTO1qeQ88mNyPnkRmTtutcy/kjeSfpeOMEG1bXA1NMr5x6jDXCGvgpMlCGtoduAre9DCIY5yiwBFIc/16eTvQKKozSa5nH6g5UApKHoqrwG4QgXngk5aynC+adBdZbobLGBxBPJq7kKRuDc95QpH3HzWBUhozgbXmYG8VacZYjkHgfFNR+RgjP0IRVzbYmoYTi6NkMa/Kd+f+QgbL3vQAh2Ilz4RZ3NNvA3EKqM81r4IQ19Fs1BwjkSJNgG/w6p732Tb9EDAACif4'+
			'/ppR2ae060Gm44R6waT4oJllSb8xined/mqmorYwzLNkDyWsMTAI5k2XI++DvKHnwmKSczRcmT/4vBU5grwZqPfezZlKZNjTMqwBZAo1AmhjPGkRheVyUczQ8pG0rWMkjDn+k6QYgagjT0CaAERqZmAYC9502TeLAE0HFgKyIFFRgRAtGFwaN/rd30hpkajv0vj4xXEwLNULIWJ+TDi0i+1+y4EhwZkDuhvJrOnR323j8jNPgJlJwV5rBjLGJhup6G6yYEWjQRjJXyRSeGj7iFGZeu6m7yQx9vZPYZiMw+w3ygGoGz/TkA470Wm0aq0lSIX/dY/l2tT2Ew73hTuJidqGHYe95EeM7qEZuSswIDxzxomad0Eck9AaHitVbmUM/22rWBziZzI6gB9qvvtfrrAVzCMtm6erD41l+AqNN7cnXO9n9g3v1PjHnc3IaXMHvb'+
			'2ylNO/HmGoElgKKh3VFwWtpiNyEV7Nro+xGDCveeOmTtvAvuXfeOCEcMOe84UMGhn2oWnWZmG9ihvdHVCEj4IKT+D2B8kydWqWJIQ5/B0cGYx2p4cKT+7XB2PDey7ex8URPdUaFwtT0NooYmlFcApml18Qf8CUZVOxkBNF4LfdVSDHfB3j321E8S7oEjOvOFmY6UxHRKNQL33gcgBvYCGM+1+BDOjviLXneOiAQKAWKwDfYD28x+JeTX1foUBP/UD3FJRHUUwb+oxtLu7/T9V8/2OqvirA5zCfC2mhNxpvdO1lgaEpGx5Mf3QeqfGQssFv3hT3C0dqLluu8iMsc4hWoAZQ8+jcKXXk95ulQ0CyCzBGh6UJ2WtpiAyrnH6cRUCHfD3hsXcDn3aCjuRSPbkbzjYet5SxdVrBSQtfs+s08GgbCaDeJqewZisA3BkrVQne'+
			'beQQAgyjAU90JI0VKPGGxFzqe3IDDvyuiUrcT3L4Xo3wtn+7Ow9b034bw62xvM5z/6AEvDu2DrfRuRglVMuxWm6ySar6Wr+SEIoU6Eis4FNc66UYKwH2yCs+1/IDDa0eLxWnfEEXlIE7HOFyAG9LMsRrsWQqgLjv0vw961WVftZd5fagDO9j8iUlChtydcA6L4kfPpjxAsWYtw4VmgxhekKkP074at12eZl8lABTuGF98AiG6r8X5PtW6q/n2y8ekbMyo9Nrze8D6AY0gs8oTfBfc+hDkvbJ2A25lFlSQMnngUgovmgwoCnM1tyH3/Iwghc88aZ/yo9jlQ7QWgUg4C878F1aFvlBb9zbD1vAlH16aRDgUqOKE4y7RBvGoYQqgDgnxorJKjOIqgZC2D6iiCNPAxRP9u9uB4A9riDC5AdEYXK5AAUBBlmDmkhYVqnwM5'+
			'axlUx1zY+j9M+xqAiqMI1JYPEAEkMggh1Jn0jJaJ4F/0X4jkR19gBo0iFDv2vVzlDXQ2Jb3Yol4AX6+/GpXeh6OR6SKfveUtLLr91xN2nHN4oIrZ8C/8D8j5p+j2k0gfcj/+IXNlkkON0NyzEZj/7agoDCD70x9pc5CnIu3CLyFQ/l2AiCDyILI/vSU+/3eGE5p7DoLzv2MSvuhvX+vLVScGOpr2jCfOeB2k0iPiTO/NrINcu5pR/vPUTRXjHLoIyhCyd98D994HEmZQULhaHj4sxA9AdGVm7dGittxoJ8UUpV329ZH2PyrlmBblmKnIWUciOP8qS3ugw3fleMUPSGwDPNOzGsBi4wFElrFo/a8ghGdmdVG1SQgXFSJcWoRIQT5ACKSD/bC374ejoytly2Fx9Ni734DU9yGC8y6HEOqE/eD0HDKVakaqsYa9U5a+qS'+
			'Nl6tJOF6otH/4l12nCzsiOv8N3Z9vL1da9S6MQF8D165i9vgWbGuHaM7O+JTB09JHoqzwVg8evhH/ZQkAULY917WpG9o5PkP+mDzkfHj4rWE8FgtwP994HMu3GlEKgQur/AHJs+p4SgK0ntaMMRsPW99f40CIlCHvPn6cs7XRABQeGl91kuZoRgFd7P6wbdbDzaMTbANXmZgALEhoUAQArrvhvuHfunWj8U4bqsKPrkrPRfeGXEJpfOqE47J0HULjxVcx9bhPE4cOjusZJPZTYEMk/BVRwwzawHUK4ewrTlhCZdQqolAWpfwfEcOpmOGWC4aU3IJJ/ir5PIv5/S+tLVScGOpomfII1AVxfk4/163pHEoAmgPbOAzj6on+3Cjtt6DvtRLRc/z1E5rKXwB4vUm8fFvzyUeS/kZ6ufA6HMzaBBd9CqOg8AGAJYKjng9pV'+
			'vR/UMeZ0Jk+sE4T57Tj3J9P/i277v3Yudt97c8rEDwDk2bOwZ8N16Lyc/VEVDoeTXgLl30ao+DxLu7/d94PJih8QF0DmaFd7x4HJxp9WQiVz0frDb6Yt/rbvX6Z9R4TD4UwZ/oVXI1R0rrW9w/fztpeqrVdvGAcxAWTOwZnuPb9DRx85agfHpBEE9J9+Yvri53A4I1DBjuGl1yJcdPZohzW0/ak6ZR/VjvUCM4fgy7nJf+s2E1BpUt91TwrVOfo8Uc7Uoc2OSOMLb8qhzE+dHo6o9gIMH3kjFLdpJF4ib7VurLoylenGFIS5FlQoiW9qcDhTxfDSmyDnHpVpN1KKs/UpbZGIw5hI7kr4l9aA2vPN4/zoyM/bbRurzgl0mJe1nwyaAL7ZtBvrEYHuu4TA8MplUO02PliYMy1wdP4f7D2NmXYjZUTyjkVw3hUABZz7Dz'+
			'8RpIINgQXfQKjk/Hgvr+6Akf8a2zZWnRNoT36Ob7IkjgP8CwCvcRzgwp/8GgVb3jKH5HA4kyJYegL8i2sgBN2w9W0DdR7UDBalIOZ27HlN5thRtjMRPlxw2sjHrkyLr6gj/7/atrHqvEB7akt+MeKNaG/6tuJMr2l1ys4rLsLsrX8GUWf+lBoOZ7qgZBWi7/QaUMkNeycArEakEFBmgbXKiW5b95vMMTPAriMqfoF2X0Pv+3XfCLQ3pW156bgANjY9iTO9640HBBcvQNfac1H0x5fT5QOHk1KoYIeStSyzPoBAkActv4/b5/1PUJs2+CIS/eSwLTqfQTGvQXv4EBe/+9s2Vv8w3cnpl8NSm18HxRcBg2LLCpbV3IHccXxng8M53JGzjgTUICSDCA4vPx8DJ16lLx1RwNYJiEPQSoJ5OKxKgIRC+16UJn53tW2sZq5M'+
			'lWr0Ari+ZhVuW/fWiEMJDgr+IJZdeyeyd3wyFX5xOFOCapsNOTe5b8eMCg3Dzvh2r1EE5dwyHDj3PkC0mcVBBWz7E0Qw12A/lAVQRkz8NrRtrL4VU4T5W41K87MA1rIcJrKCkkcbUPTMRgjyOL5py+Ec4qhSDiJ5J8HR84bJJmcvh+ooBiUChldeBDknuliHRQeC2AcIYSBSoJUED3kBVECJCjLV4gewBLDSU4jXG/5KKBaOOGj4dbR2Yu7zmzHrzSbtG7wcDgdUzEIk91jYD/6FaR885lIMHXOplTj8eeCV2tdi++csXXcqoThHzsU/ej+s1X+2kJr/n869wK5Sz0pXsfdrhGGnQC+hmJ0J8QNYAggAt9UcTbSq8KyxFF0cHIatqwfSwBCQ0FNsqfhJ2i3THcOeGJ5Y2Y1vJQu75Y02ip0Zv9VNM868x0jq3LH8ZY'+
			'QZy8763zIMK/4x8jaWfSLXlenvROyj+MZ6mLVtGyjydcZYHhV3obZStCF+6kJX947aM+QcRKR+QOoHsrM8Ynae9xcguHCo33d9T37Tc2LUJvUDoV1NrYGOJlm8rqZc7AeJ7Rf7MXzw3boD5AxPtnicpzC6D1I/EN7Z1BlobwoK19eUSf2wJcQXOuir68Aqj1M63lOsS+fzpu5gW9OQcGPNXLEf7oR01L536lpQ4RHFEzzzE/Yj/FlTX7C1qY+c5pnlKvEcVzpn3R8BzIGZNgBlmRI/wEoAAeC2mhPIbeu2gUJbiXA6FZmjv8wHgWXPkI8ZPQfTxMcpPQfT1MfR7CQESAP4Vfcl8Ep9OMXepbUD2roA6SAeBMFpAI7trwDkfMDRAjhbgIHNtd/tPR+77Nese8PREt/vaMGB3b8unysEm59xNOPriTZ7K36+c17tw7Yf'+
			'rNtjCCP3v1Zb2PvXdTc59uEmg61h58Pl1VJvc7+jBbkJ+zGwtdbTez5W2L+77rHE/Y4WvL/rwfKTnbuat5c8gONE9vDljIsfMJoAAkCl5wvk1YbnASyfTjdN7JcLIBfAmX6dQ7t8D6nvNd0s56JEdSNHCAEkDAghgMjoAaDOPmndLwBcGFor2r0AAAIySURBVCrFTw++V/tYtATYFuhoiojX1SxMLLGJ/fAffLeui5zhyRWP88w2lAC7Au1NfuH6mvlSP8SEcOGDvrp2rPK4peM9cw0lwN5gW9OAcGNNsdgPZ0I6tO+dumZUeGziCZ6yxBKg1I+BQHtTcemFDY2EohBmpoX4AWMJIABUeNzktYZaUHwPwLS4aWK/XAC5AM7w67z7wANVx4Z3N8W+HsXEVeqRyi5oeA7AhYF23/fbNlY/NNrxmcZV6llRdkHDGwCKGO'+
			'ZpI35AMgIY49aaY8mt634GinOBzN9UXADBBTD6O0OvszywpbZi8JW6pJYdd5V6bGUXNDwLTQS/17ax+uFkwiVL2QX117hKvTemKLpCAKylpKaV+AHjEcAYt9QsRYXnaqHC6wXwBcSKuNPp4Tfap9eNzwUwhfaZep1Du3y3dz9Q/ROMg6gIPgfggkC77+q2jalZFDQqfg+mIq5RmHbiB0xEAI2s8gikwuOEtpIMGbnIMSy2J9vtPhLHeMIbbJY9kEluZzr8yMPPsk/Rdch0+JE4JpD3kfAZuI6hXU394d1NRsuYuEo99qgIfgXA3vGGt8CZonisEAHMCbT77mjbWD3hL7ilg8kLIIfDmVKiIvhjWHzKYjoSaPd91rax+neZ9oPD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6H'+
			'w+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwMsb/B3AEWGekAXdSAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ok-instr-button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : -70px;';
		hs+='cursor : pointer;';
		hs+='height : 67px;';
		hs+='left : 211px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._okinstrbutton0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._okinstrbutton0.onclick=function (e) {
			player.startAnimation("Animation01");
			me._button_menu.onclick.call(me._button_menu);
			me._music_banner.onclick.call(me._music_banner);
		}
		me._okinstrbutton0.ggUpdatePosition=function (useTransition) {
		}
		me._instructionbox.appendChild(me._okinstrbutton0);
		me._banner.appendChild(me._instructionbox);
		el=me._container_1=document.createElement('div');
		el.ggId="Container 1";
		el.ggDx=1;
		el.ggDy=9;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 401px;';
		hs+='left : calc(50% - ((312px + 0px) / 2) + 1px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((401px + 0px) / 2) + 9px);';
		hs+='visibility : hidden;';
		hs+='width : 312px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._container_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._container_1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._container_1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._container_1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._container_1.style.transition='';
				if (me._container_1.ggCurrentLogicStateVisible == 0) {
					me._container_1.style.visibility=(Number(me._container_1.style.opacity)>0||!me._container_1.style.opacity)?'inherit':'hidden';
					me._container_1.ggVisible=true;
				}
				else {
					me._container_1.style.visibility="hidden";
					me._container_1.ggVisible=false;
				}
			}
		}
		me._container_1.logicBlock_visible();
		me._container_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._instructionbox_mobile=document.createElement('div');
		els=me._instructionbox_mobile__img=document.createElement('img');
		els.className='ggskin ggskin_instructionbox_mobile';
		hs=basePath + 'images/instructionbox_mobile.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="instruction-box_mobile";
		el.ggDx=-2;
		el.ggDy=-9;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='height : 258px;';
		hs+='left : calc(50% - ((288px + 0px) / 2) - 2px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((258px + 0px) / 2) - 9px);';
		hs+='visibility : inherit;';
		hs+='width : 288px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._instructionbox_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._instructionbox_mobile.onclick=function (e) {
			me._instructionbox_mobile.ggVisible = !me._instructionbox_mobile.ggVisible;
			var flag=me._instructionbox_mobile.ggVisible;
			me._instructionbox_mobile.style.transition='none';
			me._instructionbox_mobile.style.visibility=((flag)&&(Number(me._instructionbox_mobile.style.opacity)>0||!me._instructionbox_mobile.style.opacity))?'inherit':'hidden';
		}
		me._instructionbox_mobile.ggUpdatePosition=function (useTransition) {
		}
		el=me._okinstrbutton=document.createElement('div');
		els=me._okinstrbutton__img=document.createElement('img');
		els.className='ggskin ggskin_okinstrbutton';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABkCAYAAAD32uk+AAAgAElEQVR4nO2dd3gc1bn/v2dmtqpZlmw123IFO6bXXcAS4cYOLbQ4SCRASEIS7s2Te2W4tARwCCahJVISCAnlR7+RAlwuDtjGpolAVhDAMSShuMSS1SxLsurWmTm/P2ZXuzNzRlpJu1rJPp/n0bOaeeec854p3zl9AA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4WQekmkHpgUVngKyreGPABZn2pXxQBt9T2JN9fpM+8HhzFSkTDuQcSo8s8m2htcBLKONvl/iraZIpl1KigrPSlLpvY1urXdiTfWNmXaHw5mJHN4CWOGZRbY1vAHgCNroOw9rql9HhceFCk+RZZi3mjrwVlMIt9TMg/'+
			'X5G8KGum5UePJQ4cm3jGtD3d7JuE+31v+WVHpvoFvrVaypvnkycXE4nMOJCk8eCTX/lYSag9havzphXxMJNVOLv6dR4RGxtb6GhJpVi2PasbV+OSo8S0ioeZ9VXNhan5pS29b6h6Px3ZGS+DgcziFOhSeHhJrfJaHmELbWnx3dl01CzW+PIn5/jIrfNaOIX1dU/BaSUHPzKOJ3ayqzQ0LNT6QjXg7nUOfw6wSp8OSQbQ1bAZxAG32XYE31y6jwZJNtDZsArLII9SxdXfV13FJzNan0/hbs83aANvrOwoa6oWi1eiErItro+wnWVN/ufKT+YulE7wXazphR/0ss9if+Eu1HkPNxCYBscQgvC0EcSDaOmW6PnQPQ6etjWu3TwYeptmv/R0AR8rf7+gMdTR8GOpoaAx1NPRgnh5cAakL3CoCTaaNvLdZUb0SFx022NbwE'+
			'4IsWoTbS1VVfxS01V5BK76Ngn7Ne2uj7N2yo6ybbGhph0ZtMG30/w5rqHzsfqb9MPMn7FKEQNUPsAP3vuB5+4+90vHHTYOcCOA18mGo7+xiZUGzs+bD29z3b67YiScRkD5zxVHiyyLaGzQA8tNFXhTXVL6LC44yK31kWoV6iq6vW4paay0ml9xEAAuOYXtro+xI21HVGxW8JKyLa6LsLa6p/5Hykvlo8yfs0AHGst08yb6fJxjHT7dPBh0zbp4MPmbYDEAiwwl3ivaLg+HWVAD4KdDZ1jhXo8BBArZS3GcDptNH3daypfj4qfi8AWG0Raku05PdVUul9HGzx66eNvi9jQ11bdCjNkRZx1eLIM25wPlJfLZ6siR/Ab/xU2KeDD5m2TwcfMm03HLPIXeL9jqvYIw/seu7t0cKwHupDiwqPK1rKO502+i7HmupnUeGxR8'+
			'XvbItQW+nqqotxS80lpNL7JKzFbw021O2Nit8Ki7hq6eqqa52P6sWPw+GkFcld7P3ZEd9q3uQq9ritDjq0BVAr5f0JQCVt9H0Ta6rro+L3LKzF7/Wo+J0fFT+WYA3SRt+52FD3L7Kt4TVYi9+DdHXVtc5v1lzGxY/DyQjnzD+7odFV7JnNMh66nSCa+L0IYE1U/J5EhUci2xqeB3CBRag36Oqq83FLzZdJpbcBgI1xTEz8/km2NbwJ4GiLuB6iq6uucV5VUxVr82M17Ep9vSi7/25IQwNj54mOfUjawo8jLPOmmiG+pyq87hzMMN9TFZ6kMW0qukFt+VCcCxDJPwOKa/FYHSnbPn+8fI3Jx0m6OG0hoebLoInfa1hT/XR034UALrIIMkRXV92MCo+L3LpuAwA76yDa6Hsca6obSaj5hwBOsIhrL11ddYfzqpoq8WTv'+
			'U7Do7bX19mDBfeth7xqzrZbD4YyCnH00QsWXQslaYdmTHOjw3brvleoNieEOWQHMNI7H6i+TTvI+BUbJDxSQ+g5iwX3r4ehsz5CHHM6hBYWAUNm3EC44J7ZD90sogi1bqo4I7G/aFwszpQJIbq4pB4UKQCWAAkCNbcO8rQJQ1Hvq5Kn0MRU4Hqu/TDzZepyf1HcQC+7l4sfhpIPQ3K8hVFxlNZaw/rMnyi+LHTs1AniGJ1vc1PA0gAsnOTBSAR0RSoUkCiY1CCiNiizV70NsH6ASw7YxLjJK3AAUwg4ngqIKgMjKgzjQh/K7b+Pix+GkEX/5dZBzvdqGXlOU7r/VlvfsqGsDpmI1mDM85eLmho2gOCYFsYmYwT2p4mA/yu/hJT8OJ924Wn+PoSNWgkq5RpPoLvZc1bMDdwJpHgYjbK4/Vdzc8B6QEvGb0YyIX0dbpl'+
			'3hcA55iDIEe9fzTJu7yPvV2P9pE0Bhc/2ZZJX3VQBz05XGTEEcHMCCe34CR3trpl3hcA4b7AdfA9QQy3Ssq8iTB6RJAMnm+q+QVd4tALLTEf9MQhwcQPk96+Fs2zf2wRwOJ2UQNQhx+FOWSXAXe04E0tAGSLbUryarvM+CwmF1jH3/AYAIoAIBIAACASUCQAhAYv9r+wEBVIxuzzDEoUGt5MfFj8PJCGJwD5TsY1mmEiDFAki21J9GVnlfANjiR8IRlN/1G+S/+ZdJpUNFEZQQQNBEk0Z/R4Q04XdEaIkQP04XRtDiYoUz7teFFfQ+kHh82jaBa/dO3uHB4WQQEum3Ms0FUimAqzxLSIX3T6DIYpnFoWEsvvlnyP7HZ5NOiigKH8HN4VgQyT0WkfxT4Wp9GkTxZ9qdzGJdc5SBVAngKk+u8ErDSwCYE47FgUEsve6n'+
			'cO/6V0qS43A4bCKzTsHw4nWAYIPiXoKsnRsgyIOZditjUGmWlWkYSFEniLC1oR7AcpZNHBjEspr1XPw4nDQTLjgTw0uuAwRtDQ8lawmGjrwDqr0ww55lDsW10Mq0D0hBCZC8Uv9TAOewbMKwH0tu2ADXv1omm8y0R3EtABUs+310EHkAYmh/mj3iTEcokQDBBqIEUhpvsOQSBEsv09qhod1jVMqF6pqHweU/Q/bODRADh/5zmAgVXFCyvmBl3g5MUgDJ1vpzySov+0tksozFP74bWZ/tnkwSM4bhpTdCdVh/TjgRcehz5Hz6ozR7xJluBIsvQbDkYkBwwtn2DJyd/5eyuKmYBRACIg/C1fwwbP3bEVjwLYQLvwgq5QBUTVlaM4XIrEqASKxltXb27KjrBiYjgBWeRaTC+4zVml0Lah9Gzt/+MeHoZxpUSn7II1GG0u'+
			'gJZ9oi2ADRBQAIzT0npQLobGsAqAzH/k0QZK3n0733t7D1vgMq5UEMHl6D8CmxIzT3YqbNv9/3v7H/JyaAFR6XsLXheQDMFsY5L2xBwcuvTSjqmQiFACpYrrptgsja4qdUcOp7qdQICI1oNiIChio1q0ePCg6AGKZHJ8SjO1Zk+KgEQEBBIQCi0xBABVGDY+aHCi4ornmgYhaIGoDobwFRzVU8c37DIFRm+5Zgi4dPLq+U2EbaweL5DIJAXwqiEEBFNwhVTP5SYgeEsR8PovgZ14qOVHHjvujHLQihLlNcVLADxB4fB4v4+FciD4KwZzVodhqGq+0PoIILctaykWshDX2e3LWwuNaU2LS45H4QRmmHEhGqowRUygElEojihxDuynjHS6joUlBbAdPm72yqj/0/IQEk2xoeAsXxLFvWPz/HvPsfm0i0aYEKArovXI2e'+
			'sysRWDQfEAU4W9qR/+rbmPvsJghhs1BMBEfnCwBVQNQgVNcChAsq9faOF7SHRXBA8u8BAAyurIXqmJMQx0a4Wp8EAETyvfAvrtHFkbf9myDKsG7fwFG/AbXrO9+lvveRvesu3T4qONB//JMmv7N23glb/3YtvSXrdDYS7kbeR9dY5llxL0ag7OuQc4/WCxNVYOv/EM59j+vaOgeOqgNNaJB37nsCzv1/AgD0H/uoTrRcLf8Pjq5NE8prqPgiBMuqdPsc+1+Ca9/jAIBgyVcRLL5YEy1C4Gp5DI6ul3XH+xf9AJHZp1vmPUbW5z+Fai9EYOF/xHcqAczafoXmS9H5CM77hi4MkQfhbnnEFFdgwdUIF1p8oJBSCKEO2LvfgGP/SybRH++1MN57oCpyPrkRol/rrBxYWac16USvSd72K4GEF7CcvRzB4gsh5x5jelEDgL'+
			'3rFbhbHmbnJc3IWUchPMdq0Xds6tlR97fYxvgFcFv9DwBczjJJB/ux6Nb7QGRl3NGmg/Cc2dh9143wL9d/qdJ/xCL4j1iE7q98CUtv+DmcLZMbrEygwtX2P/F08083CaC9+3WIoQ59QEMJB2rY2ma0A9qb3m4eeSTnHKW9jRPiUG3MEUpQXOWw9W+HnH2EycZYSWOExOEWJoiIyKyTIWevQPanP4YY1BaAIFTRlSF0JTwqQ/cFAkP+x5NX1rkLzTkb9q4tEEOdmkAklnZZpWUpx5wvBkQJmEqqo/lCFD9y/r4OgtxnjkwdZelLQqA6SxGc9w1EZp2M7M9vHykRTuRamPJMBATmXYnsz2/XzKJTH58aPz5YshbB0ktHnZ0lBjMz+0m1FSCw8DrNN0bzXPffam9P3B7fMJhba04lFd5fslNWsegntbB3944rynShZLmx'+
			'81frTeKXSGh+CT67/3aEC/NTnbppD6GMl4LhJiQ0LnBENT6U1PTWj8w6iZ286IScrf9OE0s8AG2oBAAoOSvNRsGuVZUMqLZ8DC/6T/YDl5imlA3/wn9P2GE4BwniMKqIYHx5Zb48BAnBeZcz7ca0NN+TFEB50Cxco+QLSoAtfgCz2YKFkn0EgqVaCXfi18KcZzn3aETyTtR80eUpfu+F870IllWPOTVVGvwkiZykFkokBBZeDyqyr52/0/eLnh117yXuS74EWOEpJLeuew6U/a2Mst89jZztfx+Pv2ml84qLECwvG/M4uSAfHd+pQvndv0tZ2myxY4misQSY8ACYbObwkVmnxuNS/Lp2NDnvWNgGP44Ht7FFXnYvhSrlQHGVM+2qLRdiSN82FJrzZV0JishDcO+pBVH8CJZ+DXJe/FMpSvZyKM4yreRhOAe6h8yUX6'+
			'MAJp9XlqABQCT/VE0sjYJletkAzvZntTSUAILzr9T18Ds6X4To3wMquCFEeqFS/bkbLV9WvrGOFYd3wdneACrlITD/Kl1HW7jwLDhbn5rwtbDyIzDvSkj92/Uv54T8BMuqDT7ugbPtGRDFD9VRhMiskyBnr4QYaLbOZ5oIln0binup1ceUPujeUWcaepFcCbDCI5JXG54DMI9lzmt8F0X1G8fhanqhhKD7PIu2FAa9a1ZBdTB1fYIOMIYcMKu0+n3hwrMwvOR6DC+5Tqti6MIb2nwcJVBd8cth379JN+8xkqf/XhO1sUfEU0eh1tZF2JMLqZRn2ifn6SeXS4MfwzawA9LwTjg6XzQdr2QtBcB4MSSWlEYpRY03r8xzraWCwPwrzQ8/o+Rl63sP9p43Ye97F0TWt7uKwzth730Hju5tIGrYnN5o+bKo5srZX4BquEZE'+
			'DYIoIYjDn8Pe/ao+CSkbqqNowtfCyg/VVYbwnDXMarziKIbq1BcqHPtfHEnP3vs2svbUIffj7zPjTifh2V9EpMD00bcYffu2VK0NdDaFjYbkSoC31dwDoJJlcrS0YeGdv0nWzykhXFQIebblFBgTqtOBwJJyZP1zZ2ocYJb2xi4Bqq75UF3zmVGaq78n67Ztgx9DyVoCOU/rm1Kd86HaZkOIaE0SViVAgGgDaC1gCaBqn6PbJnK8cVwI9zDiiJZcRhMeU0kpfr7Gm1eT6CSgZC1DmOiri+bmBmMGrH1j2cEQj3hYRnVbcGJo+U9N++WcozC0/ChIAx/B1vuOOZzoHv+1ELMt/YgRLL3UIOLa+VEdxaZjhYi5Ok+meMyh4lqM4LzvWdr9nb5vBDqb9rJsY5cAX61fSyq91zID+wNYctPdEANjD5WYSqh99PYQFnIOcw'+
			'2HCTqQXBXYuqTCwFglzE8QBTUEcegziMO74vsIgZx3XPyQhE4QIdQFIRjvkKFSPO/SwEf6ZG2M9hSDgCS2BzEfLAtBGrXjIlEAx5lXc1VSPxhfcS80pDWWAI4heAaSzdfIrjHGkBJ5QCtpGvcr/glci5DZLyUEIRDvtKC2XH2bcez8CKxaklbfVG0FCJReCv/8b2N40Q/NNZg0QcUs+Bf9N6hFG6i/w3dH65bqTUwjxhLASs8KUum1HNOycMP9cO6bfss92bt6AGV8PdGODvO4rIliHG+m7WRUMQ0lDyHUBXF4N8Th3RCC+vOaWAJUpVwoWUcmhsTgF+5BuPDfdGEiuXFRSLyhhWA7bH1/NftDZTgMg3NZPcGxcYwj/tjipUTKeEiEUPS7x8aHlVL2/wBiHUkTyatRdJwdz8d9YDBWCdBc4jNsG/OcWAIylYYYNQF5'+
			'AK6WR2E72KTbLw3+QxsOdGCbWSSVIITwgfFfi3B0KExCnokahKvlUdOxI/bovWdMCwDU6GIDqr0AodJLES46F5GCSvNLJk34F66DardcdP7V1i3Vt40W3loAKz3Z5LWGF2CxqvPcP7yIWW+9m6yfU4oQDCHng+Q7ZJzNbZMeCpMIq+eUNU/YKJTO1qeQ88mNyPnkRmTtutcy/kjeSfpeOMEG1bXA1NMr5x6jDXCGvgpMlCGtoduAre9DCIY5yiwBFIc/16eTvQKKozSa5nH6g5UApKHoqrwG4QgXngk5aynC+adBdZbobLGBxBPJq7kKRuDc95QpH3HzWBUhozgbXmYG8VacZYjkHgfFNR+RgjP0IRVzbYmoYTi6NkMa/Kd+f+QgbL3vQAh2Ilz4RZ3NNvA3EKqM81r4IQ19Fs1BwjkSJNgG/w6p732Tb9EDAACif4'+
			'/ppR2ae060Gm44R6waT4oJllSb8xined/mqmorYwzLNkDyWsMTAI5k2XI++DvKHnwmKSczRcmT/4vBU5grwZqPfezZlKZNjTMqwBZAo1AmhjPGkRheVyUczQ8pG0rWMkjDn+k6QYgagjT0CaAERqZmAYC9502TeLAE0HFgKyIFFRgRAtGFwaN/rd30hpkajv0vj4xXEwLNULIWJ+TDi0i+1+y4EhwZkDuhvJrOnR323j8jNPgJlJwV5rBjLGJhup6G6yYEWjQRjJXyRSeGj7iFGZeu6m7yQx9vZPYZiMw+w3ygGoGz/TkA470Wm0aq0lSIX/dY/l2tT2Ew73hTuJidqGHYe95EeM7qEZuSswIDxzxomad0Eck9AaHitVbmUM/22rWBziZzI6gB9qvvtfrrAVzCMtm6erD41l+AqNN7cnXO9n9g3v1PjHnc3IaXMHvb'+
			'2ylNO/HmGoElgKKh3VFwWtpiNyEV7Nro+xGDCveeOmTtvAvuXfeOCEcMOe84UMGhn2oWnWZmG9ihvdHVCEj4IKT+D2B8kydWqWJIQ5/B0cGYx2p4cKT+7XB2PDey7ex8URPdUaFwtT0NooYmlFcApml18Qf8CUZVOxkBNF4LfdVSDHfB3j321E8S7oEjOvOFmY6UxHRKNQL33gcgBvYCGM+1+BDOjviLXneOiAQKAWKwDfYD28x+JeTX1foUBP/UD3FJRHUUwb+oxtLu7/T9V8/2OqvirA5zCfC2mhNxpvdO1lgaEpGx5Mf3QeqfGQssFv3hT3C0dqLluu8iMsc4hWoAZQ8+jcKXXk95ulQ0CyCzBGh6UJ2WtpiAyrnH6cRUCHfD3hsXcDn3aCjuRSPbkbzjYet5SxdVrBSQtfs+s08GgbCaDeJqewZisA3BkrVQne'+
			'beQQAgyjAU90JI0VKPGGxFzqe3IDDvyuiUrcT3L4Xo3wtn+7Ow9b034bw62xvM5z/6AEvDu2DrfRuRglVMuxWm6ySar6Wr+SEIoU6Eis4FNc66UYKwH2yCs+1/IDDa0eLxWnfEEXlIE7HOFyAG9LMsRrsWQqgLjv0vw961WVftZd5fagDO9j8iUlChtydcA6L4kfPpjxAsWYtw4VmgxhekKkP074at12eZl8lABTuGF98AiG6r8X5PtW6q/n2y8ekbMyo9Nrze8D6AY0gs8oTfBfc+hDkvbJ2A25lFlSQMnngUgovmgwoCnM1tyH3/Iwghc88aZ/yo9jlQ7QWgUg4C878F1aFvlBb9zbD1vAlH16aRDgUqOKE4y7RBvGoYQqgDgnxorJKjOIqgZC2D6iiCNPAxRP9u9uB4A9riDC5AdEYXK5AAUBBlmDmkhYVqnwM5'+
			'axlUx1zY+j9M+xqAiqMI1JYPEAEkMggh1Jn0jJaJ4F/0X4jkR19gBo0iFDv2vVzlDXQ2Jb3Yol4AX6+/GpXeh6OR6SKfveUtLLr91xN2nHN4oIrZ8C/8D8j5p+j2k0gfcj/+IXNlkkON0NyzEZj/7agoDCD70x9pc5CnIu3CLyFQ/l2AiCDyILI/vSU+/3eGE5p7DoLzv2MSvuhvX+vLVScGOpr2jCfOeB2k0iPiTO/NrINcu5pR/vPUTRXjHLoIyhCyd98D994HEmZQULhaHj4sxA9AdGVm7dGittxoJ8UUpV329ZH2PyrlmBblmKnIWUciOP8qS3ugw3fleMUPSGwDPNOzGsBi4wFElrFo/a8ghGdmdVG1SQgXFSJcWoRIQT5ACKSD/bC374ejoytly2Fx9Ni734DU9yGC8y6HEOqE/eD0HDKVakaqsYa9U5a+qS'+
			'Nl6tJOF6otH/4l12nCzsiOv8N3Z9vL1da9S6MQF8D165i9vgWbGuHaM7O+JTB09JHoqzwVg8evhH/ZQkAULY917WpG9o5PkP+mDzkfHj4rWE8FgtwP994HMu3GlEKgQur/AHJs+p4SgK0ntaMMRsPW99f40CIlCHvPn6cs7XRABQeGl91kuZoRgFd7P6wbdbDzaMTbANXmZgALEhoUAQArrvhvuHfunWj8U4bqsKPrkrPRfeGXEJpfOqE47J0HULjxVcx9bhPE4cOjusZJPZTYEMk/BVRwwzawHUK4ewrTlhCZdQqolAWpfwfEcOpmOGWC4aU3IJJ/ir5PIv5/S+tLVScGOpomfII1AVxfk4/163pHEoAmgPbOAzj6on+3Cjtt6DvtRLRc/z1E5rKXwB4vUm8fFvzyUeS/kZ6ufA6HMzaBBd9CqOg8AGAJYKjng9pV'+
			'vR/UMeZ0Jk+sE4T57Tj3J9P/i277v3Yudt97c8rEDwDk2bOwZ8N16Lyc/VEVDoeTXgLl30ao+DxLu7/d94PJih8QF0DmaFd7x4HJxp9WQiVz0frDb6Yt/rbvX6Z9R4TD4UwZ/oVXI1R0rrW9w/fztpeqrVdvGAcxAWTOwZnuPb9DRx85agfHpBEE9J9+Yvri53A4I1DBjuGl1yJcdPZohzW0/ak6ZR/VjvUCM4fgy7nJf+s2E1BpUt91TwrVOfo8Uc7Uoc2OSOMLb8qhzE+dHo6o9gIMH3kjFLdpJF4ib7VurLoylenGFIS5FlQoiW9qcDhTxfDSmyDnHpVpN1KKs/UpbZGIw5hI7kr4l9aA2vPN4/zoyM/bbRurzgl0mJe1nwyaAL7ZtBvrEYHuu4TA8MplUO02PliYMy1wdP4f7D2NmXYjZUTyjkVw3hUABZz7Dz'+
			'8RpIINgQXfQKjk/Hgvr+6Akf8a2zZWnRNoT36Ob7IkjgP8CwCvcRzgwp/8GgVb3jKH5HA4kyJYegL8i2sgBN2w9W0DdR7UDBalIOZ27HlN5thRtjMRPlxw2sjHrkyLr6gj/7/atrHqvEB7akt+MeKNaG/6tuJMr2l1ys4rLsLsrX8GUWf+lBoOZ7qgZBWi7/QaUMkNeycArEakEFBmgbXKiW5b95vMMTPAriMqfoF2X0Pv+3XfCLQ3pW156bgANjY9iTO9640HBBcvQNfac1H0x5fT5QOHk1KoYIeStSyzPoBAkActv4/b5/1PUJs2+CIS/eSwLTqfQTGvQXv4EBe/+9s2Vv8w3cnpl8NSm18HxRcBg2LLCpbV3IHccXxng8M53JGzjgTUICSDCA4vPx8DJ16lLx1RwNYJiEPQSoJ5OKxKgIRC+16UJn53tW2sZq5M'+
			'lWr0Ari+ZhVuW/fWiEMJDgr+IJZdeyeyd3wyFX5xOFOCapsNOTe5b8eMCg3Dzvh2r1EE5dwyHDj3PkC0mcVBBWz7E0Qw12A/lAVQRkz8NrRtrL4VU4T5W41K87MA1rIcJrKCkkcbUPTMRgjyOL5py+Ec4qhSDiJ5J8HR84bJJmcvh+ooBiUChldeBDknuliHRQeC2AcIYSBSoJUED3kBVECJCjLV4gewBLDSU4jXG/5KKBaOOGj4dbR2Yu7zmzHrzSbtG7wcDgdUzEIk91jYD/6FaR885lIMHXOplTj8eeCV2tdi++csXXcqoThHzsU/ej+s1X+2kJr/n869wK5Sz0pXsfdrhGGnQC+hmJ0J8QNYAggAt9UcTbSq8KyxFF0cHIatqwfSwBCQ0FNsqfhJ2i3THcOeGJ5Y2Y1vJQu75Y02ip0Zv9VNM868x0jq3LH8ZY'+
			'QZy8763zIMK/4x8jaWfSLXlenvROyj+MZ6mLVtGyjydcZYHhV3obZStCF+6kJX947aM+QcRKR+QOoHsrM8Ynae9xcguHCo33d9T37Tc2LUJvUDoV1NrYGOJlm8rqZc7AeJ7Rf7MXzw3boD5AxPtnicpzC6D1I/EN7Z1BlobwoK19eUSf2wJcQXOuir68Aqj1M63lOsS+fzpu5gW9OQcGPNXLEf7oR01L536lpQ4RHFEzzzE/Yj/FlTX7C1qY+c5pnlKvEcVzpn3R8BzIGZNgBlmRI/wEoAAeC2mhPIbeu2gUJbiXA6FZmjv8wHgWXPkI8ZPQfTxMcpPQfT1MfR7CQESAP4Vfcl8Ep9OMXepbUD2roA6SAeBMFpAI7trwDkfMDRAjhbgIHNtd/tPR+77Nese8PREt/vaMGB3b8unysEm59xNOPriTZ7K36+c17tw7Yf'+
			'rNtjCCP3v1Zb2PvXdTc59uEmg61h58Pl1VJvc7+jBbkJ+zGwtdbTez5W2L+77rHE/Y4WvL/rwfKTnbuat5c8gONE9vDljIsfMJoAAkCl5wvk1YbnASyfTjdN7JcLIBfAmX6dQ7t8D6nvNd0s56JEdSNHCAEkDAghgMjoAaDOPmndLwBcGFor2r0AAAIySURBVCrFTw++V/tYtATYFuhoiojX1SxMLLGJ/fAffLeui5zhyRWP88w2lAC7Au1NfuH6mvlSP8SEcOGDvrp2rPK4peM9cw0lwN5gW9OAcGNNsdgPZ0I6tO+dumZUeGziCZ6yxBKg1I+BQHtTcemFDY2EohBmpoX4AWMJIABUeNzktYZaUHwPwLS4aWK/XAC5AM7w67z7wANVx4Z3N8W+HsXEVeqRyi5oeA7AhYF23/fbNlY/NNrxmcZV6llRdkHDGwCKGO'+
			'ZpI35AMgIY49aaY8mt634GinOBzN9UXADBBTD6O0OvszywpbZi8JW6pJYdd5V6bGUXNDwLTQS/17ax+uFkwiVL2QX117hKvTemKLpCAKylpKaV+AHjEcAYt9QsRYXnaqHC6wXwBcSKuNPp4Tfap9eNzwUwhfaZep1Du3y3dz9Q/ROMg6gIPgfggkC77+q2jalZFDQqfg+mIq5RmHbiB0xEAI2s8gikwuOEtpIMGbnIMSy2J9vtPhLHeMIbbJY9kEluZzr8yMPPsk/Rdch0+JE4JpD3kfAZuI6hXU394d1NRsuYuEo99qgIfgXA3vGGt8CZonisEAHMCbT77mjbWD3hL7ilg8kLIIfDmVKiIvhjWHzKYjoSaPd91rax+neZ9oPD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6H'+
			'w+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwMsb/B3AEWGekAXdSAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ok-instr-button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : -39px;';
		hs+='cursor : pointer;';
		hs+='height : 43px;';
		hs+='left : 80px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 122px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._okinstrbutton.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._okinstrbutton.onclick=function (e) {
			player.startAnimation("Animation01");
			me._music_banner.onclick.call(me._music_banner);
		}
		me._okinstrbutton.ggUpdatePosition=function (useTransition) {
		}
		me._instructionbox_mobile.appendChild(me._okinstrbutton);
		me._container_1.appendChild(me._instructionbox_mobile);
		me._banner.appendChild(me._container_1);
		me.divSkin.appendChild(me._banner);
		me.elementMouseOver['closebutton0']=false;
		me.elementMouseOver['closebutton']=false;
		me.elementMouseOver['socialfb']=false;
		me.elementMouseOver['socialtw']=false;
		me.elementMouseOver['socialvk']=false;
		me.elementMouseOver['socialok']=false;
		me.elementMouseOver['socialgp']=false;
		me.elementMouseOver['socialpinterest']=false;
		me.elementMouseOver['logomono']=false;
		if (player.transitionsDisabled) {
			me._panolist.style.transition='none';
		} else {
			me._panolist.style.transition='all 500ms ease-out 0ms';
		}
		me._panolist.style.opacity='0';
		me._panolist.style.visibility='hidden';
		if (player.transitionsDisabled) {
			me._loading_image.style.transition='none';
		} else {
			me._loading_image.style.transition='all 1000ms ease-out 0ms';
		}
		me._loading_image.ggParameter.a="100000000";
		me._loading_image.style.transform=parameterToTransform(me._loading_image.ggParameter);
		var clonedNormalElement = new SkinElement_active_menustop_Class(this,me._marker_node7);
		me._marker_node7__normal = clonedNormalElement._active_menustop;
		me._marker_node7__normalInst = clonedNormalElement;
		me._marker_node7__normal.style.visibility='inherit';
		me._marker_node7__normal.style.left='0px';
		me._marker_node7__normal.style.top='0px';
		me._marker_node7.ggMarkerNormal=me._marker_node7__normal;
		me._marker_node7.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._marker_node7);
		me._marker_node7__active = clonedActiveElement._active_menu_2;
		me._marker_node7__activeInst = clonedActiveElement;
		me._marker_node7__active.style.visibility='hidden';
		me._marker_node7__active.style.left='0px';
		me._marker_node7__active.style.top='0px';
		me._marker_node7.ggMarkerActive=me._marker_node7__active;
		me._marker_node7.ggMarkerInstances.push(clonedActiveElement);
		if (me._marker_node7.firstChild) {
			me._marker_node7.insertBefore(me._marker_node7__active,me._marker_node7.firstChild);
		} else {
			me._marker_node7.appendChild(me._marker_node7__active);
		}
		if (me._marker_node7.firstChild) {
			me._marker_node7.insertBefore(me._marker_node7__normal,me._marker_node7.firstChild);
		} else {
			me._marker_node7.appendChild(me._marker_node7__normal);
		}
		for (var i = 0; i < me._marker_node7.childNodes.length; i++) {
			me._marker_node7.ggMarkerInstances.push(me._marker_node7.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_active_menu_start_Class(this,me._marker_node6);
		me._marker_node6__normal = clonedNormalElement._active_menu_start;
		me._marker_node6__normalInst = clonedNormalElement;
		me._marker_node6__normal.style.visibility='inherit';
		me._marker_node6__normal.style.left='0px';
		me._marker_node6__normal.style.top='0px';
		me._marker_node6.ggMarkerNormal=me._marker_node6__normal;
		me._marker_node6.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._marker_node6);
		me._marker_node6__active = clonedActiveElement._active_menu_2;
		me._marker_node6__activeInst = clonedActiveElement;
		me._marker_node6__active.style.visibility='hidden';
		me._marker_node6__active.style.left='0px';
		me._marker_node6__active.style.top='0px';
		me._marker_node6.ggMarkerActive=me._marker_node6__active;
		me._marker_node6.ggMarkerInstances.push(clonedActiveElement);
		if (me._marker_node6.firstChild) {
			me._marker_node6.insertBefore(me._marker_node6__active,me._marker_node6.firstChild);
		} else {
			me._marker_node6.appendChild(me._marker_node6__active);
		}
		if (me._marker_node6.firstChild) {
			me._marker_node6.insertBefore(me._marker_node6__normal,me._marker_node6.firstChild);
		} else {
			me._marker_node6.appendChild(me._marker_node6__normal);
		}
		for (var i = 0; i < me._marker_node6.childNodes.length; i++) {
			me._marker_node6.ggMarkerInstances.push(me._marker_node6.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_normal_menu_2_Class(this,me._marker_node5);
		me._marker_node5__normal = clonedNormalElement._normal_menu_2;
		me._marker_node5__normalInst = clonedNormalElement;
		me._marker_node5__normal.style.visibility='inherit';
		me._marker_node5__normal.style.left='0px';
		me._marker_node5__normal.style.top='0px';
		me._marker_node5.ggMarkerNormal=me._marker_node5__normal;
		me._marker_node5.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._marker_node5);
		me._marker_node5__active = clonedActiveElement._active_menu_2;
		me._marker_node5__activeInst = clonedActiveElement;
		me._marker_node5__active.style.visibility='hidden';
		me._marker_node5__active.style.left='0px';
		me._marker_node5__active.style.top='0px';
		me._marker_node5.ggMarkerActive=me._marker_node5__active;
		me._marker_node5.ggMarkerInstances.push(clonedActiveElement);
		if (me._marker_node5.firstChild) {
			me._marker_node5.insertBefore(me._marker_node5__active,me._marker_node5.firstChild);
		} else {
			me._marker_node5.appendChild(me._marker_node5__active);
		}
		if (me._marker_node5.firstChild) {
			me._marker_node5.insertBefore(me._marker_node5__normal,me._marker_node5.firstChild);
		} else {
			me._marker_node5.appendChild(me._marker_node5__normal);
		}
		for (var i = 0; i < me._marker_node5.childNodes.length; i++) {
			me._marker_node5.ggMarkerInstances.push(me._marker_node5.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_normal_menu_2_Class(this,me._marker_node4);
		me._marker_node4__normal = clonedNormalElement._normal_menu_2;
		me._marker_node4__normalInst = clonedNormalElement;
		me._marker_node4__normal.style.visibility='inherit';
		me._marker_node4__normal.style.left='0px';
		me._marker_node4__normal.style.top='0px';
		me._marker_node4.ggMarkerNormal=me._marker_node4__normal;
		me._marker_node4.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._marker_node4);
		me._marker_node4__active = clonedActiveElement._active_menu_2;
		me._marker_node4__activeInst = clonedActiveElement;
		me._marker_node4__active.style.visibility='hidden';
		me._marker_node4__active.style.left='0px';
		me._marker_node4__active.style.top='0px';
		me._marker_node4.ggMarkerActive=me._marker_node4__active;
		me._marker_node4.ggMarkerInstances.push(clonedActiveElement);
		if (me._marker_node4.firstChild) {
			me._marker_node4.insertBefore(me._marker_node4__active,me._marker_node4.firstChild);
		} else {
			me._marker_node4.appendChild(me._marker_node4__active);
		}
		if (me._marker_node4.firstChild) {
			me._marker_node4.insertBefore(me._marker_node4__normal,me._marker_node4.firstChild);
		} else {
			me._marker_node4.appendChild(me._marker_node4__normal);
		}
		for (var i = 0; i < me._marker_node4.childNodes.length; i++) {
			me._marker_node4.ggMarkerInstances.push(me._marker_node4.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_normal_menu_2_Class(this,me._marker_node3);
		me._marker_node3__normal = clonedNormalElement._normal_menu_2;
		me._marker_node3__normalInst = clonedNormalElement;
		me._marker_node3__normal.style.visibility='inherit';
		me._marker_node3__normal.style.left='0px';
		me._marker_node3__normal.style.top='0px';
		me._marker_node3.ggMarkerNormal=me._marker_node3__normal;
		me._marker_node3.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._marker_node3);
		me._marker_node3__active = clonedActiveElement._active_menu_2;
		me._marker_node3__activeInst = clonedActiveElement;
		me._marker_node3__active.style.visibility='hidden';
		me._marker_node3__active.style.left='0px';
		me._marker_node3__active.style.top='0px';
		me._marker_node3.ggMarkerActive=me._marker_node3__active;
		me._marker_node3.ggMarkerInstances.push(clonedActiveElement);
		if (me._marker_node3.firstChild) {
			me._marker_node3.insertBefore(me._marker_node3__active,me._marker_node3.firstChild);
		} else {
			me._marker_node3.appendChild(me._marker_node3__active);
		}
		if (me._marker_node3.firstChild) {
			me._marker_node3.insertBefore(me._marker_node3__normal,me._marker_node3.firstChild);
		} else {
			me._marker_node3.appendChild(me._marker_node3__normal);
		}
		for (var i = 0; i < me._marker_node3.childNodes.length; i++) {
			me._marker_node3.ggMarkerInstances.push(me._marker_node3.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_normal_menu_2_Class(this,me._marker_node2);
		me._marker_node2__normal = clonedNormalElement._normal_menu_2;
		me._marker_node2__normalInst = clonedNormalElement;
		me._marker_node2__normal.style.visibility='inherit';
		me._marker_node2__normal.style.left='0px';
		me._marker_node2__normal.style.top='0px';
		me._marker_node2.ggMarkerNormal=me._marker_node2__normal;
		me._marker_node2.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._marker_node2);
		me._marker_node2__active = clonedActiveElement._active_menu_2;
		me._marker_node2__activeInst = clonedActiveElement;
		me._marker_node2__active.style.visibility='hidden';
		me._marker_node2__active.style.left='0px';
		me._marker_node2__active.style.top='0px';
		me._marker_node2.ggMarkerActive=me._marker_node2__active;
		me._marker_node2.ggMarkerInstances.push(clonedActiveElement);
		if (me._marker_node2.firstChild) {
			me._marker_node2.insertBefore(me._marker_node2__active,me._marker_node2.firstChild);
		} else {
			me._marker_node2.appendChild(me._marker_node2__active);
		}
		if (me._marker_node2.firstChild) {
			me._marker_node2.insertBefore(me._marker_node2__normal,me._marker_node2.firstChild);
		} else {
			me._marker_node2.appendChild(me._marker_node2__normal);
		}
		for (var i = 0; i < me._marker_node2.childNodes.length; i++) {
			me._marker_node2.ggMarkerInstances.push(me._marker_node2.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_normal_menu_2_Class(this,me._marker_node1);
		me._marker_node1__normal = clonedNormalElement._normal_menu_2;
		me._marker_node1__normalInst = clonedNormalElement;
		me._marker_node1__normal.style.visibility='inherit';
		me._marker_node1__normal.style.left='0px';
		me._marker_node1__normal.style.top='0px';
		me._marker_node1.ggMarkerNormal=me._marker_node1__normal;
		me._marker_node1.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._marker_node1);
		me._marker_node1__active = clonedActiveElement._active_menu_2;
		me._marker_node1__activeInst = clonedActiveElement;
		me._marker_node1__active.style.visibility='hidden';
		me._marker_node1__active.style.left='0px';
		me._marker_node1__active.style.top='0px';
		me._marker_node1.ggMarkerActive=me._marker_node1__active;
		me._marker_node1.ggMarkerInstances.push(clonedActiveElement);
		if (me._marker_node1.firstChild) {
			me._marker_node1.insertBefore(me._marker_node1__active,me._marker_node1.firstChild);
		} else {
			me._marker_node1.appendChild(me._marker_node1__active);
		}
		if (me._marker_node1.firstChild) {
			me._marker_node1.insertBefore(me._marker_node1__normal,me._marker_node1.firstChild);
		} else {
			me._marker_node1.appendChild(me._marker_node1__normal);
		}
		for (var i = 0; i < me._marker_node1.childNodes.length; i++) {
			me._marker_node1.ggMarkerInstances.push(me._marker_node1.childNodes[i]);
		}
		me.elementMouseOver['button_menu']=false;
		var clonedNormalElement = new SkinElement_normal_menu_2_Class(this,me._markertemplate);
		me._markertemplate__normal = clonedNormalElement._normal_menu_2;
		me._markertemplate__normalInst = clonedNormalElement;
		me._markertemplate__normal.style.visibility='inherit';
		me._markertemplate__normal.style.left='0px';
		me._markertemplate__normal.style.top='0px';
		me._markertemplate.ggMarkerNormal=me._markertemplate__normal;
		me._markertemplate.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_active_menu_2_Class(this,me._markertemplate);
		me._markertemplate__active = clonedActiveElement._active_menu_2;
		me._markertemplate__activeInst = clonedActiveElement;
		me._markertemplate__active.style.visibility='hidden';
		me._markertemplate__active.style.left='0px';
		me._markertemplate__active.style.top='0px';
		me._markertemplate.ggMarkerActive=me._markertemplate__active;
		me._markertemplate.ggMarkerInstances.push(clonedActiveElement);
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__active,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__active);
		}
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__normal,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__normal);
		}
		for (var i = 0; i < me._markertemplate.childNodes.length; i++) {
			me._markertemplate.ggMarkerInstances.push(me._markertemplate.childNodes[i]);
		}
		me.elementMouseOver['up']=false;
		me.elementMouseOver['down']=false;
		me.elementMouseOver['left']=false;
		me.elementMouseOver['right']=false;
		me.elementMouseOver['zoomin']=false;
		me.elementMouseOver['zoomout']=false;
		me.elementMouseOver['autorotate']=false;
		me.elementMouseOver['info']=false;
		me.elementMouseOver['movemode']=false;
		me.elementMouseOver['fullscreen']=false;
		me.elementMouseOver['unmute']=false;
		me._tt_unmute.logicBlock_position();
		me._tt_unmute.logicBlock_visible();
		me.elementMouseOver['mute']=false;
		me._tt_mute.logicBlock_position();
		me._tt_mute.logicBlock_visible();
		me.elementMouseOver['controller']=false;
		me.elementMouseOver['show_controller_button']=false;
		me._tt_show_controller.logicBlock_position();
		me._tt_show_controller.logicBlock_visible();
		me._url_hs_popup.logicBlock_visible();
		me.elementMouseOver['url_hs_popup_close']=false;
		me.elementMouseOver['music_banner']=false;
		me._instructionbox.logicBlock_visible();
		me._container_1.logicBlock_visible();
		player.addListener('activehotspotchanged', function(event) {
			if (hotspotTemplates.hasOwnProperty('ht_url_tulieuanhbac')) {
				for(var i = 0; i < hotspotTemplates['ht_url_tulieuanhbac'].length; i++) {
					hotspotTemplates['ht_url_tulieuanhbac'][i].ggEvent_activehotspotchanged();
				}
			}
		});
		player.addListener('beforechangenode', function(event) {
			if (player.transitionsDisabled) {
				me._loading_container.style.transition='none';
			} else {
				me._loading_container.style.transition='all 500ms ease-out 0ms';
			}
			me._loading_container.style.opacity='1';
			me._loading_container.style.visibility=me._loading_container.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._panolist.style.transition='none';
			} else {
				me._panolist.style.transition='all 500ms ease-out 0ms';
			}
			me._panolist.style.opacity='0';
			me._panolist.style.visibility='hidden';
		});
		player.addListener('changenode', function(event) {
			if (hotspotTemplates.hasOwnProperty('ht_url_tulieuanhbac')) {
				for(var i = 0; i < hotspotTemplates['ht_url_tulieuanhbac'].length; i++) {
					hotspotTemplates['ht_url_tulieuanhbac'][i].ggEvent_changenode();
				}
			}
			me._url_hs_popup.logicBlock_visible();
		});
		player.addListener('configloaded', function(event) {
			if (hotspotTemplates.hasOwnProperty('ht_url_tulieuanhbac')) {
				for(var i = 0; i < hotspotTemplates['ht_url_tulieuanhbac'].length; i++) {
					hotspotTemplates['ht_url_tulieuanhbac'][i].ggEvent_configloaded();
				}
			}
			me._tt_unmute.logicBlock_position();
			me._tt_mute.logicBlock_position();
			me._tt_show_controller.logicBlock_position();
			me._url_hs_popup.logicBlock_visible();
			me._instructionbox.logicBlock_visible();
			me._container_1.logicBlock_visible();
		});
		player.addListener('hastouch', function(event) {
			me._tt_unmute.logicBlock_position();
			me._tt_mute.logicBlock_position();
			me._tt_show_controller.logicBlock_position();
		});
		player.addListener('imagesready', function(event) {
			if (player.transitionsDisabled) {
				me._loading_container.style.transition='none';
			} else {
				me._loading_container.style.transition='all 500ms ease-out 0ms';
			}
			me._loading_container.style.opacity='0';
			me._loading_container.style.visibility='hidden';
			me._instructionbox.style.transition='none';
			me._instructionbox.ggParameter.rx=5080;me._instructionbox.ggParameter.ry=0;
			me._instructionbox.style.transform=parameterToTransform(me._instructionbox.ggParameter);
		});
		player.addListener('sizechanged', function(event) {
			me._variable_resp_phone.logicBlock();
			me._variable_resp_phone_1.logicBlock();
			me._instructionbox.logicBlock_visible();
		});
		player.addListener('varchanged_vis_url_hs_popup', function(event) {
			me._url_hs_popup.logicBlock_visible();
		});
	};
	function SkinElement_active_menustop_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeid=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._active_menustop=document.createElement('div');
		el.ggId="active_menu-stop";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #dc3545;';
		hs+='border : 1px solid #000000;';
		hs+='border-radius : 10px;';
		hs+='cursor : default;';
		hs+='height : 24px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._active_menustop.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._active_menustop.ggUpdatePosition=function (useTransition) {
		}
	};
	function SkinElement_active_menu_start_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeid=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._active_menu_start=document.createElement('div');
		el.ggId="active_menu_start";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #28a745;';
		hs+='border : 1px solid #000000;';
		hs+='border-radius : 10px;';
		hs+='cursor : default;';
		hs+='height : 24px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._active_menu_start.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._active_menu_start.ggUpdatePosition=function (useTransition) {
		}
	};
	function SkinElement_active_menu_2_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeid=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._active_menu_2=document.createElement('div');
		el.ggId="active_menu_2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #4da6ff;';
		hs+='border : 1px solid #000000;';
		hs+='border-radius : 10px;';
		hs+='cursor : default;';
		hs+='height : 24px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._active_menu_2.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._active_menu_2.ggUpdatePosition=function (useTransition) {
		}
	};
	function SkinElement_normal_menu_2_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeid=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._normal_menu_2=document.createElement('div');
		el.ggId="normal_menu_2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #f2f2f2;';
		hs+='border : 1px solid #000000;';
		hs+='border-radius : 10px;';
		hs+='cursor : pointer;';
		hs+='height : 24px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._normal_menu_2.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._normal_menu_2.ggUpdatePosition=function (useTransition) {
		}
	};
	function SkinHotspotClass_check_point_robot(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._check_point_robot=document.createElement('div');
		el.ggId="Check_Point_robot";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 114px;';
		hs+='position : absolute;';
		hs+='top : 192px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._check_point_robot.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._check_point_robot.onclick=function (e) {
			player.openUrl(player._(me.hotspot.url),"");
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_robot.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_robot.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['check_point_robot']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_robot.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['check_point_robot']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_robot.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_2=document.createElement('div');
		els=me._image_2__img=document.createElement('img');
		els.className='ggskin ggskin_image_2';
		hs='data:image/png;base64,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'+
			'FwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAA'+
			'AAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAA'+
			'gASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH8BAAAAAAAAEiD+AgAAAAAAACRA/AUAAAAAAABIgPgLAAAAAAAAkADxFwAAAAAAACAB4i8AAAAAAABAAsRfAAAAAAAAgASIvwAAAAAAAAAJEH'+
			'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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 47px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : -79px;';
		hs+='visibility : inherit;';
		hs+='width : 146px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._image_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_2.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_url_title_1=document.createElement('div');
		els=me._ht_url_title_1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="ht_url_title_1";
		el.ggDx=3;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'translate(-50%, -50%) ' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : calc(50% - ((0px + 0px) / 2) + 3px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((0px + 0px) / 2) - 1px);';
		hs+='transform : translate(-50%, -50%);;';
		hs+='visibility : inherit;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border : 0px solid #0000ff;';
		hs+='border-radius : 4px;';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._ht_url_title_1.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.hotspot.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._ht_url_title_1.ggUpdateText();
		player.addListener('changenode', function() {
			me._ht_url_title_1.ggUpdateText();
		});
		el.appendChild(els);
		me._ht_url_title_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_title_1.ggUpdatePosition=function (useTransition) {
		}
		me._image_2.appendChild(me._ht_url_title_1);
		me._check_point_robot.appendChild(me._image_2);
		el=me._external_1=document.createElement('div');
		els=me._external_1__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		hs ='';
		hs += 'position: absolute;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.onload=function() {me._external_1.ggUpdatePosition();}
		el.appendChild(els);
		el.ggSubElement = els;
		hs ='';
		el.ggAltText="";
		el.ggScrollbars=false;
		el.ggUpdateText = function() {
			me._external_1.ggSubElement.setAttribute('alt', player._(me._external_1.ggAltText));
			me._external_1.ggUpdateImageTranslation();
		}
		el.ggSetImage = function(img) {
			me._external_1.ggText_untranslated = img;
			me._external_1.ggUpdateImageTranslation();
		}
		el.ggUpdateImage = function() {
			me._external_1.ggSubElement.style.width = '0px';
			me._external_1.ggSubElement.style.height = '0px';
			me._external_1.ggSubElement.src='';
			me._external_1.ggSubElement.src=me._external_1.ggText;
		}
		el.ggUpdateImageTranslation = function() {
			if (me._external_1.ggText != player._(me._external_1.ggText_untranslated)) {
				me._external_1.ggText = player._(me._external_1.ggText_untranslated);
				me._external_1.ggUpdateImage()
			}
		}
		el.ggText=el.ggText_untranslated=basePath + "image/5435223234.gif";
		el.ggUpdateImage();
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.ggUpdateText();
		el.ggId="External 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0,sy:0,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='height : 20px;';
		hs+='left : -15px;';
		hs+='position : absolute;';
		hs+='top : -58px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		el.style.transform=parameterToTransform(el.ggParameter);
		me._external_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_1.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._external_1.clientWidth;
			var parentHeight = me._external_1.clientHeight;
			var img = me._external_1__img;
			var aspectRatioDiv = me._external_1.clientWidth / me._external_1.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = img.naturalWidth;
			currentHeight = img.naturalHeight;
			img.style.width = currentWidth + 'px';
			img.style.height = currentHeight + 'px';
			if (!me._external_1.ggScrollbars || currentWidth < me._external_1.clientWidth) {
				img.style.right='';
				img.style.left='50%';
				img.style.marginLeft='-' + currentWidth/2 + 'px';
			} else {
				img.style.right='';
				img.style.left='0px';
				img.style.marginLeft='0px';
				me._external_1.scrollLeft=currentWidth / 2 - me._external_1.clientWidth / 2;
			}
			if (!me._external_1.ggScrollbars || currentHeight < me._external_1.clientHeight) {
				img.style.bottom='';
				img.style.top='50%';
				img.style.marginTop='-' + currentHeight/2 + 'px';
			} else {
				img.style.bottom='';
				img.style.top='0px';
				img.style.marginTop='0px';
				me._external_1.scrollTop=currentHeight / 2 - me._external_1.clientHeight / 2;
			}
		}
		me._check_point_robot.appendChild(me._external_1);
		el=me._external_3=document.createElement('div');
		els=me._external_3__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		hs ='';
		hs += 'position: absolute;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.onload=function() {me._external_3.ggUpdatePosition();}
		el.appendChild(els);
		el.ggSubElement = els;
		hs ='';
		el.ggAltText="";
		el.ggScrollbars=false;
		el.ggUpdateText = function() {
			me._external_3.ggSubElement.setAttribute('alt', player._(me._external_3.ggAltText));
			me._external_3.ggUpdateImageTranslation();
		}
		el.ggSetImage = function(img) {
			me._external_3.ggText_untranslated = img;
			me._external_3.ggUpdateImageTranslation();
		}
		el.ggUpdateImage = function() {
			me._external_3.ggSubElement.style.width = '0px';
			me._external_3.ggSubElement.style.height = '0px';
			me._external_3.ggSubElement.src='';
			me._external_3.ggSubElement.src=me._external_3.ggText;
		}
		el.ggUpdateImageTranslation = function() {
			if (me._external_3.ggText != player._(me._external_3.ggText_untranslated)) {
				me._external_3.ggText = player._(me._external_3.ggText_untranslated);
				me._external_3.ggUpdateImage()
			}
		}
		el.ggText=el.ggText_untranslated=basePath + "images/5435223234.gif";
		el.ggUpdateImage();
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.ggUpdateText();
		el.ggId="External 3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='height : 10px;';
		hs+='left : -10px;';
		hs+='position : absolute;';
		hs+='top : -9px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		el.style.transform=parameterToTransform(el.ggParameter);
		me._external_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_3.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._external_3.clientWidth;
			var parentHeight = me._external_3.clientHeight;
			var img = me._external_3__img;
			var aspectRatioDiv = me._external_3.clientWidth / me._external_3.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = img.naturalWidth;
			currentHeight = img.naturalHeight;
			img.style.width = currentWidth + 'px';
			img.style.height = currentHeight + 'px';
			if (!me._external_3.ggScrollbars || currentWidth < me._external_3.clientWidth) {
				img.style.right='';
				img.style.left='50%';
				img.style.marginLeft='-' + currentWidth/2 + 'px';
			} else {
				img.style.right='';
				img.style.left='0px';
				img.style.marginLeft='0px';
				me._external_3.scrollLeft=currentWidth / 2 - me._external_3.clientWidth / 2;
			}
			if (!me._external_3.ggScrollbars || currentHeight < me._external_3.clientHeight) {
				img.style.bottom='';
				img.style.top='50%';
				img.style.marginTop='-' + currentHeight/2 + 'px';
			} else {
				img.style.bottom='';
				img.style.top='0px';
				img.style.marginTop='0px';
				me._external_3.scrollTop=currentHeight / 2 - me._external_3.clientHeight / 2;
			}
		}
		me._check_point_robot.appendChild(me._external_3);
		el=me._button_2=document.createElement('div');
		els=me._button_2__img=document.createElement('img');
		els.className='ggskin ggskin_button_2';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABZCAYAAADB7SFdAAAA2klEQVR4nO3RQREAIAzAMMC/501GHjQKetc7MyfO0wG/awDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoAtG/YDrwFkFhYAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 104px;';
		hs+='left : -42px;';
		hs+='position : absolute;';
		hs+='top : -87px;';
		hs+='visibility : inherit;';
		hs+='width : 83px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._button_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._button_2.ggUpdatePosition=function (useTransition) {
		}
		me._check_point_robot.appendChild(me._button_2);
		me.elementMouseOver['check_point_robot']=false;
			me.__div = me._check_point_robot;
	};
	function SkinHotspotClass_ht_url_tulieuanhbac(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_url_tulieuanhbac=document.createElement('div');
		el.ggId="ht_url_tulieuanhbac";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 362px;';
		hs+='position : absolute;';
		hs+='top : 270px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._ht_url_tulieuanhbac.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_url_tulieuanhbac.onclick=function (e) {
			if (
				(
					((player.getVariableValue('opt_url_popup') == false)) || 
					((player.getVariableValue('resp_phone') == true))
				)
			) {
				player.openUrl(player._(me.hotspot.url),"_blank");
			}
			if (
				(
					((player.getVariableValue('opt_url_popup') == true)) && 
					((player.getVariableValue('resp_phone') == false))
				)
			) {
					skin._url_hs_popup_title.ggUpdateText=function() {
						var params = [];
						params.push(String(player._(me.hotspot.title)));
						var hs = player._("%1", params);
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				skin._url_hs_popup_title.ggUpdateText();
				skin._url_hs_popup_title.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('opt_url_popup') == true)) && 
					((player.getVariableValue('resp_phone') == false))
				)
			) {
					skin._url_hs_popup_iframe.ggUpdateText=function() {
						var params = [];
						params.push(String(player._(me.hotspot.url)));
						var hs = player._("<iframe src=\"%1\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\" ><\/iframe>", params);
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				skin._url_hs_popup_iframe.ggUpdateText();
				skin._url_hs_popup_iframe.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('opt_url_popup') == true)) && 
					((player.getVariableValue('resp_phone') == false))
				)
			) {
				player.setVariableValue('vis_url_hs_popup', true);
			}
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_url_tulieuanhbac.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_url_tulieuanhbac.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_url_tulieuanhbac']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_url_tulieuanhbac.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_url_tulieuanhbac']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_url_tulieuanhbac.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_url_custom_image=document.createElement('div');
		els=me._ht_url_custom_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		hs ='';
		hs += 'position: absolute;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.onload=function() {me._ht_url_custom_image.ggUpdatePosition();}
		el.appendChild(els);
		el.ggSubElement = els;
		hs ='';
		el.ggAltText="";
		el.ggScrollbars=false;
		el.ggUpdateText = function() {
			me._ht_url_custom_image.ggSubElement.setAttribute('alt', player._(me._ht_url_custom_image.ggAltText));
			me._ht_url_custom_image.ggUpdateImageTranslation();
		}
		el.ggSetImage = function(img) {
			me._ht_url_custom_image.ggText_untranslated = img;
			me._ht_url_custom_image.ggUpdateImageTranslation();
		}
		el.ggUpdateImage = function() {
			me._ht_url_custom_image.ggSubElement.style.width = '0px';
			me._ht_url_custom_image.ggSubElement.style.height = '0px';
			me._ht_url_custom_image.ggSubElement.src='';
			me._ht_url_custom_image.ggSubElement.src=me._ht_url_custom_image.ggText;
		}
		el.ggUpdateImageTranslation = function() {
			if (me._ht_url_custom_image.ggText != player._(me._ht_url_custom_image.ggText_untranslated)) {
				me._ht_url_custom_image.ggText = player._(me._ht_url_custom_image.ggText_untranslated);
				me._ht_url_custom_image.ggUpdateImage()
			}
		}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=el.ggText_untranslated=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.ggUpdateText();
		el.ggId="ht_url_custom_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : calc(50% - ((50px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((50px + 0px) / 2) + 0px);';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._ht_url_custom_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_custom_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url_custom_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url_custom_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url_custom_image.style.transition='';
				if (me._ht_url_custom_image.ggCurrentLogicStateVisible == 0) {
					me._ht_url_custom_image.style.visibility=(Number(me._ht_url_custom_image.style.opacity)>0||!me._ht_url_custom_image.style.opacity)?'inherit':'hidden';
					me._ht_url_custom_image.ggSubElement.src=me._ht_url_custom_image.ggText;
					me._ht_url_custom_image.ggVisible=true;
				}
				else {
					me._ht_url_custom_image.style.visibility="hidden";
					me._ht_url_custom_image.ggSubElement.src='';
					me._ht_url_custom_image.ggVisible=false;
				}
			}
		}
		me._ht_url_custom_image.logicBlock_visible();
		me._ht_url_custom_image.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_url_custom_image.clientWidth;
			var parentHeight = me._ht_url_custom_image.clientHeight;
			var img = me._ht_url_custom_image__img;
			var aspectRatioDiv = me._ht_url_custom_image.clientWidth / me._ht_url_custom_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			if (!me._ht_url_custom_image.ggScrollbars || currentWidth < me._ht_url_custom_image.clientWidth) {
				img.style.right='';
				img.style.left='50%';
				img.style.marginLeft='-' + currentWidth/2 + 'px';
			} else {
				img.style.right='';
				img.style.left='0px';
				img.style.marginLeft='0px';
				me._ht_url_custom_image.scrollLeft=currentWidth / 2 - me._ht_url_custom_image.clientWidth / 2;
			}
			if (!me._ht_url_custom_image.ggScrollbars || currentHeight < me._ht_url_custom_image.clientHeight) {
				img.style.bottom='';
				img.style.top='50%';
				img.style.marginTop='-' + currentHeight/2 + 'px';
			} else {
				img.style.bottom='';
				img.style.top='0px';
				img.style.marginTop='0px';
				me._ht_url_custom_image.scrollTop=currentHeight / 2 - me._ht_url_custom_image.clientHeight / 2;
			}
		}
		me._ht_url_tulieuanhbac.appendChild(me._ht_url_custom_image);
		el=me._ht_url_bg=document.createElement('div');
		el.ggId="ht_url_bg";
		el.ggDx=1;
		el.ggDy=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'background-clip : padding-box;';
		hs+='background-clip : padding-box;';
		hs+='border : 0px solid rgba(0,0,0,0);';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : calc(50% - ((20px + 0px) / 2) + 1px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((20px + 0px) / 2) + 1px);';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._ht_url_bg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url_bg.style.transition='background-color 0s';
				if (me._ht_url_bg.ggCurrentLogicStateVisible == 0) {
					me._ht_url_bg.style.visibility="hidden";
					me._ht_url_bg.ggVisible=false;
				}
				else {
					me._ht_url_bg.style.visibility=(Number(me._ht_url_bg.style.opacity)>0||!me._ht_url_bg.style.opacity)?'inherit':'hidden';
					me._ht_url_bg.ggVisible=true;
				}
			}
		}
		me._ht_url_bg.logicBlock_visible();
		me._ht_url_bg.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['ht_url_bg'] == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._ht_url_bg.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._ht_url_bg.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._ht_url_bg.style.transition='background-color 0s';
				if (me._ht_url_bg.ggCurrentLogicStateBackgroundColor == 0) {
					me._ht_url_bg.style.backgroundColor="rgba(77,77,77,1)";
				}
				else {
					me._ht_url_bg.style.backgroundColor="rgba(61,61,61,0)";
				}
			}
		}
		me._ht_url_bg.logicBlock_backgroundcolor();
		me._ht_url_bg.onmouseenter=function (e) {
			me.elementMouseOver['ht_url_bg']=true;
			me._ht_url_bg.logicBlock_backgroundcolor();
		}
		me._ht_url_bg.onmouseleave=function (e) {
			me.elementMouseOver['ht_url_bg']=false;
			me._ht_url_bg.logicBlock_backgroundcolor();
		}
		me._ht_url_bg.ggUpdatePosition=function (useTransition) {
		}
		el=me._external_3_1=document.createElement('div');
		els=me._external_3_1__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		hs ='';
		hs += 'position: absolute;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.onload=function() {me._external_3_1.ggUpdatePosition();}
		el.appendChild(els);
		el.ggSubElement = els;
		hs ='';
		el.ggAltText="";
		el.ggScrollbars=false;
		el.ggUpdateText = function() {
			me._external_3_1.ggSubElement.setAttribute('alt', player._(me._external_3_1.ggAltText));
			me._external_3_1.ggUpdateImageTranslation();
		}
		el.ggSetImage = function(img) {
			me._external_3_1.ggText_untranslated = img;
			me._external_3_1.ggUpdateImageTranslation();
		}
		el.ggUpdateImage = function() {
			me._external_3_1.ggSubElement.style.width = '0px';
			me._external_3_1.ggSubElement.style.height = '0px';
			me._external_3_1.ggSubElement.src='';
			me._external_3_1.ggSubElement.src=me._external_3_1.ggText;
		}
		el.ggUpdateImageTranslation = function() {
			if (me._external_3_1.ggText != player._(me._external_3_1.ggText_untranslated)) {
				me._external_3_1.ggText = player._(me._external_3_1.ggText_untranslated);
				me._external_3_1.ggUpdateImage()
			}
		}
		el.ggText=el.ggText_untranslated=basePath + "images/fa.gif";
		el.ggUpdateImage();
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.ggUpdateText();
		el.ggId="External 3_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='height : 20px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		el.style.transform=parameterToTransform(el.ggParameter);
		me._external_3_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_3_1.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._external_3_1.clientWidth;
			var parentHeight = me._external_3_1.clientHeight;
			var img = me._external_3_1__img;
			var aspectRatioDiv = me._external_3_1.clientWidth / me._external_3_1.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = img.naturalWidth;
			currentHeight = img.naturalHeight;
			img.style.width = currentWidth + 'px';
			img.style.height = currentHeight + 'px';
			if (!me._external_3_1.ggScrollbars || currentWidth < me._external_3_1.clientWidth) {
				img.style.right='';
				img.style.left='50%';
				img.style.marginLeft='-' + currentWidth/2 + 'px';
			} else {
				img.style.right='';
				img.style.left='0px';
				img.style.marginLeft='0px';
				me._external_3_1.scrollLeft=currentWidth / 2 - me._external_3_1.clientWidth / 2;
			}
			if (!me._external_3_1.ggScrollbars || currentHeight < me._external_3_1.clientHeight) {
				img.style.bottom='';
				img.style.top='50%';
				img.style.marginTop='-' + currentHeight/2 + 'px';
			} else {
				img.style.bottom='';
				img.style.top='0px';
				img.style.marginTop='0px';
				me._external_3_1.scrollTop=currentHeight / 2 - me._external_3_1.clientHeight / 2;
			}
		}
		me._ht_url_bg.appendChild(me._external_3_1);
		me._ht_url_tulieuanhbac.appendChild(me._ht_url_bg);
		var roomPointNumber=parseInt(String(hotspot.id).replace('Point',''),10);
		var isDayCRoomLabel=roomPointNumber==7 || (roomPointNumber>=20 && roomPointNumber<=60);
		el=me._ht_url_title=document.createElement('div');
		els=me._ht_url_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="ht_url_title";
		el.ggDx=isDayCRoomLabel?26:3;
		el.ggDy=isDayCRoomLabel?0:-46;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:isDayCRoomLabel?'translate(0, -50%) ':'translate(-50%, -50%) ' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='color : rgba(0,0,255,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		if (isDayCRoomLabel) {
			hs+='left : calc(50% + 26px);';
		} else {
			hs+='left : calc(50% - ((0px + 2px) / 2) + 3px);';
		}
		hs+='position : absolute;';
		if (isDayCRoomLabel) {
			hs+='top : 50%;';
			hs+='transform : translate(0, -50%);';
		} else {
			hs+='top : calc(50% - ((0px + 2px) / 2) - 46px);';
			hs+='transform : translate(-50%, -50%);;';
		}
		hs+='visibility : inherit;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #0000ff;';
		hs+='border-radius : 5px;';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._ht_url_title.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.hotspot.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._ht_url_title.ggUpdateText();
		player.addListener('changenode', function() {
			me._ht_url_title.ggUpdateText();
		});
		el.appendChild(els);
		me._ht_url_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_title.ggUpdatePosition=function (useTransition) {
		}
		me._ht_url_tulieuanhbac.appendChild(me._ht_url_title);
		me.elementMouseOver['ht_url_tulieuanhbac']=false;
		if ((hotspot) && (hotspot.customimage)) {
			me._ht_url_custom_image.style.width=hotspot.customimagewidth + 'px';
			me._ht_url_custom_image.style.height=hotspot.customimageheight + 'px';
			let d = 0;
			me._ht_url_custom_image.style.left='calc(50% - ' + ((hotspot.customimagewidth)/2 + 0) +'px' + ((d<0) ? ' - ' : ' + ') + d + 'px)';
			d = 0;
			me._ht_url_custom_image.style.top='calc(50% - ' + ((hotspot.customimageheight)/2 + 0) +'px' + ((d<0) ? ' - ' : ' + ') + d + 'px)';
		}
		me._ht_url_custom_image.logicBlock_visible();
		me._ht_url_bg.logicBlock_visible();
		me._ht_url_bg.logicBlock_backgroundcolor();
		me.elementMouseOver['ht_url_bg']=false;
			me.ggEvent_activehotspotchanged=function() {
				me._ht_url_custom_image.logicBlock_visible();
				me._ht_url_bg.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_url_custom_image.logicBlock_visible();
				me._ht_url_bg.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_url_custom_image.logicBlock_visible();
				me._ht_url_bg.logicBlock_visible();
			};
			me.__div = me._ht_url_tulieuanhbac;
	};
	function SkinHotspotClass_check_point_main(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._check_point_main=document.createElement('div');
		el.ggId="Check_Point_Main";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 114px;';
		hs+='position : absolute;';
		hs+='top : 192px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._check_point_main.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._check_point_main.onclick=function (e) {
			player.openUrl(player._(me.hotspot.url),"");
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_main.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_main.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['check_point_main']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_main.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['check_point_main']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._check_point_main.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_url_title_10=document.createElement('div');
		els=me._ht_url_title_10__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="ht_url_title_1";
		el.ggDx=-5;
		el.ggDy=-49;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'translate(-50%, -50%) ' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='color : rgba(0,0,255,1);';
		hs+='cursor : default;';
		hs+='height : auto;';
		hs+='left : calc(50% - ((0px + 2px) / 2) - 5px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((0px + 2px) / 2) - 49px);';
		hs+='transform : translate(-50%, -50%);;';
		hs+='visibility : inherit;';
		hs+='width : auto;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs ='';
		hs += 'box-sizing: border-box;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #0000ff;';
		hs+='border-radius : 4px;';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._ht_url_title_10.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.hotspot.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._ht_url_title_10.ggUpdateText();
		player.addListener('changenode', function() {
			me._ht_url_title_10.ggUpdateText();
		});
		el.appendChild(els);
		me._ht_url_title_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_title_10.ggUpdatePosition=function (useTransition) {
		}
		me._check_point_main.appendChild(me._ht_url_title_10);
		el=me._external_10=document.createElement('div');
		els=me._external_10__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		hs ='';
		hs += 'position: absolute;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.onload=function() {me._external_10.ggUpdatePosition();}
		el.appendChild(els);
		el.ggSubElement = els;
		hs ='';
		el.ggAltText="";
		el.ggScrollbars=false;
		el.ggUpdateText = function() {
			me._external_10.ggSubElement.setAttribute('alt', player._(me._external_10.ggAltText));
			me._external_10.ggUpdateImageTranslation();
		}
		el.ggSetImage = function(img) {
			me._external_10.ggText_untranslated = img;
			me._external_10.ggUpdateImageTranslation();
		}
		el.ggUpdateImage = function() {
			me._external_10.ggSubElement.style.width = '0px';
			me._external_10.ggSubElement.style.height = '0px';
			me._external_10.ggSubElement.src='';
			me._external_10.ggSubElement.src=me._external_10.ggText;
		}
		el.ggUpdateImageTranslation = function() {
			if (me._external_10.ggText != player._(me._external_10.ggText_untranslated)) {
				me._external_10.ggText = player._(me._external_10.ggText_untranslated);
				me._external_10.ggUpdateImage()
			}
		}
		el.ggText=el.ggText_untranslated=basePath + "assets/poppop-unscreen.gif";
		el.ggUpdateImage();
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.ggUpdateText();
		el.ggId="External 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0,sy:0,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='height : 20px;';
		hs+='left : -15px;';
		hs+='position : absolute;';
		hs+='top : -58px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		el.style.transform=parameterToTransform(el.ggParameter);
		me._external_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_10.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._external_10.clientWidth;
			var parentHeight = me._external_10.clientHeight;
			var img = me._external_10__img;
			var aspectRatioDiv = me._external_10.clientWidth / me._external_10.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = img.naturalWidth;
			currentHeight = img.naturalHeight;
			img.style.width = currentWidth + 'px';
			img.style.height = currentHeight + 'px';
			if (!me._external_10.ggScrollbars || currentWidth < me._external_10.clientWidth) {
				img.style.right='';
				img.style.left='50%';
				img.style.marginLeft='-' + currentWidth/2 + 'px';
			} else {
				img.style.right='';
				img.style.left='0px';
				img.style.marginLeft='0px';
				me._external_10.scrollLeft=currentWidth / 2 - me._external_10.clientWidth / 2;
			}
			if (!me._external_10.ggScrollbars || currentHeight < me._external_10.clientHeight) {
				img.style.bottom='';
				img.style.top='50%';
				img.style.marginTop='-' + currentHeight/2 + 'px';
			} else {
				img.style.bottom='';
				img.style.top='0px';
				img.style.marginTop='0px';
				me._external_10.scrollTop=currentHeight / 2 - me._external_10.clientHeight / 2;
			}
		}
		me._check_point_main.appendChild(me._external_10);
		el=me._external_30=document.createElement('div');
		els=me._external_30__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		hs ='';
		hs += 'position: absolute;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.onload=function() {me._external_30.ggUpdatePosition();}
		el.appendChild(els);
		el.ggSubElement = els;
		hs ='';
		el.ggAltText="";
		el.ggScrollbars=false;
		el.ggUpdateText = function() {
			me._external_30.ggSubElement.setAttribute('alt', player._(me._external_30.ggAltText));
			me._external_30.ggUpdateImageTranslation();
		}
		el.ggSetImage = function(img) {
			me._external_30.ggText_untranslated = img;
			me._external_30.ggUpdateImageTranslation();
		}
		el.ggUpdateImage = function() {
			me._external_30.ggSubElement.style.width = '0px';
			me._external_30.ggSubElement.style.height = '0px';
			me._external_30.ggSubElement.src='';
			me._external_30.ggSubElement.src=me._external_30.ggText;
		}
		el.ggUpdateImageTranslation = function() {
			if (me._external_30.ggText != player._(me._external_30.ggText_untranslated)) {
				me._external_30.ggText = player._(me._external_30.ggText_untranslated);
				me._external_30.ggUpdateImage()
			}
		}
		el.ggText=el.ggText_untranslated=basePath + "images/1709510073481.gif";
		el.ggUpdateImage();
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.ggUpdateText();
		el.ggId="External 3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='height : 10px;';
		hs+='left : -10px;';
		hs+='position : absolute;';
		hs+='top : -9px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		el.style.transform=parameterToTransform(el.ggParameter);
		me._external_30.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._external_30.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._external_30.clientWidth;
			var parentHeight = me._external_30.clientHeight;
			var img = me._external_30__img;
			var aspectRatioDiv = me._external_30.clientWidth / me._external_30.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = img.naturalWidth;
			currentHeight = img.naturalHeight;
			img.style.width = currentWidth + 'px';
			img.style.height = currentHeight + 'px';
			if (!me._external_30.ggScrollbars || currentWidth < me._external_30.clientWidth) {
				img.style.right='';
				img.style.left='50%';
				img.style.marginLeft='-' + currentWidth/2 + 'px';
			} else {
				img.style.right='';
				img.style.left='0px';
				img.style.marginLeft='0px';
				me._external_30.scrollLeft=currentWidth / 2 - me._external_30.clientWidth / 2;
			}
			if (!me._external_30.ggScrollbars || currentHeight < me._external_30.clientHeight) {
				img.style.bottom='';
				img.style.top='50%';
				img.style.marginTop='-' + currentHeight/2 + 'px';
			} else {
				img.style.bottom='';
				img.style.top='0px';
				img.style.marginTop='0px';
				me._external_30.scrollTop=currentHeight / 2 - me._external_30.clientHeight / 2;
			}
		}
		me._check_point_main.appendChild(me._external_30);
		el=me._button_20=document.createElement('div');
		els=me._button_20__img=document.createElement('img');
		els.className='ggskin ggskin_button_20';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABZCAYAAADB7SFdAAAA2klEQVR4nO3RQREAIAzAMMC/501GHjQKetc7MyfO0wG/awDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoAtG/YDrwFkFhYAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 104px;';
		hs+='left : -42px;';
		hs+='position : absolute;';
		hs+='top : -87px;';
		hs+='visibility : inherit;';
		hs+='width : 83px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._button_20.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._button_20.ggUpdatePosition=function (useTransition) {
		}
		me._check_point_main.appendChild(me._button_20);
		me.elementMouseOver['check_point_main']=false;
			me.__div = me._check_point_main;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
			if (hotspot.skinid=='Check_Point_Main') {
				hotspot.skinid = 'Check_Point_Main';
				hsinst = new SkinHotspotClass_check_point_main(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
			if (hotspot.skinid=='ht_url_tulieuanhbac') {
				hotspot.skinid = 'ht_url_tulieuanhbac';
				hsinst = new SkinHotspotClass_ht_url_tulieuanhbac(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		{
				hotspot.skinid = 'Check_Point_robot';
				hsinst = new SkinHotspotClass_check_point_robot(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		if (hsinst) me.applyDayCRoomHotspotVisibility(hsinst);
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = {};
	}
	player.addListener('hotspotsremoved',function() {
			me.removeSkinHotspots();
	});
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
		var newMarker=[];
		var id=player.getCurrentNode();
		var i,j;
		var tags=me.ggUserdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId.length > 0) && (nodeMarker[i].ggMarkerNodeId.charAt(0)=='{') && (nodeMarker[i].ggMarkerNodeId.substr(1, nodeMarker[i].ggMarkerNodeId.length - 2)==id) && (id!='')) match=true;
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
				activeNodeMarker[i].ggIsMarkerActive=false;
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
				newMarker[i].ggIsMarkerActive=true;
			}
		}
		activeNodeMarker=newMarker;
	});
	me.skinTimerEvent=function() {
		if (player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
		var hs='';
		if (me._radarbeam.ggParameter) {
			hs+=parameterToTransform(me._radarbeam.ggParameter) + ' ';
		}
		hs+='rotate(' + (-1.0*(1 * player.getPanNorth() + 0)) + 'deg) ';
		hs+='scale(' + (Math.tan(player.getHFov()/2.0*Math.PI/180.0)*1 + 0) + ',1.0) ';
		hs+='scale(1.0,' + (Math.cos(1*player.getTilt()*Math.PI/180.0 + 0)) + ') ';
		me._radarbeam.style.transform=hs;
		me._socialfb.ggUpdateConditionTimer();
		me._socialtw.ggUpdateConditionTimer();
		me._socialvk.ggUpdateConditionTimer();
		me._socialok.ggUpdateConditionTimer();
		me._socialgp.ggUpdateConditionTimer();
		me._socialpinterest.ggUpdateConditionTimer();
		me._logomono.ggUpdateConditionTimer();
		me._up.ggUpdateConditionTimer();
		me._down.ggUpdateConditionTimer();
		me._left.ggUpdateConditionTimer();
		me._right.ggUpdateConditionTimer();
		me._zoomin.ggUpdateConditionTimer();
		me._zoomout.ggUpdateConditionTimer();
		me._controller.ggUpdateConditionTimer();
		if (me._hide_timer.ggLastIsActive!=me._hide_timer.ggIsActive()) {
			me._hide_timer.ggLastIsActive=me._hide_timer.ggIsActive();
			if (me._hide_timer.ggLastIsActive) {
				if (player.transitionsDisabled) {
					me._controller0.style.transition='none';
				} else {
					me._controller0.style.transition='all 500ms ease-out 0ms';
				}
				me._controller0.style.opacity='1';
				me._controller0.style.visibility=me._controller0.ggVisible?'inherit':'hidden';
				if (player.transitionsDisabled) {
					me._show_controller_button.style.transition='none';
				} else {
					me._show_controller_button.style.transition='all 500ms ease-out 0ms';
				}
				me._show_controller_button.style.opacity='0';
				me._show_controller_button.style.visibility='hidden';
			} else {
				if (player.transitionsDisabled) {
					me._show_controller_button.style.transition='none';
				} else {
					me._show_controller_button.style.transition='all 500ms ease-out 0ms';
				}
				me._show_controller_button.style.opacity='1';
				me._show_controller_button.style.visibility=me._show_controller_button.ggVisible?'inherit':'hidden';
				if (player.transitionsDisabled) {
					me._controller0.style.transition='none';
				} else {
					me._controller0.style.transition='all 500ms ease-out 0ms';
				}
				me._controller0.style.opacity='0';
				me._controller0.style.visibility='hidden';
			}
		}
		for (const id in hotspotTemplates) {
			const tmpl=hotspotTemplates[id];
			tmpl.forEach(function(hotspot) {
				if (hotspot.hotspotTimerEvent) {
					hotspot.hotspotTimerEvent();
				}
			});
		};
	};
	player.addListener('timer', me.skinTimerEvent);
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: normal; } .ggmarkdown p,.ggmarkdown h1,.ggmarkdown h2,.ggmarkdown h3,.ggmarkdown h4 { margin-top: 0px } .ggmarkdown { white-space:normal }'));
	document.head.appendChild(style);
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onclick) activeElement.onclick();
		}
	});
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmousedown) activeElement.onmousedown();
		}
	});
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmouseup) activeElement.onmouseup();
		}
	});
	me.skinTimerEvent();
	document.fonts.onloadingdone = () => {
		me.updateSize(me.divSkin);
	}
};
