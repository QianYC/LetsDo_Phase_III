function initFunction() {
    /*MENU
    ------------------------------------*/
    $('#main-menu').metisMenu();

    $(window).bind("load resize", function () {
        if ($(this).width() < 768) {
            $('div.sidebar-collapse').addClass('collapse')
        } else {
            $('div.sidebar-collapse').removeClass('collapse')
        }
    });

    $("#sideNav").click(function(){
        if($(this).hasClass('closed')){
            $('.navbar-side').animate({left: '-0px'});
            $(this).removeClass('closed');
            $('#page-wrapper').animate({'margin-left' : '260px'});

        }
        else{
            $(this).addClass('closed');
            $('.navbar-side').animate({left: '-260px'});
            $('#page-wrapper').animate({'margin-left' : '0px'});
        }
    });

    document.getElementById("userId").innerHTML=getCookie("userId")+"&nbsp;";
}

/*-----------------------------Tabs--------------------------------*/

function resetTabs(){
    $("#content > div").hide(); //Hide all content
    $("#tabs a").attr("id",""); //Reset id's
}

var myUrl = window.location.href; //get URL
var myUrlTab = myUrl.substring(myUrl.indexOf("#")); // For mywebsite.com/tabs.html#tab2, myUrlTab = #tab2
var myUrlTabName = myUrlTab.substring(0,4); // For the above example, myUrlTabName = #tab

function initTabs(){
    $("#content > div").hide(); // Initially hide all content
    $("#tabs li:first a").attr("id","current"); // Activate first tab
    $("#content > div:first").fadeIn(); // Show first tab content

    $("#tabs a").on("click",function(e) {
        e.preventDefault();
        if ($(this).attr("id") == "current"){ //detection for current tab
            return
        }
        else{
            resetTabs();
            $(this).attr("id","current"); // Activate this
            $($(this).attr('name')).fadeIn(); // Show content for current tab
        }
    });

    for (i = 1; i <= $("#tabs li").length; i++) {
        if (myUrlTab == myUrlTabName + i) {
            resetTabs();
            $("a[name='"+myUrlTab+"']").attr("id","current"); // Activate url tab
            $(myUrlTab).fadeIn(); // Show url tab content
        }
    }
}


/*-----------------------------initOverview--------------------------------*/
var systemInfo;
var extraInfo;

function initOverview() {
    $("#publisherNum").text(systemInfo.publisherNum);
    $("#workerNum").text(systemInfo.workerNum);
    $("#historyProjectNum").text(systemInfo.historyProjectNum);
    $("#ongoingProjectNum").text(systemInfo.ongoingProjectNum);
}

/*-----------------------------Tables--------------------------------*/

function initTables() {
    function workerFormat ( d ) {
        // `d` is the original data object for the row
        var ability=d.abilities;
        var result='<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
                '<td>余额:</td>'+
                '<td>'+d.money+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>领域准确度:</td>'+
            '</tr>';
        for(var i=0;i<ability.length;i++){
            result+='<tr>'+
                '<td>'+ability[i].label.name+':</td>'+
                '<td>'+ability[i].accuracy+'%</td>'+
                '<td>'+ability[i].labelHistoryNum+'次</td>'+
                '</tr>';
        }
        result+='</table>';
        return result;
    }

    var optionTop={
        data: systemInfo.workerTop100,
        language: {
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "无条目 - sorry",
            "info": "正在显示_PAGES_页中的第 _PAGE_页",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "processing": "正在加载...",
            "infoPostFix": "",
            "search": "搜索:",
            "url": "",
            "paginate": {
                "first":    "首页",
                "previous": "上页",
                "next":     "下页",
                "last":     "末页"
            }
        },
        pagingType:"full_numbers",
        columns: [
            {
                title: "排名",
                orderable:false},
            {
                title: "昵称",
                orderable:false
            },
            {
                title: "擅长领域",
                orderable:false
            },
            {
                title: "总历史准确度",
                orderable:false
            },
            {
                title: "历史项目数",
                orderable:false
            },
            {
                title: "进行中项目数",
                orderable:false
            }
        ]
    };
    var optionWorker={
        data: systemInfo.workerList,
        language: {
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "无条目 - sorry",
            "info": "正在显示_PAGES_页中的第 _PAGE_页",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "processing": "正在加载...",
            "infoPostFix": "",
            "search": "搜索:",
            "url": "",
            "paginate": {
                "first":    "首页",
                "previous": "上页",
                "next":     "下页",
                "last":     "末页"
            }
        },
        pagingType:"full_numbers",
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            {
                title: "工作者编号",
                data:"id"
            },
            {
                title: "昵称",
                data:"name",
                orderable:false,
                render: function(data, type, row, meta) {
                    //渲染 把数据源中的标题和url组成超链接
                    return '<a href="javascript:void(0);" onclick="workerInfoDialog('+row.id+')" >' + data + '</a>';
                }
            },
            {
                title: "等级",
                data:"level"
            },
            {
                title: "标注总数",
                data:"tagNum"
            },
            {
                title: "邮箱",
                data:"email"
            }
        ]
    };
    var optionPublisher={
        data: systemInfo.publisherList,
        language: {
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "无条目 - sorry",
            "info": "正在显示_PAGES_页中的第 _PAGE_页",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "processing": "正在加载...",
            "infoPostFix": "",
            "search": "搜索:",
            "url": "",
            "paginate": {
                "first":    "首页",
                "previous": "上页",
                "next":     "下页",
                "last":     "末页"
            }
        },
        pagingType:"full_numbers",
        columns: [
            {
                title: "发布者编号",
                data:"id"
            },
            {
                title: "昵称",
                orderable:false,
                data:"name",
                render: function(data, type, row, meta) {
                    //渲染 把数据源中的标题和url组成超链接
                    return '<a href="javascript:void(0);" onclick="publisherInfoDialog('+row.id+')" >' + data + '</a>';
                }
            },
            {
                title: "邮箱",
                data:"email"
            },
            {
                title: "余额",
                data:"money"
            }
        ]
    };


    $('#workerTop100').DataTable(optionTop);
    var workerTable=$('#workers').DataTable(optionWorker);
    $('#publishers').DataTable(optionPublisher);


    // Add event listener for opening and closing details
    $('#workers tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = workerTable.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( workerFormat(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
}

/*-----------------------------Charts--------------------------------*/

function initCharts() {
    // 基于准备好的dom，初始化echarts实例
    var workerRegChart = echarts.init(document.getElementById('workerRegChart'),"light");
    var publisherRegChart = echarts.init(document.getElementById('publisherRegChart'),"light");
    var projectInfoChart = echarts.init(document.getElementById('projectInfoChart'),"light");
    var projectTypeChart = echarts.init(document.getElementById('projectTypeChart'),"light");
    var projectLabelChart = echarts.init(document.getElementById('projectLabelChart'),"light");
    var projectPaymentChart = echarts.init(document.getElementById('projectPaymentChart'));


// 指定图表的配置项和数据
    var workerNumOption = {
        tooltip: {
            trigger: 'axis'
        },
        dataset:{
            source:systemInfo.workerRegNum
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category'
        },
        yAxis: [
            {
                type: 'value',
                name: '当月注册人数',
            },
            {
                type: 'value',
                name: '总人数'
            }
        ],
        series: [
            {
                name: '当月注册人数',
                type: 'bar',
                yAxisIndex:0
            },
            {
                name: '当月总人数',
                type: 'line',
                yAxisIndex:1
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    workerRegChart.setOption(workerNumOption);
    workerNumOption.dataset.source=systemInfo.publisherRegNum;
    publisherRegChart.setOption(workerNumOption);

    var projectInfoOption = {
        tooltip: {
            trigger: 'axis'
        },
        dataset:{
            source:systemInfo.projectInfo
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category'
        },
        yAxis: [
            {
                type: 'value',
                name: '新项目数',
            },
            {
                type: 'value',
                name: '总项目数'
            }
        ],
        series: [
            {
                type: 'bar',
                stack: '总量',
                yAxisIndex:0
            },
            {
                type: 'bar',
                stack: '总量',
                yAxisIndex:0
            },
            {
                type: 'line',
                yAxisIndex:1
            }
        ]
    };

    projectInfoChart.setOption(projectInfoOption);

    var projectTypeOption={
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            bottom: 10,
            left: 'center'
        },
        series : [
            {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:extraInfo.projectType,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }

    projectTypeChart.setOption(projectTypeOption);
    projectTypeOption.series[0].data=extraInfo.labelProp;
    projectLabelChart.setOption(projectTypeOption);

    var paymentData = echarts.dataTool.prepareBoxplotData(extraInfo.payment);

    var projectPaymentOption = {
        title: [
            {
                text: '项目报酬箱形图',
                left: 'center'
            },
            {
                text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                borderColor: '#999',
                borderWidth: 1,
                textStyle: {
                    fontSize: 14
                },
                left: '10%',
                top: '90%'
            }
        ],
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: extraInfo.month,
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: '元',
            splitArea: {
                show: true
            }
        },
        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                data: paymentData.boxData,
                tooltip: {
                    formatter: function (param) {
                        return [
                            'payment' + param.name + ': ',
                            'upper: ' + param.data[5],
                            'Q3: ' + param.data[4],
                            'median: ' + param.data[3],
                            'Q1: ' + param.data[2],
                            'lower: ' + param.data[1]
                        ].join('<br/>')
                    }
                }
            },
            {
                name: 'outlier',
                type: 'scatter',
                data: paymentData.outliers
            }
        ]
    };

    projectPaymentChart.setOption(projectPaymentOption);
}


/*-----------------------------ProjectTable--------------------------------*/

function initProjectTable(){
    var optionProject={
        data: extraInfo.projectList,
        language: {
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "无条目 - sorry",
            "info": "正在显示_PAGES_页中的第 _PAGE_页",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "processing": "正在加载...",
            "infoPostFix": "",
            "search": "搜索:",
            "url": "",
            "paginate": {
                "first":    "首页",
                "previous": "上页",
                "next":     "下页",
                "last":     "末页"
            }
        },
        pagingType:"full_numbers",
        columns: [
            {
                title: "项目编号",
                data:"id"
            },
            {
                title: "项目名",
                data:"projectName",
                orderable:false,
                render: function(data, type, row, meta) {
                    //渲染 把数据源中的标题和url组成超链接
                    return '<a href="javascript:void(0);" onclick="window.open(\'/project/adminDetail\'),setCookie(\'projectId\','+row.id+',\'1\');">'+row.projectName+'</a>';
                }
            },
            {
                title: "发布者编号",
                data:"publisherId",
                orderable:false
            },
            {
                title: "当前工作者数",
                data:"currWorkerNum"
            },
            {
                title: "图片数",
                data:"picNum"
            },
            {
                title: "开始日期",
                data:"startDate",
                orderable:false
            },
            {
                title: "结束日期",
                data:"endDate",
                orderable:false
            },
            {
                title: "最低等级限制",
                data:"workerMinLevel",
                orderable:false
            },
            {
                title: "任务赏金",
                data:"money"
            },
            {
                title: "标签",
                data:"labels",
                orderable:false
            }
        ]
    };

    $("#projectList").DataTable(optionProject);
}

/*-----------------------------openDialog--------------------------------*/
function workerInfoDialog(workerId){
    var worker;
    var formdata=new FormData();
    formdata.append("workerId",workerId);
    $.ajax({
        url: "/admin/workerDetail",
        type: "post",
        dataType:"json",
        data:{
        "workerId":workerId
        },
        async:false,
        success : function(info){
            worker=info;
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest+"///"+textStatus+"///"+errorThrown);
        },
    });
    var vexOption={
        message: '工作者详情',
        input: [
            '<div class="fl w-100 pa3">\n' +
            '<ul class="nav nav-tabs fl w-100" style="margin-bottom: 16px">\n' +
            '        <li class="active"><a href="#InfoDiv" data-toggle="tab">详细信息</a></li>\n' +
            '        <li><a href="#InfoProjectsDiv" data-toggle="tab">参与项目</a></li>\n' +
            '    </ul>\n' +
            '    <div id="InfoTabContent" class="tab-content fl w-100">\n' +
            '        <div class="tab-pane fade in active fl w-100" id="InfoDiv">\n' +
            '    <table class="fl w-100">\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">帐号</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="userId" value="'+worker.worker.id+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">昵称</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="userName" value="'+worker.worker.name+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">邮箱</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="email" value="'+worker.worker.email+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">个性签名</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="intro" value="'+worker.worker.intro+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">余额</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="money" value="'+worker.worker.money+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">等级</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="level" value="'+worker.worker.level+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">标注总数</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="tagNum" value="'+worker.worker.tagNum+'"/></td>\n' +
            '        </tr>\n' +
            '    </table>\n' +
            '        </div>\n' +
            '        <div class="tab-pane fade fl w-100" id="InfoProjectsDiv">\n' +
            '              <table id="InfoProjectsTable" class="display w-100"></table>' +
            '        </div>\n' +
            '    </div>'+
            '</div>'
        ].join(''),
        buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: '确定' }),
            $.extend({}, vex.dialog.buttons.NO, { text: '查看更多' })
        ],
        callback: function (data) {
            if (!data) {
                //这里请求更详细界面
                // return console.log('Cancelled')
            }
        }
    };

    vex.dialog.open(vexOption);

    function projectFormat ( d ) {
        // `d` is the original data object for the row
        var result='<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
            '<td>结束日期:</td>'+
            '<td>'+d.endDate+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>最低等级限制:</td>'+
            '<td>'+d.workerMinLevel+'</td>'+
            '</tr>'+
        '<tr>'+
        '<td>任务赏金:</td>'+
        '<td>'+d.money+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>标签:</td>'+
        '<td>'+d.labels+'</td>'+
        '</tr>';
        result+='</table>';
        return result;
    }

    var optionProject={
        data: worker.projects,
        language: {
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "无条目 - sorry",
            "info": "正在显示_PAGES_页中的第 _PAGE_页",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "processing": "正在加载...",
            "infoPostFix": "",
            "search": "搜索:",
            "url": "",
            "paginate": {
                "first":    "首页",
                "previous": "上页",
                "next":     "下页",
                "last":     "末页"
            }
        },
        pagingType:"full_numbers",
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            {
                title: "项目编号",
                data:"id"
            },
            {
                title: "项目名",
                data:"projectName",
                orderable:false,
                render: function(data, type, row, meta) {
                    //渲染 把数据源中的标题和url组成超链接
                    return '<a href="javascript:void(0);" onclick="window.open(\'/project/adminDetail\'),setCookie(\'projectId\','+row.id+',\'1\');">'+row.projectName+'</a>';
                }
            },
            {
                title: "发布者编号",
                data:"publisherId",
                orderable:false
            },
            {
                title: "当前工作者数",
                data:"currWorkerNum"
            },
            {
                title: "图片数",
                data:"picNum"
            },
            {
                title: "开始日期",
                data:"startDate",
                orderable:false
            }
        ]
    };

    var InfoTable=$("#InfoProjectsTable").DataTable(optionProject);

    $('#InfoProjectsTable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = InfoTable.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( projectFormat(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
}

function publisherInfoDialog(publisherId){
    var publisher;
    var formdata=new FormData();
    formdata.append("publisherId",publisherId);
    $.ajax({
        url: "/admin/publisherDetail",
        type: "post",
        dataType:"json",
        data:{
            "publisherId":publisherId
        },
        async:false,
        success : function(info){
            publisher=info;
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest+"///"+textStatus+"///"+errorThrown);
        },
    });
    var vexOption={
        message: '发布者详情',
        input: [
            '<div class="fl w-100 pa3">\n' +
            '    <ul class="nav nav-tabs fl w-100" style="margin-bottom: 16px">\n' +
            '        <li class="active"><a href="#InfoDiv" data-toggle="tab">详细信息</a></li>\n' +
            '        <li><a href="#InfoProjectsDiv" data-toggle="tab">发布项目</a></li>\n' +
            '    </ul>\n' +
            '    <div id="InfoTabContent" class="tab-content fl w-100">\n' +
            '        <div class="tab-pane fade in active fl w-100" id="InfoDiv">\n' +
            '    <table class="fl w-100">\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">帐号</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="userId" value="'+publisher.publisher.id+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">昵称</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="userName" value="'+publisher.publisher.name+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">邮箱</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="email" value="'+publisher.publisher.email+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">个性签名</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="intro" value="'+publisher.publisher.intro+'"/></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td class="dib fl w-25">\n' +
            '                <label class="tc v-mid">余额</label></td>\n' +
            '            <td class="dib fl w-75">\n' +
            '                <input type="text" disabled="disabled" class="form-control ma4" id="money" value="'+publisher.publisher.money+'"/></td>\n' +
            '        </tr>\n' +
            '    </table>\n' +
            '        </div>\n' +
            '        <div class="tab-pane fade fl w-100" id="InfoProjectsDiv">\n' +
            '              <table id="InfoProjectsTable" class="display w-100"></table>' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
        ].join(''),
        buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: '确定' })
        ],
        callback: function (data) {
            if (!data) {
                //这里请求更详细界面
                // return console.log('Cancelled')
            }
        }
    };

    vex.dialog.open(vexOption);

    function projectFormat ( d ) {
        // `d` is the original data object for the row
        var result='<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
            '<td>结束日期:</td>'+
            '<td>'+d.endDate+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>最低等级限制:</td>'+
            '<td>'+d.workerMinLevel+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>任务赏金:</td>'+
            '<td>'+d.money+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>标签:</td>'+
            '<td>'+d.labels+'</td>'+
            '</tr>';
        result+='</table>';
        return result;
    }

    var optionProject={
        data: publisher.projects,
        language: {
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "无条目 - sorry",
            "info": "正在显示_PAGES_页中的第 _PAGE_页",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "processing": "正在加载...",
            "infoPostFix": "",
            "search": "搜索:",
            "url": "",
            "paginate": {
                "first":    "首页",
                "previous": "上页",
                "next":     "下页",
                "last":     "末页"
            }
        },
        pagingType:"full_numbers",
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            {
                title: "项目编号",
                data:"id"
            },
            {
                title: "项目名",
                data:"projectName",
                orderable:false,
                render: function(data, type, row, meta) {
                    //渲染 把数据源中的标题和url组成超链接
                    return '<a href="javascript:void(0);" onclick="window.open(\'/project/adminDetail\'),setCookie(\'projectId\','+row.id+',\'1\');">'+row.projectName+'</a>';
                }
            },
            {
                title: "发布者编号",
                data:"publisherId",
                orderable:false
            },
            {
                title: "当前工作者数",
                data:"currWorkerNum"
            },
            {
                title: "图片数",
                data:"picNum"
            },
            {
                title: "开始日期",
                data:"startDate",
                orderable:false
            }
        ]
    };

    var InfoTable=$("#InfoProjectsTable").DataTable(optionProject);

    $('#InfoProjectsTable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = InfoTable.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( projectFormat(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
}

/*-----------------------------init--------------------------------*/
$(document).ready(function () {
    $.ajax({
        url: "/admin/systemDetail",
        type: "post",
        dataType:"json",
        async:false,
        success : function(info){
            systemInfo=info;
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest+"///"+textStatus+"///"+errorThrown);
        },
    });

    initFunction();
    initTabs();
    initTables();
    initOverview();

    $.ajax({
        url: "/admin/extraSystemDetail",
        type: "post",
        dataType:"json",
        async:false,
        success : function(info){
            extraInfo=info;
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest+"///"+textStatus+"///"+errorThrown);
        },
    });
    initCharts();
    initProjectTable()
});

