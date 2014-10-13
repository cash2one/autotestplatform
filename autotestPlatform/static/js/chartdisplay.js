$(document).ready(function(){
	honor_list();
});
$(document).ready(function(){
	chart_testresult_stat();
});
$(document).ready(function(){
	chart_usage_stat_cnt();
});
$(document).ready(function(){
	test();
});


function chart_usage_stat_cnt(){
	var data;
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/chartusagestatcountacc/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: true,
		data: {a:"a",i:"task_instance"},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			//var arrayDate = new Array();
			//var arrayDateUsage = new Array();
			data=msg;
			var xLen = data.length;
	maxLabelNum = 10; //x轴上最多显示的label个数，过多就会挤在一起
	step = Math.round(xLen / maxLabelNum) < 1 ? 1 : Math.round(xLen / maxLabelNum);
	var chart;
	
	$(function() { 
		$('#id_chart_test_usage').highcharts('StockChart', {
			
			rangeSelector : {
				buttons: [{
					type: 'week',
					count: 1,
					text: '1周'
				}, {
					type: 'month',
					count: 1,
					text: '1月'
				}, {
					type: 'month',
					count: 3,
					text: '3月'
				}, {
					type: 'month',
					count: 6,
					text: '6月'
				}, {
					type: 'year',
					count: 1,
					text: '1年'
				},{
					type: 'all',
					text: '所有'
				}],
				inputEnabled: $('#id_chart_test_usage').width() > 480,
				selected : 5
			},
			
			chart: { 
				renderTo: 'id_chart_test_usage', //图表放置的容器，DIV 
				defaultSeriesType: 'line', //图表类型line(折线图), 
				//backgroundColor: '#EEE',
				zoomType: 'x'   //x轴方向可以缩放 
			}, 
			credits: { 
				enabled: false   //右下角不显示LOGO 
			}, 
			title: { 
				text: '自测平台使用情况数据统计' //图表标题 
			}, 
			subtitle: { 
				text: '按使用次数统计'  //副标题 
			}, 
			xAxis: {  //x轴 
			type : 'datetime',  
				dateTimeLabelFormats: {
                            second: '%Y-%m-%d<br/>%H:%M:%S',
                            minute: '%Y-%m-%d<br/>%H:%M',
                            hour: '%Y-%m-%d<br/>%H:%M',
                            day: '%Y<br/>%m-%d',
                            week: '%Y<br/>%m-%d',
                            month: '%Y-%m',
                            year: '%Y'
                }/*,
				//categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], //x轴标签名称 
				categories:arrayDate,
				gridLineWidth: 1, //设置网格宽度为1 
				lineWidth: 2,  //基线宽度
				//tickInterval: 200,  //自定义刻度
				tickInterval: step,
				//max: 14,
				//labels:{y:26,step:5,rotation: -45},  //x轴标签位置：距X轴下方26像素
				labels:{y:26},  //x轴标签位置：距X轴下方26像素*/
			}, 
			scrollbar: {
				enabled: true
			},
			yAxis: {  //y轴 
				title: {text: '使用次数(次)'}, //标题 
				lineWidth: 2 //基线宽度 
			}, 
			plotOptions:{ //设置数据点 
				line:{ 
					dataLabels:{ 
						enabled:true  //在数据点上显示对应的数据值 
					}, 
					enableMouseTracking: true //取消鼠标滑向触发提示框 
				},
				series: {
					dataLabels:{
						enabled:false
					}
				}
			}, 
			legend: {  //图例 
				/*layout: 'vertical',  //图例显示的样式：水平（horizontal）/垂直（vertical） 
				backgroundColor: '#ffc', //图例背景色 
				align: 'left',  //图例水平对齐方式 
				verticalAlign: 'top',  //图例垂直对齐方式
				x: 100,  //相对X位移 
				y: 70,   //相对Y位移 
				floating: true, //设置可浮动 
				shadow: true,  //设置阴影 */
				enabled:true
			}, 
			lang:{
				contextButtonTitle:'导出报表-提示',
				/*exportButtonTitle:'导出报表',
				printChart:'打印报表',
				downloadPNG:'下载为PNG图片',
				downloadJPEG:'下载为JPEG图片',
				downloadPDF:'下载为PDF文档',
				downloadSVG:'下载为SVG图片'*/
				rangeSelectorZoom:'统计周期'
			},
			exporting: { 
				enabled: true, //设置导出按钮不可用 
				buttons: {
					contextButton: {
						symbol: 'menu'/*,
						symbolStrokeWidth: 1,
						symbolFill: '#bada55',
						symbolStroke: '#330033'*/
					}
				}
			}, 
			series: data.info
		}); 
	}); 
		}
	});
}

function chart_testresult_stat(){
	var data;
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/chartusagestattestresult/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: true,
		data: {a:"a",i:"task_instance"},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			//var arrayDate = new Array();
			//var arrayDateUsage = new Array();
			data=msg;
			var chart;
	$(function() {
		chart = new Highcharts.Chart({
			chart: {
				renderTo: 'id_chart_test_result' //关联页面元素div#id
			},
			credits: { 
				enabled: false   //右下角不显示LOGO 
			}, 
			title: {  //图表标题
				text: '自测平台版本测试结果数据统计'
			},
			subtitle: { 
				text: '测试-成功-失败次数-成功率统计'  //副标题 
			}, 
			xAxis: { //x轴
				categories: data.pjt,  //X轴类别
				labels:{y:18},  //x轴标签位置：距X轴下方18像素
				lineWidth: 2 //基线宽度
			},
			yAxis: {  //y轴
				title: {text: '统计次数(次)/成功率(%)'}, //y轴标题
				lineWidth: 2 //基线宽度
			},
			plotOptions:{ //设置数据点 
				column:{ 
					dataLabels:{ 
						enabled:true  //在数据点上显示对应的数据值 
					}, 
					enableMouseTracking: true //取消鼠标滑向触发提示框 
				},
				spline:{ 
					dataLabels:{ 
						enabled:true  //在数据点上显示对应的数据值 
					}, 
					enableMouseTracking: true //取消鼠标滑向触发提示框 
				},
				line:{ 
					dataLabels:{ 
						enabled:true  //在数据点上显示对应的数据值 
					}, 
					enableMouseTracking: true //取消鼠标滑向触发提示框 
				}
			}, 
			/*tooltip: {
				formatter: function() { //格式化鼠标滑向图表数据点时显示的提示框
					var s;
					if (this.point.name) { // 饼状图
						s = '<b>' + this.point.name + '</b>: <br>' + this.y+ '万吨(' + 
	twoDecimal(this.percentage) + '%)';
					} else {
						s = '' + this.x + ': ' + this.y + '万吨';
					}
					return s;
				}
			},*/
			/*labels: { //图表标签
				items: [{
					html: '水果消费总量对比',
					style: {
						left: '48px',
						top: '8px'
					}
				}]
			},*/
			exporting: {
				enabled: true  //设置导出按钮不可用
			},
			/*credits: { 
				text: 'helloweba.com',
				href: 'http://www.codesky.net'
			},*/
			series: [{ //数据列
				type: 'column',
				name: '合计',
				//data: [8.4, 9.8, 11.4, 15.6]
				data: data.total
			},
			{
				type: 'column',
				name: '成功',
				//data: [9.2, 7.8, 10.2, 16.8]
				data: data.success
			},
			{
				type: 'column',
				name: '失败',
				//data: [6.5, 9.4, 13.2, 18.6]
				data: data.error
			},
			{
				type: 'spline',
				name: '成功率',
				//data: [8.03, 9, 11.6, 17]
				data: data.successrate
			},
			/*{
				type: 'pie', //饼状图
				name: '水果消费总量',
				data: [{
					name: '长春',
					y: 45.2,
					color: '#4572A7' 
				},
				{
					name: '沈阳',
					y: 44,
					color: '#AA4643' 
				},
				{
					name: '哈尔滨',
					y: 47.7,
					color: '#89A54E' 
				}],
				center: [100, 80],  //饼状图坐标
				size: 100,  //饼状图直径大小
				dataLabels: {
					enabled: false  //不显示饼状图数据标签
				}
			}*/]
		});
	});
		}
	});
}

function honor_list(){
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/testhonorlist/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: true,
		data: {a:"a",i:"task_instance"},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			//var arrayDate = new Array();
			//var arrayDateUsage = new Array();
			document.getElementById("id_golden_medal_container").innerHTML = "";
			document.getElementById("id_silver_medal_container").innerHTML = "";
			document.getElementById("id_copper_medal_container").innerHTML = "";
			/*$.each(msg, function(i,n){
				t+="<span style='margin-right:20px;width: 60px;display: inline-block;vertical-align: top;'>";
				t+=yebanghua;
				t+="</span>";
			});*/
			var t="";
			t+="<span style=\"width: 20px;display: inline-block;height: 35px;background: url('/static/images/golden_medal.png') 0 0 no-repeat;\"></span>";
			t+="<span style='margin-right:20px;width: 60px;display: inline-block;vertical-align: top;'>";
			t+=msg[0].startby;
			t+="</span>";
			t+="<span style='display: inline-block;width: 68px;text-align: center;vertical-align: top;'>";
			t+=msg[0].cnt;
			t+="</span>";
			t+="<span style='display: inline-block;width: 68px;text-align: center;vertical-align: top;'>未统计</span>";
			$("#id_golden_medal_container").append(t);
			
			var t="";
			t+="<span style=\"width: 20px;display: inline-block;height: 35px;background: url('/static/images/silver_medal.png') 0 0 no-repeat;\"></span>";
			t+="<span style='margin-right:20px;width: 60px;display: inline-block;vertical-align: top;'>";
			t+=msg[1].startby;
			t+="</span>";
			t+="<span style='display: inline-block;width: 68px;text-align: center;vertical-align: top;'>";
			t+=msg[1].cnt;
			t+="</span>";
			t+="<span style='display: inline-block;width: 68px;text-align: center;vertical-align: top;'>未统计</span>";
			$("#id_silver_medal_container").append(t);
			
			var t="";
			t+="<span style=\"width: 20px;display: inline-block;height: 35px;background: url('/static/images/copper_medal.png') 0 0 no-repeat;\"></span>";
			t+="<span style='margin-right:20px;width: 60px;display: inline-block;vertical-align: top;'>";
			t+=msg[2].startby;
			t+="</span>";
			t+="<span style='display: inline-block;width: 68px;text-align: center;vertical-align: top;'>";
			t+=msg[2].cnt;
			t+="</span>";
			t+="<span style='display: inline-block;width: 68px;text-align: center;vertical-align: top;'>未统计</span>";
			$("#id_copper_medal_container").append(t);
		}
	});
}


function test() {
	var usage;
	var usage_acc;
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/chartusagestatpeople_new/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: true,
		data: {a:"a",i:"task_instance"},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			usage=msg;
			$.ajax({
				type: "post",//使用post方法访问后台
				dataType: "json",//返回json格式的数据
				url: "/autotestPlatform/chartusagestatpeopleacc_new/",//要访问的后台地址
				contentType: "application/json; charset=utf-8",
				cache: false,
				async: true,
				data: {a:"a",i:"task_instance"},//要发送的数据
				//start : function(){},
				//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
				success: function(msg){//msg为返回的数据，在这里做数据绑定
					usage_acc=msg;
					
					var xLen = usage.per_day_all.length;
	maxLabelNum = 10; //x轴上最多显示的label个数，过多就会挤在一起
	step = Math.round(xLen / maxLabelNum) < 1 ? 1 : Math.round(xLen / maxLabelNum);
	var chart;
	
	Highcharts.setOptions({
		lang: {
			rangeSelectorZoom:'统计周期：'
		}
	});
	$(function() { 
		$('#id_chart_test').highcharts('StockChart', {
			
			rangeSelector : {
				buttons: [{
					type: 'week',
					count: 1,
					text: '1周'
				}, {
					type: 'month',
					count: 1,
					text: '1月'
				}, {
					type: 'month',
					count: 3,
					text: '3月'
				}, {
					type: 'month',
					count: 6,
					text: '6月'
				}, {
					type: 'year',
					count: 1,
					text: '1年'
				},{
					type: 'all',
					text: '所有'
				}],
				inputEnabled: $('#id_chart_test').width() > 480,
				selected : 0
			},
		
			chart: { 
				renderTo: 'id_chart_test', //图表放置的容器，DIV 
				defaultSeriesType: 'line', //图表类型line(折线图), 
				//backgroundColor: '#EEE',
				zoomType: 'x'   //x轴方向可以缩放 
			}, 
			credits: { 
				enabled: false   //右下角不显示LOGO 
			}, 
			title: { 
				text: '自测平台使用情况数据统计' //图表标题 
			}, 
			subtitle: { 
				text: '按使用人数统计'  //副标题 
			}, 
			xAxis: {  //x轴 
			type : 'datetime',  
				dateTimeLabelFormats: {
                            second: '%Y-%m-%d<br/>%H:%M:%S',
                            minute: '%Y-%m-%d<br/>%H:%M',
                            hour: '%Y-%m-%d<br/>%H:%M',
                            day: '%Y<br/>%m-%d',
                            week: '%Y<br/>%m-%d',
                            month: '%Y-%m',
                            year: '%Y'
                }/*,
				//categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], //x轴标签名称 
				categories:arrayDate,
				gridLineWidth: 1, //设置网格宽度为1 
				lineWidth: 2,  //基线宽度
				//tickInterval: 200,  //自定义刻度
				tickInterval: step,
				//max: 14,
				//labels:{y:26,step:5,rotation: -45},  //x轴标签位置：距X轴下方26像素
				labels:{y:26},  //x轴标签位置：距X轴下方26像素*/
			}, 
			scrollbar: {
				enabled: true
			},
			yAxis: {  //y轴 
				title: {text: '使用人数(个)'}, //标题 
				lineWidth: 2 //基线宽度 
			}, 
			plotOptions:{ //设置数据点 
				line:{ 
					dataLabels:{ 
						enabled:true  //在数据点上显示对应的数据值 
					}, 
					enableMouseTracking: true //取消鼠标滑向触发提示框 
				},
				series: {
					dataLabels:{
						enabled:true
					}
				}
			}, 
			legend: {  //图例 
				/*layout: 'vertical',  //图例显示的样式：水平（horizontal）/垂直（vertical） 
				backgroundColor: '#ffc', //图例背景色 
				align: 'left',  //图例水平对齐方式 
				verticalAlign: 'top',  //图例垂直对齐方式
				x: 100,  //相对X位移 
				y: 70,   //相对Y位移 
				floating: true, //设置可浮动 
				shadow: true,  //设置阴影 */
				enabled:true
			}, 
			lang:{
				contextButtonTitle:'导出报表-提示',
				/*exportButtonTitle:'导出报表',
				printChart:'打印报表',
				downloadPNG:'下载为PNG图片',
				downloadJPEG:'下载为JPEG图片',
				downloadPDF:'下载为PDF文档',
				downloadSVG:'下载为SVG图片'*/
				rangeSelectorZoom:'统计周期'
			},
			exporting: { 
				enabled: true, //设置导出按钮不可用 
				buttons: {
					contextButton: {
						symbol: 'menu'/*,
						symbolStrokeWidth: 1,
						symbolFill: '#bada55',
						symbolStroke: '#330033'*/
					}
				}
			}, 
			series: [{  //数据列 
				showInLegend: true,
				name: '每日(ALL)', 
				//data: [ - 4.6, -2.2, 4.5, 13.1, 19.8, 24.0, 25.8, 24.4, 19.3, 12.4, 4.1, -2.7] 
				data: usage.per_day_all
			}, 
			
			{ 
				showInLegend: true,
				name: '累计(ALL)', 
				//data: [13.3, 14.4, 17.7, 21.9, 24.6, 27.2, 30.8, 32.1, 27.2, 23.7, 21.3, 15.6] 
				data: usage_acc.acc_day_all
			}] 
		}); 
	}); 
				}
			});
		}
	});
	

	
}

