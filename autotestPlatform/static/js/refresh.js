/*$(document).ready(function(){
	run();
});

//time可以通过用户输入的值来动态改变，当用户完成输入后用过clearInterval(interval)清理 
//之前的调度器，然后再调用run方法，这样修改后的调度器就起作用了。 

var time = 1000;
var interval; //调度器对象。 
function run(){   
interval = setInterval(fun,time); 
interval = setInterval(fun_task,time);
}*/
$(document).ready(function(){
	fun_task(0,1);
	fun(0,1);
});


function fun(pjt_id,page){
	//alert(jsonData());
	document.getElementById("id_test_id").innerHTML=pjt_id;
	document.getElementById("id_test_page_current").innerHTML=page;
	//var task_page_current=parseInt(document.getElementById("id_test_page_current").innerHTML);
	var task_page_current=page;
	var offset=(task_page_current-1)*5;
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/refresh/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		data: {limit:5,offset:offset,pjt_id:pjt_id},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			document.getElementById("id_body_test").innerHTML = "";
			var cnt=msg.cnt;
			document.getElementById("id_test_num").innerHTML=cnt;
			
			var pageTotal = ((parseInt(cnt)+5-1)/5)|0	;//总页数 
			document.getElementById("id_test_page_num").innerHTML=pageTotal;
			
			var task_page_list="";
			if(task_page_current<=2 && pageTotal<=5){
				task_page_list+="<span><<</span>";
				for(i=1;i<=pageTotal;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_test_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			else if(task_page_current<=2 && pageTotal>=5){
				task_page_list+="<span><<</span>";
				for(i=1;i<=5;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_test_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			/*else if(task_page_current == pageTotal || task_page_current == pageTotal-1){
				task_page_list+="<span><<</span>";
				for(i=pageTotal-4;i<=pageTotal;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_test_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}*/
			else if(task_page_current == pageTotal || task_page_current == pageTotal-1){
				task_page_list+="<span><<</span>";
				if(pageTotal-4>=1){
					for(i=pageTotal-4;i<=pageTotal;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:select_test_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
				else{
					for(i=1;i<=pageTotal;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:select_test_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
			}
			else if(task_page_current>2 && pageTotal<task_page_current+2){
				task_page_list+="<span><<</span>";
				for(i=task_page_current-2;i<=pageTotal;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_test_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			else{
				task_page_list+="<span><<</span>";
				for(i=task_page_current-2;i<=task_page_current+2;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_test_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			/*else{
				task_page_list+="<span><<</span><span class='active'>1</span><a href='#'>2</a><a href='#'>3</a><a href='#'>4</a><a href='#'>5</a><a href='#'>>></a>";
			}*/
			document.getElementById("id_test_page_list").innerHTML=task_page_list;
			
			var list=msg.list;
			var t="";
			$.each(list, function(i,n){
				var status;
				if(n.status == '0'){
					status="<img src='/static/r_loading.gif' title='等待中...'>";
					t+="<tr id="+n.id+">";
				}
				if(n.status == '1'){
					status="<img src='/static/r_running.gif' title='执行中...'>";
					t+="<tr id="+n.id+">";
				}
				if(n.status == '2'){
					status="<img src='/static/r_exception.png' title='异常'>";
					t+="<tr id="+n.id+">";
				}
				if(n.status == '3'){
					status="<img src='/static/r_success.png' title='成功'>";
					t+="<tr id="+n.id+">";
				}
				if(n.status == '4'){
					status="<img src='/static/r_fail.png' title='失败'>";
					t+="<tr id="+n.id+">";
				}
				
				//t+="<tr id="+n.id+">";
				t+="<td style='display:none;'>"+n.id+"</td>";
				var index=i+1;
				t+="<td>"+index+"</td>";
				t+="<td><a id='serial_num_"+n.id+"1' href='javascript:query_test_status_report("+n.id+");'>"+n.id+"</a></td>";
				t+="<td id='task_"+n.id+"2'>"+n.task_id+"</td>";
				t+="<td id='pjt_"+n.id+"3'>"+n.pjt_name+"</td>";
				var testtype;
				if(n.testtype == "0"){
					testtype="功能测试";
				}
				if(n.testtype == "1"){
					testtype="性能测试";
				}
				if(n.testtype == "2"){
					testtype="功能+性能";
				}
				t+="<td id='test_type_"+n.id+"4'>"+testtype+"</td>";
				var startby;
				if(n.startby == 'None'){
					startby='未知';
				}
				else{
					startby=n.startby;
				}
				t+="<td id='startby_"+n.id+"5'>"+startby+"</td>";
				t+="<td id='start_time_"+n.id+"6'>"+n.starttime+"</td>";
				var endtime;
				if(n.endtime == 'None'){
					endtime="--";
				}else{
					endtime=n.endtime;
				}
				t+="<td id='end_time_"+n.id+"7'>"+endtime+"</td>";
				t+="<td id='test_status_"+n.id+"8'>"+status+"</td>";
				t+="</tr>";
			});
			$("#id_body_test").append(t);
		}
	});
	//alert("test");
}


function fun_task(pjt_id,page){
	//alert(pjt_id);
	//alert(jsonData());
	document.getElementById("id_pjt_id").innerHTML=pjt_id;
	document.getElementById("id_task_page_current").innerHTML=page;
	//var task_page_current=parseInt(document.getElementById("id_task_page_current").innerHTML);
	var task_page_current=page;
	var offset=(task_page_current-1)*5;
	var optiontext="";
	if(1){
		$.post("/autotestPlatform/getshowpjt/",{},
		function(data){
			var retList = data.showpjt;
		//	alert(" function result from database---"+retList);
			$.each(retList, function(i,n){				
				optiontext+="<option>";
				optiontext+=n.pjt_name;
				optiontext+="</option>";
		//		alert("addshowpjt function---"+optiontext);
				 });
		},
		"json");
	}
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/refreshtask/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		data: {limit:5,offset:offset,pjt_id:pjt_id},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			document.getElementById("id_body_task").innerHTML = "";
			var cnt=msg.cnt;
			document.getElementById("id_task_num").innerHTML=cnt;
			var pageTotal = ((parseInt(cnt)+5-1)/5)|0	;//总页数 
			document.getElementById("id_task_page_num").innerHTML=pageTotal;
			
			var task_page_list="";
			if(task_page_current<=2 && pageTotal<=5){
				task_page_list+="<span><<</span>";
				for(i=1;i<=pageTotal;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_task_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			else if(task_page_current<=2 && pageTotal>=5){
				task_page_list+="<span><<</span>";
				for(i=1;i<=5;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_task_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			else if(task_page_current == pageTotal || task_page_current == pageTotal-1){
				task_page_list+="<span><<</span>";
				if(pageTotal-4>=1){
					for(i=pageTotal-4;i<=pageTotal;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:select_task_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
				else{
					for(i=1;i<=pageTotal;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:select_task_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
			}
			else if(task_page_current>2 && pageTotal<task_page_current+2){
				task_page_list+="<span><<</span>";
				for(i=task_page_current-2;i<=pageTotal;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_task_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			else{
				task_page_list+="<span><<</span>";
				for(i=task_page_current-2;i<=task_page_current+2;i++){
					if(task_page_current == i){
						task_page_list+="<span>"+i+"</span>";
					}
					else{
						task_page_list+="<a href='javascript:select_task_page("+i+");'>"+i+"</a>";
					}
				}
				task_page_list+="<span>>></span>";
			}
			/*else{
				task_page_list+="<span><<</span><span class='active'>1</span><a href='#'>2</a><a href='#'>3</a><a href='#'>4</a><a href='#'>5</a><a href='#'>>></a>";
			}*/
			document.getElementById("id_task_page_list").innerHTML=task_page_list;
			
			var list=msg.list;
			var t="";
			$.each(list, function(i,n){
				t+="<tr id="+n.id+">";
				var index=i+1;
				t+="<td>"+index+"</td>";
				t+="<td id='taskid_"+n.id+"0'>"+n.id+"</td>";
				t+="<td  id='taskname_"+n.id+"1'>"+n.name+"</td>";
			/*	t+="<td id='pjt_"+n.id+"2'>"+n.pjt_name+"</td>";
			*/
				t+="<td id='pjt_"+n.id+"2'>"+n.pjt_name+"</td>";
			
				t+="<td id='version_"+n.id+"3'>"+n.version+"</td>";
				var processtype;
				if(n.processtype == "0"){
					processtype="自测版本";
				}
				if(n.processtype == "1"){
					processtype="提测版本";
				}
				t+="<td id='processtype_"+n.id+"4'>"+processtype+"</td>";
				var testtype;
				if(n.testtype == "0"){
					testtype="功能测试";
				}
				if(n.testtype == "1"){
					testtype="性能测试";
				}
				if(n.testtype == "2"){
					testtype="功能+性能";
				}
				t+="<td id='testtype_"+n.id+"5'>"+testtype+"</td>";
				var filepath;
				if(n.filepath.length > 10){
					filepath=n.filepath.substring(0,10)+"...";
				}
				else{
					filepath=n.filepath;
				}
				t+="<td title='"+n.filepath+"' id='filepath_"+n.id+"6'>"+filepath+"</td>";
				t+="<td id='info_"+n.id+"7'>"+n.info+"</td>";
				var modpjthtml= optiontext;
			//	alert(modpjthtml);
			//	var modpjthtml=addshowpjt();
				t+="<td class='i-operate'><a href='javascript:query_task("+n.id+");' title='查看'><img src='/static/view.bmp'></a>&nbsp;&nbsp;<a href='javascript:start_task_instance("+n.id+");' title='启动' ><img src='/static/start.bmp'></a>&nbsp;&nbsp;<a href='javascript:mod_task("+n.id+");' title='修改'><img src='/static/edit.bmp'></a>&nbsp;&nbsp;<a href='#' title='删除' onclick='return delete_task("+n.id+")'><img src='/static/del.bmp'></a></td>";
			//	t+="<td class='i-operate'><a href='javascript:query_task("+n.id+");' title='查看'><img src='/static/view.bmp'></a>&nbsp;&nbsp;<a href='javascript:start_task_instance("+n.id+");' title='启动' ><img src='/static/start.bmp'></a>&nbsp;&nbsp;<a href='javascript:mod_task("+n.id+","+modpjthtml+");' title='修改'><img src='/static/edit.bmp'></a>&nbsp;&nbsp;<a href='#' title='删除' onclick='return delete_task("+n.id+")'><img src='/static/del.bmp'></a></td>";
				t+="</tr>";
			});
			$("#id_body_task").append(t);
		}
	});
	//alert("test");
}

function pjtId_pjtName(pjt_id,pjtName){
	$.post("/autotestPlatform/querypjtname/",{"pjt_id":pjt_id},
	function(data){
	pjtName = data.pjt_name;
	},
	"json");
}
function select_task_page(page){
	document.getElementById("id_task_page_current").innerHTML=page;
	var pjt_id=parseInt(document.getElementById("id_pjt_id").innerHTML);
	var page=parseInt(page);
	fun_task(pjt_id,page);
}

function refresh_task_page(){
	//var pjt_id=parseInt(document.getElementById("id_pjt_id").innerHTML);
	fun_task(0,1);
}

function refresh_test_page(){
	//var pjt_id=parseInt(document.getElementById("id_pjt_id").innerHTML);
	fun(0,1);
}

function select_test_page(page){
	document.getElementById("id_test_page_current").innerHTML=page;
	var pjt_id=parseInt(document.getElementById("id_test_id").innerHTML);
	var page=parseInt(page);
	fun(pjt_id,page);
}


$.extend({  
getUrlVars: function(){  
var vars = [], hash;  
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
for(var i = 0; i < hashes.length; i++)  
{  
hash = hashes[i].split('=');  
vars.push(hash[0]);  
vars[hash[0]] = hash[1];  
}  
return vars;  
},  
getUrlVar: function(name){  
return $.getUrlVars()[name];  
}  
}); 

function jsonData(){
var task_id=request("task_id");
var pjt_id=request("pjt_id");

var jsonStr="({"; 
jsonStr+="\"task_id\":";
jsonStr+="\"";
jsonStr+=task_id;
jsonStr+="\""; 
jsonStr+=","; 

jsonStr+="\"pjt_id\":";
jsonStr+="\"";
jsonStr+=pjt_id
jsonStr+="\""; 
jsonStr+="})"; 

//return eval(jsonStr);
return jsonStr;
}

function request(paras)
    { 
        var url = location.href;
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
        var paraObj = {} 
        for (i=0; j=paraString[i]; i++){ 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
        } 
        var returnValue = paraObj[paras.toLowerCase()]; 
        if(typeof(returnValue)=="undefined"){ 
        return ""; 
        }else{ 
        return returnValue; 
        } 
    }
