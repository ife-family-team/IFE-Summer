window.onload = function(){
	//ÔËÐÐÆÙ²¼Á÷Ö÷º¯Êý
	PBL('wrap','box');
	
	//Ä£ÄâÊý¾Ý
	var data = [{'src':'1.jpg','title':'This is a title.'},{'src':'2.jpg','title':'This is a title.'},{'src':'3.jpg','title':'This is a title.'},{'src':'4.jpg','title':'This is a title.'},{'src':'5.jpg','title':'This is a title.'},{'src':'6.jpg','title':'This is a title.'},{'src':'7.jpg','title':'This is a title.'},{'src':'8.jpg','title':'This is a title.'},{'src':'9.jpg','title':'This is a title.'},{'src':'10.jpg','title':'This is a title.'}];
	
	
	//ÉèÖÃ¹ö¶¯¼ÓÔØ
	window.onscroll = function(){
		//Ð£ÑéÊý¾ÝÇëÇó
		if(getCheck()){
			var wrap = document.getElementById('wrap');
			for(i in data){
				//´´½¨box
				var box = document.createElement('div');
				box.className = 'box';
				wrap.appendChild(box);
				//´´½¨info
				var info = document.createElement('div');
				info.className = 'info';
				box.appendChild(info);
				//´´½¨pic
				var pic = document.createElement('div');
				pic.className = 'pic';
				info.appendChild(pic);
				//´´½¨img
				var img = document.createElement('img');
				img.src = '../images/'+data[i].src;
				img.style.height = 'auto';
				pic.appendChild(img);
				//´´½¨title
				var title = document.createElement('div');
				title.className = 'title';
				info.appendChild(title);
				//´´½¨a±ê¼Ç
				var a = document.createElement('a');
				a.innerHTML = data[i].title;
				title.appendChild(a);
			}
			PBL('wrap','box');
		}
	}
}
/**
* ÆÙ²¼Á÷Ö÷º¯Êý
* @param  wrap	[Str] Íâ²ãÔªËØµÄID
* @param  box 	[Str] Ã¿Ò»¸öboxµÄÀàÃû
*/
function PBL(wrap,box){
	//	1.»ñµÃÍâ²ãÒÔ¼°Ã¿Ò»¸öbox
	var wrap = document.getElementById(wrap);
	var boxs  = getClass(wrap,box);
	//	2.»ñµÃÆÁÄ»¿ÉÏÔÊ¾µÄÁÐÊý
	var boxW = boxs[0].offsetWidth;
	var colsNum = Math.floor(document.documentElement.clientWidth/boxW);
	wrap.style.width = boxW*colsNum+'px';//ÎªÍâ²ã¸³Öµ¿í¶È
	//	3.Ñ­»·³öËùÓÐµÄbox²¢°´ÕÕÆÙ²¼Á÷ÅÅÁÐ
	var everyH = [];//¶¨ÒåÒ»¸öÊý×é´æ´¢Ã¿Ò»ÁÐµÄ¸ß¶È
	for (var i = 0; i < boxs.length; i++) {
		if(i<colsNum){
			everyH[i] = boxs[i].offsetHeight;
		}else{
			var minH = Math.min.apply(null,everyH);//»ñµÃ×îÐ¡µÄÁÐµÄ¸ß¶È
			var minIndex = getIndex(minH,everyH); //»ñµÃ×îÐ¡ÁÐµÄË÷Òý
			getStyle(boxs[i],minH,boxs[minIndex].offsetLeft,i);
			everyH[minIndex] += boxs[i].offsetHeight;//¸üÐÂ×îÐ¡ÁÐµÄ¸ß¶È
		}
	}
}
/**
* »ñÈ¡ÀàÔªËØ
* @param  warp		[Obj] Íâ²ã
* @param  className	[Str] ÀàÃû
*/
function getClass(wrap,className){
	var obj = wrap.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className == className){
			arr.push(obj[i]);
		}
	}
	return arr;
}
/**
* »ñÈ¡×îÐ¡ÁÐµÄË÷Òý
* @param  minH	 [Num] ×îÐ¡¸ß¶È
* @param  everyH [Arr] ËùÓÐÁÐ¸ß¶ÈµÄÊý×é
*/
function getIndex(minH,everyH){
	for(index in everyH){
		if (everyH[index] == minH ) return index;
	}
}
/**
* Êý¾ÝÇëÇó¼ìÑé
*/
function getCheck(){
	var documentH = document.documentElement.clientHeight;
	var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
	return documentH+scrollH>=getLastH() ?true:false;
}
/**
* »ñµÃ×îºóÒ»¸öboxËùÔÚÁÐµÄ¸ß¶È
*/
function getLastH(){
	var wrap = document.getElementById('wrap');
	var boxs = getClass(wrap,'box');
	return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
}
/**
* ÉèÖÃ¼ÓÔØÑùÊ½
* @param  box 	[obj] ÉèÖÃµÄBox
* @param  top 	[Num] boxµÄtopÖµ
* @param  left 	[Num] boxµÄleftÖµ
* @param  index [Num] boxµÄµÚ¼¸¸ö
*/
var getStartNum = 0;//ÉèÖÃÇëÇó¼ÓÔØµÄÌõÊýµÄÎ»ÖÃ
function getStyle(box,top,left,index){
    if (getStartNum>=index) return;
    $(box).css({
    	'position':'absolute',
        'top':top,
        "left":left,
        "opacity":"0"
    });
    $(box).stop().animate({
        "opacity":"1"
    },999);
    getStartNum = index;//¸üÐÂÇëÇóÊý¾ÝµÄÌõÊýÎ»ÖÃ
}