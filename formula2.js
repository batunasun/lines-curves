function cfs(s) {
var span_objs;
if (s) { span_objs=document.getElementById(s); 
		if (span_objs) span_objs=span_objs.getElementsByTagName('div'); 
			else span_objs=[]; }
	else span_objs=document.getElementsByTagName('div');
for (var j=0;j<span_objs.length;j++) {
	if (span_objs[j].className=='cf') { 
			var tmpobj=span_objs[j]; var nkgl=false;
			while (!nkgl) { 
				if (tmpobj.parentNode) tmpobj=tmpobj.parentNode; else nkgl=20;
				if (tmpobj.style) if (tmpobj.style.fontSize) if (tmpobj.style.fontSize=='16px') nkgl=16;
				}
		span_objs[j].className='cf_';
//		span_objs[j].title=span_objs[j].innerHTML;
		span_objs[j].style.whiteSpace='nowrap';
		span_objs[j].style.verticalAlign='baseline';
		span_objs[j].style.fontStyle='normal';
		span_objs[j].style.fontWeight='normal';
		span_objs[j].style.fontVariant='normal';
		test_obj=span_objs[j];
		var str=span_objs[j].innerHTML;
		c_level=0; if (nkgl!=kgl) set_kegl(nkgl);
		var arr=compile_it(str);
		if (full_width) {
			full_width=false;
			span_objs[j].style.width='100%';
			}
		span_objs[j].innerHTML=arr[0];
		if (recomp) { recomp=false; recomp_obj=span_objs[j]; 
			setTimeout('recomp_obj.innerHTML=\''+arr[0]+'\';',10); }
		} } ;
}

var disp_inl='display:inline-block;';
var kgl;
var big_f=1.44;
var index_size;
var index_f;
var kgl_d;
var kgl_h;
var math_axis;
var baselineskip;
var xheight;
var b_i_m=1; //for both_index
var wk=false;
var opera=false;
var mff=false; var mff_ubr;
var ie=false;
var recomp; recomp=false;
var recomp_obj;
var full_width=false;

function set_kegl(n) {
kgl=n;
index_size=Math.floor(13*kgl/20);
index_f=index_size/kgl;
kgl_d=kgl*518/2048;
kgl_h=kgl*1530/2048;
math_axis=Math.floor(kgl*506/2048);
baselineskip=1.2*kgl;
xheight=kgl*946/2048;
if (navigator.appVersion.indexOf('MSIE')>-1 || (navigator.userAgent.indexOf('Mozilla')>-1 && navigator.appVersion.indexOf('rv:11.0')>-1)) IE_detected();
if (navigator.appVersion.indexOf('WebKit')>-1) WebKit_detected();
if (navigator.userAgent.indexOf('Firefox')>-1) Firefox_detected();
if (navigator.userAgent.indexOf('Opera')>-1) Opera_detected();
}

function big(s) {
return '<font style="font-size:'+(kgl*big_f)+'px;line-height:1;">'+s+'</font>';
} ;

function IE_detected() {
b_i_m=1.8*kgl/16;
ie=true;
var str=navigator.appVersion;
if (str.indexOf('MSIE')>-1) {
str=str.substr(str.indexOf('MSIE')+5,str.length);
str=str.substr(0,str.indexOf(';'));
if (eval(str)<8.0) alert('Вы используете Internet Explorer версии '+str+'.\nВ версиях ниже 8.0 формулы могут отображаться некорретно');
if (eval(str)==10.0) { ieX=true; } }
else { ieX=true; ieXI=true; }
}

var ieX,ieXI;

function WebKit_detected() {
disp_inl='display:-webkit-inline-box;';
b_i_m=0;
wk=true;
}

function Firefox_detected() {
disp_inl='display:-moz-inline-box;';
b_i_m=1.8*kgl/16;
mff=true;
mff_ubr=false;
}

function Opera_detected() {
b_i_m=0;
opera=true;
}

var test_obj;

set_kegl(20);

function calc_width(s) {
test_obj.innerHTML='<div id="calc_width" style="position:fixed;padding:0;margin:0;border:0;">'+s+'</div>';
return document.getElementById('calc_width').clientWidth;
}

function calc_height(s) {
test_obj.innerHTML='<div id="calc_height" style="line-height:0;position:fixed;background-color:red;">'+s+'</div>';
return document.getElementById('calc_height').clientHeight;
}

var c_level=0;
var is_index=false;

function compile_it(str) {
c_level++; 
var arr=['',[-1,0,0],[0,0],str];
while (arr[3].length>0) arr=exec_token(arr);
c_level--;
return [arr[0],[0,arr[2][0],arr[2][1]],[arr[2][0],arr[2][1]],''];
}

function exec_token(arr) {
var _str=remove_spaces(arr[3]);
//
// FINITA LA COMEDIA
//
if (_str.length==0) return [arr[0],arr[1],arr[2],''];
//
// LITERAL COMMAND
//
var test_str=(/\\[a-z]+/i).exec(_str);
if (test_str) { test_str=test_str[0];
	if (_str.indexOf(test_str)==0)
		return exec_command(test_str,[arr[0],arr[1],arr[2],_str.substr(test_str.length,_str.length)]); 
	} ;
//
// DIGIT
//
var test_str=(/[0-9]/).exec(_str);
if (test_str) { test_str=test_str[0];
	if (_str.indexOf(test_str)==0)
		return exec_ord(test_str,[arr[0],arr[1],arr[2],_str.substr(test_str.length,_str.length)]); 
	} ;
//
// LETTER
//
var test_str=(/[a-z]/i).exec(_str);
if (test_str) { test_str=test_str[0];
	if (_str.indexOf(test_str)==0)
		return exec_ord(it_font_b+test_str+it_font_e,[arr[0],arr[1],arr[2],_str.substr(test_str.length,_str.length)]); 
	} ;
//
// SUBINDEX
//
if (_str.substr(0,1)=='_') return exec_sub([arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
//
// SUPINDEX
//
if (_str.substr(0,1)=='^') return exec_sup([arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
//
// GROUP
//
if (_str.substr(0,1)=='{') return get_group([arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='}') return [arr[0]+error('лишний конец группы'),arr[1],arr[2],''];
//
// NONLITERAL CHARACTERS
//
if (_str.substr(0,1)=='+') return exec_bin('+',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='-') return exec_bin('&minus;',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='=') return exec_rel('=',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='/') return exec_ord('/',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)==':') return exec_bin(':',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='(') return exec_open('(',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)==')') return exec_close(')',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='[') return exec_open('[',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)==']') return exec_close(']',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='!') return exec_ord('!',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)==',') return exec_punct(',',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)==';') return exec_punct(';',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='.') return exec_ord('.',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='?') return exec_ord('?',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='*') return exec_bin('&#x2217;',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='|') return exec_ord('|',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='\'') return exec_ordsup('<span style="margin-left:2px;">&prime;</span>',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='/') return exec_ord('/',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,1)=='~') return exec_ord('&nbsp;',[arr[0],arr[1],arr[2],_str.substr(1,_str.length)]);
if (_str.substr(0,5)=='&amp;') return [arr[0]+'</td><td>'+tabspace,[-1,0,0],[0,0],_str.substr(5,_str.length)];
if (_str.substr(0,1)=='&') return [arr[0]+'</td><td>'+tabspace,[-1,0,0],[0,0],_str.substr(1,_str.length)];
// '&'=\amp, '<'=\lt, '>'=\gt
//
// NONLITERAL COMMANDS
//
if (_str.substr(0,2)=='\\,') return exec_ord('&nbsp;',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\;') return exec_ord('&nbsp;',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\!') return [arr[0],[0,arr[1][1],arr[1][2]],arr[2],_str.substr(2,_str.length)];
if (_str.substr(0,2)=='\\{') return exec_open('{',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\}') return exec_close('}',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\#') return exec_ord('#',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\$') return exec_ord('$',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\%') return exec_ord('%',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\|') return exec_ord('&#x2016;',[arr[0],arr[1],arr[2],_str.substr(2,_str.length)]);
if (_str.substr(0,2)=='\\\\') { if (total_h==0) { total_h=arr[2][0]+v_padding; total_d=arr[2][1]+v_padding; last_d=arr[2][1]+v_padding; first_d=arr[2][1]+v_padding; } 
  else { total_d+=((arr[2][0]+arr[2][1]<=baselineskip)?baselineskip:arr[2][0]+arr[2][1])+2*v_padding; last_d=arr[2][1]+v_padding; }
return [arr[0]+'</div></td></tr><tr><td><div style=\"'+disp_inl+'\">',[-1,0,0],[0,0],_str.substr(2,_str.length)]; } ;
return [arr[0]+error('неизвестный токен'),arr[1],arr[2],''];
}

function remove_spaces(str) {
if (str) if ((str.substr(0,1)==' ')||(str.substr(0,1)=='\t')||(str.substr(0,1)=='\n')||(str.substr(0,1)=='\r'))
		return remove_spaces(str.substr(1,str.length)); else return str; else return '';
}

var it_font_b='<i>';
var it_font_e='</i>';
var v_padding=0;

function error(s) {
return ' <b style="color:red;">ОШИБКА'+((s)?': '+s:'')+'</b>';
}

var nbsp='&nbsp;';

var tabspace='&nbsp;&nbsp;&nbsp;';

// STATS:
// -1 начало формулы
// 0 после ord'а
// 1 после оператора
// 2 после отношения
// 3 после бинарной операции
// 4 после текстовой скобки (
// 5 после текстовой скобки )
// 6 после нижнего индекса
// 7 после верхнего индекса
// 8 после пунктуации
// 9 после \right
//10 после двойного индекса

function exec_ord(s,arr) {
var stat=arr[1][0];
var res=ordspace(stat)+s;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+res,[0,sh,sd],[fh,fd],arr[3]];
}

var saved_index;

function exec_sup(arr) {
var stat=arr[1][0];
if (stat==6) { var both=true; stat=saved_index[0][1][0]; } ;
var _nbsp=nbsp; nbsp='';
var _is_index=is_index; is_index=true;
var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
nbsp=_nbsp; is_index=_is_index;
var ind_str_t='<font style="font-size:'+index_size+'px; line-height:1;">'+arr1[0]+'</font>';
var ind_h=arr1[2][0];
var ind_d=arr1[2][1];
var move_=kgl_h*((is_index)?index_f:1)*(1-index_f)+(baselineskip-kgl)/2*((is_index)?index_f:1)+((true)?arr[1][1]-kgl_h*((is_index)?index_f:1):0);
if (move_-ind_d<math_axis*((is_index)?index_f:1)-3*kgl/16) move_=ind_d+math_axis*((is_index)?index_f:1)+1*kgl/16;
var sh=arr[1][1]; var ssh=ind_h+move_; if (ssh>sh) sh=ssh;
var sd=arr[1][2];
var ind_str='&zwj;<div style="'+disp_inl+'font-size:'+index_size+'px; vertical-align:'+move_+'px;line-height:1;margin-right:1px;">'+arr1[0]+'</div>';
if ((stat==7)||(stat==10)) return [''+arr[0]+error('два верхних индекса'),arr[1],arr[2],''];
if (saved_index) saved_index[2]=[ind_str,sh,sd];
if (both) return make_both_indexes(arr1[3]);
saved_index=[[arr[0],arr[1],arr[2],arr1[3]],['',0,0],[ind_str,sh,sd]];
var fh=arr[2][0];
var fd=arr[2][1];
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+ind_str,[7,sh,sd],[fh,fd],arr1[3]];
}

function exec_sub(arr) {
var stat=arr[1][0];
if (stat==7 || stat==70) { var both=true; stat=saved_index[0][1][0]; } ;
var _nbsp=nbsp; nbsp='';
var _is_index=is_index; is_index=true;
var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
nbsp=_nbsp; is_index=_is_index;
var ind_h=arr1[2][0];
var ind_d=arr1[2][1];
var move_=kgl_d*((is_index)?index_f:1)*(1-index_f)+(baselineskip-kgl)/2*((is_index)?index_f:1)+((true)?arr[1][2]-kgl_d*((is_index)?index_f:1):0);
if (ind_h-move_>math_axis*((is_index)?index_f:1)+3*kgl/16) move_=ind_h-math_axis*((is_index)?index_f:1)-1*kgl/16;
var sh=arr[1][1];
var sd=arr[1][2]; var ssd=ind_d+move_; if (ssd>sd) sd=ssd;
var ind_str='&zwj;<div style="'+disp_inl+'font-size:'+index_size+'px; vertical-align:'+(-move_)+'px;line-height:1;margin-right:1px;">'+arr1[0]+'</div>';
if ((stat==6)||(stat==10)) return [''+arr[0]+error('два нижних индекса'),arr[1],arr[2],''];
if (saved_index) saved_index[1]=[ind_str,sh,sd];
if (both) return make_both_indexes(arr1[3]);
saved_index=[[arr[0],arr[1],arr[2],arr1[3]],[ind_str,sh,sd],['',0,0]];
var fh=arr[2][0];
var fd=arr[2][1];
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+ind_str,[6,sh,sd],[fh,fd],arr1[3]];
}

function make_both_indexes(rest) {
var sub=saved_index[1][0];
var sup=saved_index[2][0];
var w_sub=calc_width(sub);
var w_sup=calc_width(sup);
var res;
if (w_sub>w_sup) 
	res='&zwj;<div style="'+disp_inl+'margin:0;padding:0;border:0;margin-right:'+(-w_sup)+'px;">'+sup+'</div>'+sub;
else 
	res='&zwj;<div style="'+disp_inl+'margin:0;padding:0;border:0;margin-right:'+(-w_sub)+'px;">'+sub+'</div>'+sup;
var sh=saved_index[0][1][1];
var sd=saved_index[0][1][2];
var fh=saved_index[0][2][0];
var fd=saved_index[0][2][1];
var bsh=saved_index[1][1];
var bsd=saved_index[1][2];
var psh=saved_index[2][1];
var psd=saved_index[2][2];
if (bsh>sh) sh=bsh; if (psh>sh) sh=psh;
if (bsd>sd) sd=bsd; if (psd>sd) sd=psd;
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [saved_index[0][0]+res,[10,sh,sd],[fh,fd],rest];
}

function exec_ordsup(s,arr) {
var stat=arr[1][0];
if (stat==6) { var both=true; stat=saved_index[0][1][0]; } ;
var move_=(wk)?arr[1][1]-xheight*((is_index)?index_f:1):arr[1][1]-kgl_h*((is_index)?index_f:1);
var ind_str='&zwj;<div style="'+disp_inl+' line-height:0; vertical-align:'+move_+'px;">'+s+'</div>';
if (both) { saved_index[2][0]+=ind_str; return make_both_indexes(arr[3]); } ;
if (stat==7) { saved_index[2][0]+=ind_str; 
	return [''+arr[0]+ind_str,[7,saved_index[0][1][1],saved_index[0][1][2]],saved_index[0][2],arr[3]]; } ;
if (stat==10) { saved_index[2][0]+=ind_str; return make_both_indexes(arr[3]); } ;
saved_index=[[arr[0],arr[1],arr[2],arr[3]],['',0,0],[ind_str,0,0]];
return [''+arr[0]+ind_str,[70,arr[1][1],arr[1][2]],arr[2],arr[3]];
}

function exec_bin(s,arr) {
var stat=arr[1][0];
var res=(((stat==-1)||(stat==4))?'':nbsp)+s;
var nstat=((stat==-1)||(stat==2)||(stat==4)||(stat==8))?0:3;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+res,[nstat,sh,sd],[fh,fd],arr[3]];
}

function exec_rel(s,arr) {
var stat=arr[1][0];
var res=(((stat==-1)||(stat==4)||(stat==8))?'':nbsp)+s;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;	
return [''+arr[0]+res,[2,sh,sd],[fh,fd],arr[3]];
}

function exec_open(s,arr) {
var stat=arr[1][0];
var res=(((stat==2)||(stat==3)||(stat==8))?nbsp:'')+s;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+res,[4,sh,sd],[fh,fd],arr[3]];
}

function exec_close(s,arr) {
var res=s;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+res,[5,sh,sd],[fh,fd],arr[3]];
}

function exec_op(s,arr) {
var stat=arr[1][0];
var res=(((stat==-1)||(stat==4))?'':nbsp)+s;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+res,[1,sh,sd],[fh,fd],arr[3]];
}

function exec_lop(s,off,arr) {
var stat=arr[1][0];
var res='&zwj;'+(((stat==-1)||(stat==4))?'':nbsp);
var fh=arr[2][0];
var fd=arr[2][1];
var str1,formula_b,formula_t;
str1=remove_spaces(arr[3]);
if (str1.indexOf('\\limits')==0) str1=remove_spaces(str1.substr(7,str1.length));
if (str1.indexOf('_')==0) { str1=str1.substr(1,str1.length);
	var _nbsp=nbsp; nbsp=''; var _is_index=is_index; is_index=true;
	formula_b=exec_token(['',[-1,0,0],[0,0],str1]); 
	nbsp=_nbsp; is_index=_is_index;
	str1=remove_spaces(formula_b[3]); } ;
if (str1.indexOf('^')==0) { str1=str1.substr(1,str1.length);
	var _nbsp=nbsp; nbsp=''; var _is_index=is_index; is_index=true;
	formula_t=exec_token(['',[-1,0,0],[0,0],str1]); 
	nbsp=_nbsp; is_index=_is_index;
	str1=remove_spaces(formula_t[3]); } ;
if ((!(formula_b))&&(str1.indexOf('_')==0)) { str1=str1.substr(1,str1.length);
	var _nbsp=nbsp; nbsp=''; var _is_index=is_index; is_index=true;
	formula_b=exec_token(['',[-1,0,0],[0,0],str1]); 
	nbsp=_nbsp; is_index=_is_index;
	str1=formula_b[3]; } ;
var str_t='<font style="font-size:'+index_size+'px;line-height:1;">'+((formula_t)?formula_t[0]:'')+'</font>';
var str_b='<font style="font-size:'+index_size+'px;line-height:1;">'+((formula_b)?formula_b[0]:'')+'</font>';
var st=calc_height(str_t); 
var sb=calc_height(str_b);
var s0=calc_height('<font style="'+(is_index?'font-size:'+index_size+'px;':'')+'line-height:1;">&zwj;'+s+'</font>');
var sh=kgl_h/kgl*s0;
var sd=kgl_d/kgl*s0;
//alert([st,sh,sd,sb]);
var _move=(wk)?-sb-sd-math_axis*(is_index?index_f:1):(sh+sd)/2+math_axis*(is_index?index_f:1)+((opera)?kgl/16:0);
res+='<table style="'+disp_inl+'vertical-align:'+_move+'px;';
res+='margin:0;padding:0;border:0;line-height:0;text-align:center;">';
if (formula_t) res+='<tr><td style="line-height:'+index_f+';margin:0;padding:0;padding-left:'+off[0]+'px;">'+str_t+'</td></tr>';
	else res+='<tr><td></td></tr>';
res+='<tr><td style="line-height:1;margin:0;padding:0;'+(is_index?'font-size:'+index_size+'px;':'')+'">'+s+'</td></tr>';
if (formula_b) res+='<tr><td style="line-height:'+index_f+';margin:0;padding:0;padding-right:'+off[1]+'px;">'+str_b+'</td></tr>';
	else res+='<tr><td></td></tr>';
res+='</table>';
var tsh=(sh+sd)/2+st+math_axis*(is_index?index_f:1);
var tsd=(sh+sd)/2+sb-math_axis*(is_index?index_f:1);
if (tsh>fh) fh=tsh;
if (tsd>fd) fd=tsd;
return [''+arr[0]+res,[1,tsh,tsd],[fh,fd],str1];
}

function exec_punct(s,arr) {
var res=s;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+res,[8,sh,sd],[fh,fd],arr[3]];
}

var redefs=new Array();

function exec_redefs(command) {
for (var i=0;i<redefs.length;i++) if (command==redefs[i][0]) return redefs[i][1];
return command;
}

redefs[redefs.length]=['\\sim','\\podob'];
//redefs[redefs.length]=['\\cup','\\smile'];
redefs[redefs.length]=['\\Delta','\\triangle'];

//literal commands
function exec_command(command,arr) {
//ignore
if (
	(command=='\\displaystyle')||
	(command=='\\textstyle')||
	(command=='\\scriptstyle')||
	(command=='\\boldmath')
		) return arr;
//ordinaries

command=exec_redefs(command);

if (command=='\\alpha') return exec_ord('&alpha;',arr);
if (command=='\\beta') return exec_ord('&beta;',arr);
if (command=='\\gamma') return exec_ord('&gamma;',arr);
if (command=='\\delta') return exec_ord('&delta;',arr);
if (command=='\\epsilon') return exec_ord('&epsilon;',arr);
if (command=='\\zeta') return exec_ord('&zeta;',arr);
if (command=='\\eta') return exec_ord('&eta;',arr);
if (command=='\\theta') return exec_ord('&theta;',arr);
if (command=='\\vartheta') return exec_ord('&thetasym;',arr);
if (command=='\\iota') return exec_ord('&iota;',arr);
if (command=='\\kappa') return exec_ord('&#1008;',arr);
if (command=='\\lambda') return exec_ord('&lambda;',arr);
if (command=='\\mu') return exec_ord('&mu;',arr);
if (command=='\\nu') return exec_ord('&nu;',arr);
if (command=='\\pi') return exec_ord('&pi;',arr);
if (command=='\\xi') return exec_ord('&xi;',arr);
if (command=='\\rho') return exec_ord('&rho;',arr);
if (command=='\\sigma') return exec_ord('&sigma;',arr);
if (command=='\\varsigma') return exec_ord('&sigmaf;',arr);
if (command=='\\tau') return exec_ord('&tau;',arr);
if (command=='\\upsilon') return exec_ord('&upsilon;',arr);
if (command=='\\phi') return exec_ord('&phi;',arr);
if (command=='\\varphi') return exec_ord('&phi;',arr);
if (command=='\\chi') return exec_ord('&chi;',arr);
if (command=='\\psi') return exec_ord('&psi;',arr);
if (command=='\\omega') return exec_ord('&omega;',arr);
if (command=='\\Alpha') return exec_ord('&Alpha;',arr);
if (command=='\\Beta') return exec_ord('&Beta;',arr);
if (command=='\\Gamma') return exec_ord('&Gamma;',arr);
if (command=='\\Delta') return exec_ord('&Delta;',arr);
if (command=='\\Epsilon') return exec_ord('&Epsilon;',arr);
if (command=='\\Zeta') return exec_ord('&Zeta;',arr);
if (command=='\\Eta') return exec_ord('&Eta;',arr);
if (command=='\\Theta') return exec_ord('&Theta;',arr);
if (command=='\\Iota') return exec_ord('&Iota;',arr);
if (command=='\\Kappa') return exec_ord('&Kappa;',arr);
if (command=='\\Lambda') return exec_ord('&Lambda;',arr);
if (command=='\\Mu') return exec_ord('&Mu;',arr);
if (command=='\\Nu') return exec_ord('&Nu;',arr);
if (command=='\\Pi') return exec_ord('&Pi;',arr);
if (command=='\\Xi') return exec_ord('&Xi;',arr);
if (command=='\\Rho') return exec_ord('&Rho;',arr);
if (command=='\\Sigma') return exec_ord('&Sigma;',arr);
if (command=='\\Tau') return exec_ord('&Tau;',arr);
if (command=='\\Upsilon') return exec_ord('&Upsilon;',arr);
if (command=='\\Phi') return exec_ord('&Phi;',arr);
if (command=='\\Chi') return exec_ord('&Chi;',arr);
if (command=='\\Psi') return exec_ord('&Psi;',arr);
if (command=='\\Omega') return exec_ord('&Omega;',arr);
if (command=='\\aleph') return exec_ord('&#8501;',arr);
if (command=='\\ell') return exec_ord(it_font_b+'&#8467;'+it_font_e,arr);
if (command=='\\wp') return exec_ord('&weierp;',arr);
if (command=='\\Re') return exec_ord('&real;',arr);
if (command=='\\Im') return exec_ord('&image;',arr);
if (command=='\\partial') return exec_ord(it_font_b+'&part;'+it_font_e,arr);
if (command=='\\infty') return exec_ord('&infin;',arr);
if (command=='\\emptyset') return exec_ord('&empty;',arr);
if (command=='\\varnothing') return exec_ord('&empty;',arr);
if (command=='\\nabla') return exec_ord('&nabla;',arr);
if (command=='\\top') return exec_ord('&#x22A4;',arr);
if (command=='\\bot') return exec_ord('&#x22A5;',arr);
if (command=='\\triangle') return exec_ord('&#9651;',arr);
if (command=='\\angle') return exec_ord('&ang;',arr);
if (command=='\\forall') return exec_ord('&forall;',arr);
if (command=='\\exists') return exec_ord('&exist;',arr);
if (command=='\\neg') return exec_ord('&not;',arr);
if (command=='\\lnot') return exec_ord('&not;',arr);
if (command=='\\dots') return exec_ord('&hellip;',arr);
if (command=='\\ldots') return exec_ord('&hellip;',arr);
if (command=='\\cdots') return exec_ord('&#8943;',arr);
if (command=='\\ddots') return exec_ord('&#8945;',arr);
if (command=='\\enskip') return exec_ord('&nbsp;&nbsp;',arr);
if (command=='\\enspace') return exec_ord('&nbsp;&nbsp;',arr);
if (command=='\\quad') return exec_ord('&nbsp;&nbsp;&nbsp;&nbsp;',arr);
if (command=='\\qquad') return exec_ord('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',arr);
if (command=='\\smile') return exec_ord('&#8995;',arr);
if (command=='\\frown') return exec_ord('&#8994;',arr);
if (command=='\\backslash') return exec_ord('&#x2216;',arr);
if (command=='\\mathstrut') return exec_ord('&zwj;',arr);
if (command=='\\strut') return exec_ord('&zwj;',arr);
if (command=='\\bbN') return exec_ord('&#8469;',arr);
if (command=='\\bbZ') return exec_ord('&#8484;',arr);
if (command=='\\bbQ') return exec_ord('&#8474;',arr);
if (command=='\\bbR') return exec_ord('&#8477;',arr);
if (command=='\\bbC') return exec_ord('&#8450;',arr);
if (command=='\\bbH') return exec_ord('&#8461;',arr);
if (command=='\\const') return exec_ord('const',arr);
// binaries
if (command=='\\cdot') return exec_bin('&middot;',arr);
if (command=='\\bullet') return exec_bin('&bull;',arr);
if (command=='\\wedge') return exec_bin('&and;',arr);
if (command=='\\land') return exec_bin('&and;',arr);
if (command=='\\vee') return exec_bin('&or;',arr);
if (command=='\\lor') return exec_bin('&or;',arr);
if (command=='\\cap') return exec_bin('&cap;',arr);
if (command=='\\cup') return exec_bin('&cup;',arr);
if (command=='\\div') return exec_bin('&divide;',arr);
if (command=='\\sqcap') return exec_bin('&#x2293;',arr);
if (command=='\\sqcup') return exec_bin('&#x2294;',arr);
if (command=='\\odot') return exec_bin('&#x2299;',arr);
if (command=='\\oslash') return exec_bin('&#x2298;',arr);
if (command=='\\otimes') return exec_bin('&#x2297;',arr);
if (command=='\\ominus') return exec_bin('&#x2296;',arr);
if (command=='\\oplus') return exec_bin('&#x2295;',arr);
if (command=='\\pm') return exec_bin('&plusmn;',arr);
if (command=='\\mp') return exec_bin('&#x2213;',arr);
if (command=='\\setminus') return exec_bin('&#x2216;',arr);
if (command=='\\ast') return exec_bin('&#x2217;',arr);
if (command=='\\times') return exec_bin('&times;',arr);
if (command=='\\circ') return exec_bin('&#8728;',arr);
if (command=='\\amp') return exec_bin('&amp;',arr);
if (command=='\\bmod') return exec_bin('mod',arr);
//relations
if (command=='\\gt') return exec_rel('&gt;',arr);
if (command=='\\lt') return exec_rel('&lt;',arr);
if (command=='\\perp') return exec_rel('&#x22A5;',arr);
if (command=='\\parallel') return exec_rel('&#x2016;',arr);
if (command=='\\mid') return exec_rel('|',arr);
if (command=='\\propto') return exec_rel('&#x221D;',arr);
if (command=='\\dashv') return exec_rel('&#x22A3;',arr);
if (command=='\\vdash') return exec_rel('&#x22A2;',arr);
if (command=='\\nearrow') return exec_rel('&#x2197;',arr);
if (command=='\\searrow') return exec_rel('&#x2198;',arr);
if (command=='\\nwarrow') return exec_rel('&#x2196;',arr);
if (command=='\\swarrow') return exec_rel('&#x2199;',arr);
if (command=='\\Leftrightarrow') return exec_rel('&#x21D4;',arr);
if (command=='\\Leftarrow') return exec_rel('&#x21D0;',arr);
if (command=='\\Rightarrow') return exec_rel('&#x21D2;',arr);
if (command=='\\ne') return exec_rel('&ne;',arr);
if (command=='\\neq') return exec_rel('&ne;',arr);
if (command=='\\ge') return exec_rel('&ge;',arr);
if (command=='\\geq') return exec_rel('&ge;',arr);
if (command=='\\le') return exec_rel('&le;',arr);
if (command=='\\leq') return exec_rel('&le;',arr);
if (command=='\\geqslant') return exec_rel('&ge;',arr);
if (command=='\\leqslant') return exec_rel('&le;',arr);
if (command=='\\succ') return exec_rel('&#x227B;',arr);
if (command=='\\prec') return exec_rel('&#x227A;',arr);
if (command=='\\succeq') return exec_rel('&#x227D;',arr);
if (command=='\\preceq') return exec_rel('&#x227C;',arr);
if (command=='\\subset') return exec_rel('&sub;',arr);
if (command=='\\supset') return exec_rel('&sup;',arr);
if (command=='\\subseteq') return exec_rel('&sube;',arr);
if (command=='\\supseteq') return exec_rel('&supe;',arr);
if (command=='\\in') return exec_rel('&isin;',arr);
if (command=='\\ni') return exec_rel('&#8715;',arr);
if (command=='\\owns') return exec_rel('&#8715;',arr);
if (command=='\\gg') return exec_rel('&#x226B;',arr);
if (command=='\\ll') return exec_rel('&#x226A;',arr);
if (command=='\\approx') return exec_rel('&asymp;',arr);
if (command=='\\leftrightarrow') return exec_rel('&harr;',arr);
if (command=='\\leftarrow') return exec_rel('&larr;',arr);
if (command=='\\rightarrow') return exec_rel('&rarr;',arr);
if (command=='\\gets') return exec_rel('&larr;',arr);
if (command=='\\to') return exec_rel('&rarr;',arr);
if (command=='\\mapsto') return exec_rel('&#8614;',arr);
if (command=='\\longmapsto') return exec_rel('&#8614;',arr);
if (command=='\\Longleftrightarrow') return exec_rel('&#x21D0;&#x21D2;',arr);
if (command=='\\iff') return exec_rel('&#x21D4;',arr);
if (command=='\\Longleftarrow') return exec_rel('&#x21D0;&#xEE20;',arr);
if (command=='\\Longrightarrow') return exec_rel('&#xEE20;&#x21D2;',arr);
if (command=='\\longleftrightarrow') return exec_rel('&larr;&rarr;',arr);
if (command=='\\longleftarrow') return exec_rel('&larr;&ndash;',arr);
if (command=='\\longrightarrow') return exec_rel('&ndash;&rarr;',arr);
if (command=='\\sim') return exec_rel('&sim;',arr);
if (command=='\\simeq') return exec_rel('&#8771;',arr);
if (command=='\\equiv') return exec_rel('&equiv;',arr);
if (command=='\\podob') return exec_rel('&#8766;',arr);
if (command=='\\vdots') return exec_rel('&#8942;',arr);
if (command=='\\uparrow') return exec_rel('&uarr;',arr);
if (command=='\\downarrow') return exec_rel('&darr;',arr);
if (command=='\\updownarrow') return exec_rel('&#8597;',arr);
if (command=='\\Uparrow') return exec_rel('&uArr;',arr);
if (command=='\\Downarrow') return exec_rel('&dArr;',arr);
if (command=='\\Updownarrow') return exec_rel('&#8661;',arr);
if (command=='\\cong') return exec_rel('&cong;',arr);
if (command=='\\notin') return exec_rel('&#8713;',arr);
//ordinary operators
if (command=='\\sin') return exec_op('sin',arr);
if (command=='\\arcsin') return exec_op('arcsin',arr);
if (command=='\\sh') return exec_op('sh',arr);
if (command=='\\sinh') return exec_op('sinh',arr);
if (command=='\\cos') return exec_op('cos',arr);
if (command=='\\arccos') return exec_op('arccos',arr);
if (command=='\\ch') return exec_op('ch',arr);
if (command=='\\cosh') return exec_op('cosh',arr);
if (command=='\\tg') return exec_op('tg',arr);
if (command=='\\tan') return exec_op('tan',arr);
if (command=='\\arctg') return exec_op('arctg',arr);
if (command=='\\arctan') return exec_op('arctan',arr);
if (command=='\\ctg') return exec_op('ctg',arr);
if (command=='\\arcctg') return exec_op('arcctg',arr);
if (command=='\\cot') return exec_op('cot',arr);
if (command=='\\arccot') return exec_op('arccot',arr);
if (command=='\\sec') return exec_op('sec',arr);
if (command=='\\csc') return exec_op('csc',arr);
if (command=='\\log') return exec_op('log',arr);
if (command=='\\lg') return exec_op('lg',arr);
if (command=='\\ln') return exec_op('ln',arr);
if (command=='\\arg') return exec_op('arg',arr);
if (command=='\\ker') return exec_op('ker',arr);
if (command=='\\dim') return exec_op('dim',arr);
if (command=='\\deg') return exec_op('deg',arr);
if (command=='\\hom') return exec_op('hom',arr);
if (command=='\\det') return exec_op('det',arr);
if (command=='\\Pr') return exec_op('Pr',arr);
if (command=='\\pr') return exec_op('pr',arr);
if (command=='\\nod') return exec_op('НОД',arr);
if (command=='\\nok') return exec_op('НОК',arr);
if (command=='\\gcd') return exec_op('gcd',arr);
if (command=='\\exp') return exec_op('exp',arr);
//open, close, punctuation
if (command=='\\lbrack') return exec_open('[',arr);
if (command=='\\rbrack') return exec_close(']',arr);
if (command=='\\lbrace') return exec_open('{',arr);
if (command=='\\rbrace') return exec_close('}',arr);
if (command=='\\colon') return exec_punct(':',arr);
if (command=='\\langle') return exec_open('&#x27E8;',arr);
if (command=='\\rangle') return exec_close('&#x27E9;',arr);
if (command=='\\lfloor') return exec_open('&lfloor;',arr);
if (command=='\\rfloor') return exec_close('&rfloor;',arr);
if (command=='\\lceil') return exec_open('&lceil;',arr);
if (command=='\\rceil') return exec_close('&rceil;',arr);
if (command=='\\Vert') return exec_ord('&#x2016;',arr);
if (command=='\\lVert') return exec_open('&#x2016;',arr);
if (command=='\\rVert') return exec_close('&#x2016;',arr);
if (command=='\\lvert') return exec_open('|',arr);
if (command=='\\rvert') return exec_close('|',arr);
if (command=='\\tire') return exec_punct('&mdash;',arr);
if (command=='\\defis') return exec_punct('-',arr);
//operators with limits
if (command=='\\sum') return exec_lop(big('&sum;'),[0,0],arr);
if (command=='\\coprod') return exec_lop(big('&#x2210;'),[0,0],arr);
if (command=='\\prod') return exec_lop(big('&prod;'),[0,0],arr);
if (command=='\\int') return exec_lop(big('&int;'),[3,3],arr);
if (command=='\\oint') return exec_lop(big('&#x222E;'),[3,3],arr);
if (command=='\\iint') return exec_lop(big('&#x222C;'),[3,3],arr);
if (command=='\\lim') return exec_lop('lim',[0,0],arr);
if (command=='\\min') return exec_lop('min',[0,0],arr);
if (command=='\\max') return exec_lop('max',[0,0],arr);
if (command=='\\sup') return exec_lop('sup',[0,0],arr);
if (command=='\\inf') return exec_lop('inf',[0,0],arr);
if (command=='\\limsup') return exec_lop('lim&nbsp;sup',[0,0],arr);
if (command=='\\liminf') return exec_lop('lim&nbsp;inf',[0,0],arr);

// команды с аргументами

if ((command=='\\widetilde')||(command=='\\tilde')) {
	var stat=arr[1][0];
	var fh=arr[2][0];
	var fd=arr[2][1];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]); 
	var sh=arr1[2][0]+kgl/4;
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'&zwj;'+tildeA(arr1[0],arr1[2][0],sd),[0,sh,sd],[fh,fd],arr1[3]];
	}

if ((command=='\\widehat')||(command=='\\hat')) { 
	var stat=arr[1][0];
	var fh=arr[2][0];
	var fd=arr[2][1];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]); 
	var sh=arr1[2][0]+kgl/4;
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'&zwj;'+hatA(arr1[0],arr1[2][0],sd),[0,sh,sd],[fh,fd],arr1[3]];
	}

if (command=='\\underbrace') { 
	if ((mff)&&(!(mff_ubr))) { recomp=true; mff_ubr=true; } ;
	var stat=arr[1][0];
	var fh=arr[2][0];
	var fd=arr[2][1];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	var str=remove_spaces(arr1[3]);
	if (str.substr(0,1)=='_') {
		var _nbsp=nbsp; nbsp=''; var _is_index=is_index; is_index=true;
		var formula_b=exec_token(['',[-1,0,0],[0,0],str.substr(1,str.length)]); 
		nbsp=_nbsp; is_index=_is_index;
		var str_b='<font style="font-size:'+index_size+'px;line-height:1;">'+formula_b[0]+'</font>';
		var sb=calc_height(str_b);
		var rest=formula_b[3];
		} 
	else { var str_b=''; var sb=0; var rest=arr1[3]; }
	var sh=arr1[2][0];
	var sd=arr1[2][1]+kgl/2+(((sb<kgl)&&(sb>0))?kgl:sb);
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'&zwj;'+underbraceA(arr1[0],arr1[2][0],arr1[2][1],str_b,sb),[0,sh,sd],[fh,fd],rest];
	}

if (command=='\\overbrace') { 
	var stat=arr[1][0];
	var fh=arr[2][0];
	var fd=arr[2][1];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	var str=remove_spaces(arr1[3]);
	if (str.substr(0,1)=='^') {
		var _nbsp=nbsp; nbsp=''; var _is_index=is_index; is_index=true;
		var formula_t=exec_token(['',[-1,0,0],[0,0],str.substr(1,str.length)]); 
		nbsp=_nbsp; is_index=_is_index;
		var str_t='<font style="font-size:'+index_size+'px;line-height:1;">'+formula_t[0]+'</font>';
		var st=calc_height(str_t);
		var rest=formula_t[3];
		} 
	else { var str_t=''; var st=0; var rest=arr1[3]; }
	var sh=arr1[2][0]+kgl/2+(((st<kgl)&&(st>0))?kgl:st);
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'&zwj;'+overbraceA(arr1[0],arr1[2][0],sd,str_t,st),[0,sh,sd],[fh,fd],rest];
	}

if ((command=='\\overrightarrow')||(command=='\\vec')) {
	var stat=arr[1][0];
	var fh=arr[2][0];
	var fd=arr[2][1];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]); 
	var sh=arr1[2][0]+kgl/4;
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'&zwj;'+vectorA(arr1[0],arr1[2][0],sd),[0,sh,sd],[fh,fd],arr1[3]];
	}

if (command=='\\not') {
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]); 
	var subcommand=arr1[0];
	var narr=[arr[0],arr[1],arr[2],arr1[3]];
	if (subcommand=='=') return exec_rel('&ne;',narr);
	if (subcommand=='&equiv;') return exec_rel('&#8802;',narr);
	if (subcommand=='&isin;') return exec_rel('&#8713;',narr);
	if (subcommand=='&#8715;') return exec_rel('&#8716;',narr); // \ni
	if (subcommand=='&sim;') return exec_rel('&#8769;',narr);
	if (subcommand=='&asymp;') return exec_rel('&#8777;',narr);
	if (subcommand=='|') return exec_rel('&#8740;',narr); // \mid
	if (subcommand=='&sup;') return exec_rel('&#8837;',narr);
	if (subcommand=='&sub;') return exec_rel('&#8836;',narr);
	if (subcommand=='&#x2016;') return exec_rel('&#8742;',narr); // \parallel
	if (subcommand=='&exist;') return exec_ord('&#8708;',narr);
	return [arr[0]+error('неизвестный аргумент для \'not\''),arr[1],arr[2],''];
	}

if ((command=='\\frac')||(command=='\\tfrac')||(command=='\\dfrac')) {
	var stat=arr[1][0];
	var fh=arr[2][0];
	var fd=arr[2][1];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3] ]); 
	var numer=arr1[0];
	var numer_h=arr1[2][0];
	var numer_d=arr1[2][1];
	var arr2=exec_token(['',[-1,0,0],[0,0],arr1[3]]); 
	var denom=arr2[0];
	var denom_h=arr2[2][0];
	var denom_d=arr2[2][1];
	var sh=numer_h+numer_d+((is_index)?1:2)+math_axis*((is_index)?index_f:1);
	var sd=denom_h+denom_d+((is_index)?1:2)-math_axis*((is_index)?index_f:1);
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'&zwj;'+fracA(numer,numer_h+numer_d,denom,denom_h+denom_d),[0,sh,sd],[fh,fd],arr2[3]];
	} ;

if (command=='\\binom') {
	var stat=arr[1][0];
	var fh=arr[2][0];
	var fd=arr[2][1];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3] ]); 
	var numer=arr1[0];
	var numer_h=arr1[2][0];
	var numer_d=arr1[2][1];
	var arr2=exec_token(['',[-1,0,0],[0,0],arr1[3]]); 
	var denom=arr2[0];
	var denom_h=arr2[2][0];
	var denom_d=arr2[2][1];
	var sh=numer_h+numer_d+((is_index)?0:1)+math_axis*((is_index)?index_f:1);
	var sd=denom_h+denom_d+((is_index)?0:1)-math_axis*((is_index)?index_f:1);
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	var atop=[atopA(numer,numer_h+numer_d,denom,denom_h+denom_d),[0,sh,sd],[sh,sd],''];
	return [arr[0]+ordspace(stat)+'&zwj;'+exec_delimiters(['',[-1,0,0],[0,0],'(',atop,')',''])[0],[9,sh,sd],[fh,fd],arr2[3]];
	} ;

if (command=='\\eqno') {
	var rest=compile_it(arr[3]);
	full_width=true;
	return ['<table style=\"width:100%;\"><tr><td>'+arr[0]+'</td><td style=\"text-align:right;\">'+rest[0]+'</td></tr></table>',arr[1],arr[2],''];
	}

if (command=='\\pmod') {
	var stat=arr[1][0];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	var fh=arr[2][0];
	var fd=arr[2][1];
	var sh=arr1[2][0];
	var sd=arr1[2][1];
	if (sh<kgl_h*((is_index)?index_f:1)) sh=kgl_h*((is_index)?index_f:1);
	if (sd<kgl_d*((is_index)?index_f:1)) sd=kgl_d*((is_index)?index_f:1);
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+'&nbsp;(mod&nbsp;'+arr1[0]+')',[0,sh,sd],[fh,fd],arr1[3]];
	}

if (command=='\\mathrm') {
	var stat=arr[1][0];
	it_font_b=''; it_font_e='';
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	it_font_b='<i>'; it_font_e='</i>';
	var fh=arr[2][0];
	var fd=arr[2][1];
	var sh=arr1[2][0];
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+arr1[0],[0,sh,sd],[fh,fd],arr1[3]];
	}

if (command=='\\mathbf') {
	var stat=arr[1][0];
	it_font_b=''; it_font_e='';
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	it_font_b='<i>'; it_font_e='</i>';
	var fh=arr[2][0];
	var fd=arr[2][1];
	var sh=arr1[2][0];
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'<b>'+arr1[0]+'</b>',[0,sh,sd],[fh,fd],arr1[3]];
	}

if ((command=='\\mbox')||(command=='\\hbox')) {
	return exec_text_group([arr[0],arr[1],arr[2],arr[3].substr(1,arr[3].length)]);
	}

if (command=='\\mathbb') {
	var stat=arr[1][0];
	it_font_b=''; it_font_e='';
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	it_font_b='<i>'; it_font_e='</i>';
	var arg=arr1[0];
	var res;
	if (arg=='N') res='&#8469;';
	if (arg=='Z') res='&#8484;';
	if (arg=='Q') res='&#8474;';
	if (arg=='R') res='&#8477;';
	if (arg=='C') res='&#8450;';
	if (arg=='H') res='&#8461;';
	if (!(res)) res=error('неизвестная \'bb\'-буква');
	var fh=arr[2][0];
	var fd=arr[2][1];
	var sh=kgl_h*((is_index)?index_f:1);
	var sd=kgl_d*((is_index)?index_f:1);
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+res,[0,sh,sd],[fh,fd],arr1[3]];
	}

if (command=='\\sqrt') {
	var stat=arr[1][0];
	var test_str=remove_spaces(arr[3]);
	if (test_str.substr(0,1)=='[') {
		var e_pos=test_str.indexOf(']');
		if (e_pos==-1) return [arr[0]+error('неверный аргумент для \'sqrt\''),arr[1],arr[2],''];
		var root_n=test_str.substr(1,e_pos-1);
		test_str=test_str.substr(e_pos+1,test_str.length);
	} else var root_n='';		
	var arr1=exec_token(['',[-1,0,0],[0,0],test_str]);
	var fh=arr[2][0];
	var fd=arr[2][1];
	var sh=arr1[2][0]+4;
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+((root_n.length>0 && stat!=-1)?'&nbsp;':'')+rootA(arr1[0],sh,sd,root_n),[0,sh,sd],[fh,fd],arr1[3]];
	} ;

if ((command=='\\overline')||(command=='\\bar')) {
	var stat=arr[1][0];
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	var fh=arr[2][0];
	var fd=arr[2][1];
	var sh=arr1[2][0]+4;
	var sd=arr1[2][1];
	if (sh>fh) fh=sh;
	if (sd>fd) fd=sd;
	return [arr[0]+ordspace(stat)+'&zwj;'+overlA(arr1[0],sh,sd),[0,sh,sd],[fh,fd],arr1[3]];
	} ;

// более сложные

if ((command=='\\syst') || (command=='\\cases')) {
	total_d=0; total_h=0; first_d=0; last_d=0;
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	var tst='</div></td></tr><tr><td><div style=\"'+disp_inl+'\">';
  var is_last=!(arr1[0].substr(arr1[0].length-tst.length)==tst);
  if (is_last) if (total_h==0) { total_h=arr1[2][0]; total_d=arr1[2][1]; last_d=arr1[2][1]; } 
    else { total_d+=(arr1[2][0]+arr1[2][1]<=baselineskip)?baselineskip:arr1[2][0]+arr1[2][1]; last_d=arr1[2][1]; };
  var ssh=(total_h+total_d)/2+math_axis*((is_index)?index_f:1);
  var ssd=(total_h+total_d)/2-math_axis*((is_index)?index_f:1);
  var str=(is_last)?arr1[0]:arr1[0].substr(0,arr1[0].length-tst.length);
  var arr2=['<table style="'+disp_inl+' margin:0; margin-left:2px; vertical-align:'+mathmiddle(total_h,total_d,last_d,first_d)+'px;"><tr><td><div style=\"'+disp_inl+'\">'+str+'</div></td></tr></table>',[0,ssh,ssd],[ssh,ssd],''];
  return exec_delimiters([arr[0],arr[1],arr[2],'{',arr2,'.',arr1[3]]);
	} ;

if (command=='\\sovok') {
	total_d=0; total_h=0; first_d=0; last_d=0;
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
	var tst='</div></td></tr><tr><td><div style=\"'+disp_inl+'\">';
  var is_last=!(arr1[0].substr(arr1[0].length-tst.length)==tst);
  if (is_last) if (total_h==0) { total_h=arr1[2][0]; total_d=arr1[2][1]; last_d=arr1[2][1]; } 
    else { total_d+=(arr1[2][0]+arr1[2][1]<=baselineskip)?baselineskip:arr1[2][0]+arr1[2][1]; last_d=arr1[2][1]; };
  var ssh=(total_h+total_d)/2+math_axis*((is_index)?index_f:1);
  var ssd=(total_h+total_d)/2-math_axis*((is_index)?index_f:1);
  var str=(is_last)?arr1[0]:arr1[0].substr(0,arr1[0].length-tst.length);
  var arr2=['<table style="'+disp_inl+' margin:0; margin-left:2px; vertical-align:'+mathmiddle(total_h,total_d,last_d,first_d)+'px;"><tr><td><div style=\"'+disp_inl+'\">'+str+'</div></td></tr></table>',[0,ssh,ssd],[ssh,ssd],''];
  return exec_delimiters([arr[0],arr[1],arr[2],'[',arr2,'.',arr1[3]]);
	} ;

if (command=='\\table') {
	total_d=0; total_h=0; first_d=0; last_d=0; var _tabspace=tabspace; 
		v_padding=4; tabspace='';
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]);
		tabspace=_tabspace;
	var tst='</div></td></tr><tr><td><div style=\"'+disp_inl+'\">';
  var is_last=!(arr1[0].substr(arr1[0].length-tst.length)==tst);
  if (is_last) if (total_h==0) { total_h=arr1[2][0]+v_padding; total_d=arr1[2][1]+v_padding; last_d=arr1[2][1]+v_padding; } 
    else { total_d+=((arr1[2][0]+arr1[2][1]<=baselineskip)?baselineskip:arr1[2][0]+arr1[2][1])+2*v_padding; last_d=arr1[2][1]+v_padding; };
  var ssh=(total_h+total_d)/2+math_axis*((is_index)?index_f:1);
  var ssd=(total_h+total_d)/2-math_axis*((is_index)?index_f:1);
  var str=(is_last)?arr1[0]:arr1[0].substr(0,arr1[0].length-tst.length);
  v_padding=0;
  var arr2=['<table class=\"textable\" style="'+disp_inl+' margin:0; vertical-align:'+mathmiddle(total_h,total_d,last_d,first_d)+'px;"><tr><td><div style=\"'+disp_inl+'\">'+str+'</div></td></tr></table>',[0,ssh,ssd],[ssh,ssd],''];
  return exec_delimiters([arr[0],arr[1],arr[2],'.',arr2,'.',arr1[3]]);
	} ;

if (command=='\\over') {
	var rest=compile_it(arr[3]);
	var numer=arr[0];
	var numer_h=arr[2][0];
	var numer_d=arr[2][1];
	var denom=rest[0];
	var denom_h=rest[2][0];
	var denom_d=rest[2][1];
	var sh=numer_h+numer_d+((is_index)?1:2)+math_axis*((is_index)?index_f:1);
	var sd=denom_h+denom_d+((is_index)?1:2)-math_axis*((is_index)?index_f:1);
	return ['&zwj;'+fracA(numer,numer_h+numer_d,denom,denom_h+denom_d),[0,sh,sd],[sh,fh],''];
	}

if (command=='\\atop') {
	var rest=compile_it(arr[3]);
	var numer=arr[0];
	var numer_h=arr[2][0];
	var numer_d=arr[2][1];
	var denom=rest[0];
	var denom_h=rest[2][0];
	var denom_d=rest[2][1];
	var sh=numer_h+numer_d+((is_index)?0:1)+math_axis*((is_index)?index_f:1);
	var sd=denom_h+denom_d+((is_index)?0:1)-math_axis*((is_index)?index_f:1);
	return ['&zwj;'+atopA(numer,numer_h+numer_d,denom,denom_h+denom_d),[0,sh,sd],[sh,sd],''];
	}

if (command=='\\choose') {
	var rest=compile_it(arr[3]);
	var numer=arr[0];
	var numer_h=arr[2][0];
	var numer_d=arr[2][1];
	var denom=rest[0];
	var denom_h=rest[2][0];
	var denom_d=rest[2][1];
	var sh=numer_h+numer_d+((is_index)?0:1)+math_axis*((is_index)?index_f:1);
	var sd=denom_h+denom_d+((is_index)?0:1)-math_axis*((is_index)?index_f:1);
	var arr2=['&zwj;'+atopA(numer,numer_h+numer_d,denom,denom_h+denom_d),[0,sh,sd],[sh,sd],''];
	return exec_delimiters(['',[-1,0,0],[0,0],'(',arr2,')',''])	
	}

if (command=='\\left') {
	var arr1=exec_token(['',[-1,0,0],[0,0],arr[3]]); var left_delimiter=arr1[0];
	var arr2=get_right_delimiter(arr1[3]); var right_delimiter=arr2[1];
	if (!(test_delimiter(left_delimiter))||!(test_delimiter(right_delimiter)))
		 return [arr[0]+error('неизвестный delimiter'),arr[1],arr[2],'']; 
	else return exec_delimiters([arr[0],arr[1],arr[2],left_delimiter,compile_it(arr2[0]),right_delimiter,arr2[2]]);
	}

if (command=='\\right') return [arr[0]+error('лишний \'right\''),arr[1],arr[2],'']

return [arr[0]+error('неизвестная команда'),arr[1],arr[2],''];
}

var total_h,total_d,last_d,first_d;

function mathmiddle(h,d,dd,ddd) {
//alert([h,d,dd]);
return (wk||ieX)?((is_index)?0:2)-(h+d)/2+math_axis:-ddd-h+(h+d)/2+math_axis;
}

function test_delimiter(delimiter) {
return (
	(delimiter=='(')||(delimiter=='[')||(delimiter=='{')||
	(delimiter==')')||(delimiter==']')||(delimiter=='}')||
	(delimiter=='.')||(delimiter=='|')||(delimiter=='&#x2016;')||
	(delimiter=='&lfloor;')||(delimiter=='&rfloor;')||
	(delimiter=='&lceil;')||(delimiter=='&rceil;')||
	(delimiter=='&#x27E8;')||(delimiter=='&#x27E9;')
	)
}

function get_right_delimiter (str) {
var n,str1,str2,str3;
str1=str; str2=''; str3=''; n=1;
while ((n>0)&&(str1.length>0)) {
str2=(/\\(left|right)/).exec(str1);
if (str2) {
	if (str2[0]=='\\left') n++;
	if (str2[0]=='\\right') n--;
	var m=str1.indexOf(str2[0])+str2[0].length;
	str3+=str1.substr(0,m);
	str1=str1.substr(m,str1.length);
	}
else return['',' '+error('нет парного delimiter'),''];
}
str3=str3.substr(0,str3.length-6);
var res=exec_token(['',[-1,0,0],[0,0],str1]);
return [str3,res[0],res[3]];
}

function get_group(arr) {
var stat=arr[1][0];
var _str=arr[3];
var i=1;	
var group='';
while ((i>0)&&(_str.length>0)) {
var nextchar=_str.substr(0,1);
if (nextchar=='{') i++;
if (nextchar=='}') i--;
group+=nextchar; _str=_str.substr(1,_str.length);
}
if ((_str.length==0)&&(i>0)) return [''+arr[0]+error('группа не закончена'),arr[1],arr[2],''];
var _saved_index=saved_index;
var res=compile_it(group.substr(0,group.length-1));
saved_index=_saved_index;
var fh=arr[2][0];
var fd=arr[2][1];
var sh=res[2][0];
var sd=res[2][1];
if (sh==0) sh=kgl_h;
if (sd==0) sd=kgl_d;
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+ordspace(stat)+res[0],[0,sh,sd],[fh,fd],_str];
}

function exec_text_group(arr) {
var stat=arr[1][0];
var _str=arr[3];
var i=1;
var group='';
while ((i>0)&&(_str.length>0)) {
var nextchar=_str.substr(0,1);
if (nextchar=='{') i++;
if (nextchar=='}') i--;
group+=nextchar; _str=_str.substr(1,_str.length);
}
if ((_str.length==0)&&(i>0)) return [''+arr[0]+error('группа не закончена'),arr[1],arr[2],''];
var res=group.substr(0,group.length-1);
var fh=arr[2][0];
var fd=arr[2][1];
var sh=kgl_h*((is_index)?index_f:1);
var sd=kgl_d*((is_index)?index_f:1);
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [''+arr[0]+ordspace(stat)+res,[0,sh,sd],arr[2],_str];
}

function ordspace(stat) {
var _stat=stat;
if ((stat==6)||(stat==7)||(stat==10)) _stat=saved_index[0][1][0];
return (((_stat==1)||(_stat==8)||(_stat==2)||(_stat==3))?nbsp:'');
}

function fracA(numer,numer_h,denom,denom_h) {
var sz=(is_index)?' style="font-size:'+index_size+'px;"':'';
var res='<table style="'+disp_inl+' line-height:0; margin:0; margin-left:2px; margin-right:2px; vertical-align:'+frac_va(numer_h,denom_h)+'px;">';
res+='<tr><td class="numer1"'+sz+'>'+'&zwj;&nbsp;'+numer+'&nbsp;</td></tr>';
res+='<tr><td><div class="rule1'+((is_index)?'s':'')+'"></div></td></tr>';
res+='<tr><td class="denom1"'+sz+'>'+'&zwj;&nbsp;'+denom+'&nbsp;</td></tr>';
res+='</table>';
return res;
}

function atopA(numer,numer_h,denom,denom_h) {
var sz=(is_index)?' style="font-size:'+index_size+'px;"':'';
var res='<table style="'+disp_inl+' line-height:0; margin:0; margin-left:2px; margin-right:2px; vertical-align:'+frac_va(numer_h,denom_h)+'px;">';
res+='<tr><td class="numer1"'+sz+'>'+'&zwj;'+numer+'</td></tr>';
res+='<tr><td>'+((is_index)?'<div></div>':'<div class="strut2"></div>')+'</td></tr>';
res+='<tr><td class="denom1"'+sz+'>'+'&zwj;'+denom+'</td></tr>';
res+='</table>';
return res;
}

function frac_va(nh,dh) {
return ((wk||ieX)?((is_index)?0:2*kgl/16)-dh:(math_axis+2*kgl/16)*((is_index)?index_f:1))+((opera)?kgl/16:0);
}

function rootA(t,h,d,n) {
//alert(is_index);
var H=(is_index)?index_f*(h+d):h+d-2*kgl/16;
var _h=((is_index)?index_f:1)*h;
var _d=((is_index)?index_f:1)*d;
var o=(wk)?0:1*kgl/16;
if (H>=22/16*kgl) o=(wk)?0:1*kgl/16;
if (H>=38/16*kgl) o=(wk)?-1*kgl/16:1*kgl/16;
var n_str;
if (n.length>0) {
	var n_arr=compile_it('^{'+n+'}');
	var n_w=calc_width(n_arr[0]);
	var m_r=(n_w>6)?-6:-n_w;
	n_str='<div style="'+disp_inl+'margin-right:'+m_r+'px;';
	n_str+='vertical-align:'+(((wk)?-3*kgl/16:math_axis*H/kgl-3*kgl/16)+root_va(H,_h,_d,o))+'px;">';
	n_str+=''+n_arr[0]+'</div>';
	} else n_str='';
var res='&zwj;'+n_str;
res+='<div style="'+disp_inl+'font-size:'+H+'px;';
res+='line-height:0;margin:0;border:0;padding:0;vertical-align:'+root_va(H,_h,_d,o)+'px;">';
var rad_sign='&radic;';
if (H>=22/16*kgl) rad_sign='&#x23B7;';
if (H>=38/16*kgl) rad_sign='&#x23B8;';
res+=rad_sign+'</div>'+overlA(t,h,d);
return res;
}

function root_va(H,h,d,o) {
return ((wk)?H/kgl*xheight-d-o:H/kgl*kgl_d-d-o)+2*kgl/16;
}
	
function overlA(t,h,d) {
var H=h+d; 
var res='<div style="'+disp_inl+'white-space:nowrap;vertical-align:baseline;';
res+='border:0;padding:0;margin:0; line-height:1; margin-top:1px; padding-top:2px; border-top:1px solid;">'+t+'</div>';
return res;
}

function exec_delimiters (arr) {
var stat=arr[1][0];
var delim_space=((stat==2)||(stat==3)||(stat==8))?nbsp:'';
var formula=arr[4];
var sh=formula[2][0];
var sd=formula[2][1];
var H=Math.ceil(sh+sd);
var ldelim=ext_delim(arr[3],H);
var rdelim=ext_delim(arr[5],H);
if (ldelim=='.') ldelim=''; else ldelim='<div style="'+disp_inl+' font-size:'+H+'px;line-height:0;vertical-align:'+delim_va(H,sh,sd)+'px;">'+ldelim+'</div>';
if (rdelim=='.') rdelim=''; else rdelim='<div style="'+disp_inl+' font-size:'+H+'px;line-height:0;vertical-align:'+delim_va(H,sh,sd)+'px;">'+rdelim+'</div>';
var fh=arr[2][0];
var fd=arr[2][1];
if (sh>fh) fh=sh;
if (sd>fd) fd=sd;
return [arr[0]+delim_space+'&zwj;'+ldelim+'&zwj;'+formula[0]+'&zwj;'+rdelim,[9,sh,sd],[fh,fd],arr[6]];
}

function ext_delim(delim,H) {
if (delim=='(') {
	if (H>=32/16*kgl) return '&#x23B9;';
	if (H>=48/16*kgl) return '&#x23BB;';
	}
if (delim==')') {
	if (H>=32/16*kgl) return '&#x23BA;';
	if (H>=48/16*kgl) return '&#x23BC;';
	}
if (delim=='[') {
	if (H>=32/16*kgl) return '&#xEE40;';
	if (H>=48/16*kgl) return '&#xEE42;';
	}
if (delim==']') {
	if (H>=32/16*kgl) return '&#xEE41;';
	if (H>=48/16*kgl) return '&#xEE43;';
	}
if (delim=='{') {
	if (H>=32/16*kgl) return '&#xEE50;';
	if (H>=48/16*kgl) return '&#xEE52;';
	}
if (delim=='}') {
	if (H>=32/16*kgl) return '&#xEE51;';
	if (H>=48/16*kgl) return '&#xEE53;';
	}
if (delim=='&lfloor;') {
	if (H>=32/16*kgl) return '&#xEE60;';
	if (H>=48/16*kgl) return '&#xEE62;';
	}
if (delim=='&rfloor;') {
	if (H>=32/16*kgl) return '&#xEE61;';
	if (H>=48/16*kgl) return '&#xEE63;';
	}
if (delim=='&lceil;') {
	if (H>=32/16*kgl) return '&#xEE70;';
	if (H>=48/16*kgl) return '&#xEE72;';
	}
if (delim=='&rceil;') {
	if (H>=32/16*kgl) return '&#xEE71;';
	if (H>=48/16*kgl) return '&#xEE73;';
	}
if (delim=='&#x27E8;') {
	if (H>=32/16*kgl) return '&#xEE80;';
	if (H>=48/16*kgl) return '&#xEE82;';
	}
if (delim=='&#x27E9;') {
	if (H>=32/16*kgl) return '&#xEE81;';
	if (H>=48/16*kgl) return '&#xEE83;';
	}
if (delim=='|') {
	if (H>=32/16*kgl) return '&#xEE91;';
	if (H>=48/16*kgl) return '&#xEE92;';
	}
if (delim=='&#x2016;') {
	if (H>=32/16*kgl) return '&#xEEA1;';
	if (H>=48/16*kgl) return '&#xEEA2;';
	}
return delim; 
}

function delim_va(H,h,d) {
return ((wk)?H/kgl*(xheight+1*kgl/16):H/kgl*kgl_d)-d;
}

function vectorA(s,h,d) {
var w=calc_width(s)+(((ie)||(opera))?-kgl/16:kgl/16);
var w_ar=1200/2048*kgl;
var w_en=1110/2048*kgl;
var n=(w-w_ar)/w_en;
var arrow='';
for (var i=1;i<n;i++) arrow+='&ndash;';
arrow+='&rarr;';
var res='<table style="'+disp_inl+'vertical-align:'+vector_va(h,d)+'px;margin:0;padding:0;line-height:1;">';
res+='<tr><td style="text-align:center;line-height:.25;">'+arrow+'</td></tr>'
res+='<tr><td style="text-align:center;line-height:1;">'+s+'</td></tr>';
res+='</table>';
return res;
}

function overbraceA(s,h,d,t,th) {
var w=calc_width('&zwj;'+s);
var w_l=768/2048*kgl;
var w_m=1280/2048*kgl;
var w_r=768/2048*kgl;
var w_e=256/2048*kgl;
var n=(w-w_l-w_m-w_r)/(2*w_e);
var brace='&#xEEB4;';
for (var i=0;i<n;i++) brace+='&#xEEB5;';
brace+='&#xEEB6;';
for (var i=0;i<n;i++) brace+='&#xEEB5;';
brace+='&#xEEB7;';
var res='<table style="'+disp_inl+'vertical-align:'+obrace_va(h,d,th)+'px;margin:0;padding:0;line-height:1;">';
res+='<tr><td style="text-align:center;line-height:1;">'+((t=='')?'':'&zwj;')+t+'</tr></tr>';
res+='<tr><td style="text-align:center;line-height:.5;">'+brace+'</td></tr>'
res+='<tr><td style="text-align:center;line-height:1;">&zwj;'+s+'</td></tr>';
res+='</table>';
return res;
}

function underbraceA(s,h,d,b,bh) {
var w=calc_width('&zwj;'+s); 
var w_l=768/2048*kgl;
var w_m=1280/2048*kgl;
var w_r=768/2048*kgl;
var w_e=256/2048*kgl;
var n=(w-w_l-w_m-w_r)/(2*w_e);
var brace='&#xEEB0;';
for (var i=0;i<n;i++) brace+='&#xEEB1;';
brace+='&#xEEB2;';
for (var i=0;i<n;i++) brace+='&#xEEB1;';
brace+='&#xEEB3;';
var res='<table style="'+disp_inl+'vertical-align:'+ubrace_va(h,d,bh)+'px;margin:0;padding:0;line-height:1;">';
res+='<tr><td style="text-align:center;line-height:1;">&zwj;'+s+'</td></tr>';
res+='<tr><td style="text-align:center;line-height:.5;">'+brace+'</td></tr>'
res+='<tr><td style="text-align:center;line-height:1;">'+((b=='')?'':'&zwj;')+b+'</tr></tr>';
res+='</table>';
return res;
}

function obrace_va(h,d,th) {
return (wk)?-d:h+.5*kgl+((opera)?kgl/16:0);
}

function ubrace_va(h,d,bh) {
return (wk)?-.5*kgl-(((bh<kgl)&&(bh>0))?kgl:bh)-d:-d;
}

function tildeA(s,h,d) {
var w=calc_width(s)+(((ie)||(opera))?-2*kgl/16:1*kgl/16);
var arrow='&#xEE21;';
if (w>=kgl) arrow='&#xEE22;';
if (w>=1.5*kgl) arrow='&#xEE23;';
var res='<table style="'+disp_inl+'vertical-align:'+vector_va(h,d)+'px;margin:0;padding:0;line-height:1;">';
res+='<tr><td style="text-align:center;line-height:.25;">'+arrow+'</td></tr>'
res+='<tr><td style="text-align:center;line-height:1;">'+s+'</td></tr>';
res+='</table>';
return res;
}

function hatA(s,h,d) {
var w=calc_width(s)+(((ie)||(opera))?-2*kgl/16:1*kgl/16);
var arrow='&#xEE31;';
if (w>=kgl) arrow='&#xEE32;';
if (w>=1.5*kgl) arrow='&#xEE33;';
var res='<table style="'+disp_inl+'vertical-align:'+vector_va(h,d)+'px;margin:0;padding:0;line-height:1;">';
res+='<tr><td style="text-align:center;line-height:.25;">'+arrow+'</td></tr>'
res+='<tr><td style="text-align:center;line-height:1;">'+s+'</td></tr>';
res+='</table>';
return res;
}

function vector_va(h,d) {
return (wk||ieX)?-d:h+Math.floor((opera)?1*kgl/16:0)+((mff)?.1*kgl/16:0);
}

// END OF FILE