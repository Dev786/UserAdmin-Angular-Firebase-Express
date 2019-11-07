/*!
* angular-paging v2.2.2 by Brant Wills - MIT licensed
* https://github.com/brantwills/Angular-Paging.git
*/
angular.module("bw.paging",[]).directive("paging",function(){function a(a,b,c){a.$watchCollection("[page,pageSize,total,disabled]",function(){l(a,c)})}function b(a,b){return'<ul data-ng-hide="Hide" data-ng-class="ulClass"> <li title="{{Item.title}}" data-ng-class="Item.liClass" data-ng-repeat="Item in List"> <a '+(b.pgHref?'data-ng-href="{{Item.pgHref}}" ':"href ")+'data-ng-class="Item.aClass" data-ng-click="Item.action()" data-ng-bind="Item.value"></a> </li></ul>'}function c(a,b){a.List=[],a.Hide=!1,a.page=parseInt(a.page)||1,a.total=parseInt(a.total)||0,a.adjacent=parseInt(a.adjacent)||2,a.pgHref=a.pgHref||"",a.dots=a.dots||"...",a.ulClass=a.ulClass||"pagination",a.activeClass=a.activeClass||"active",a.disabledClass=a.disabledClass||"disabled",a.textFirst=a.textFirst||"<<",a.textLast=a.textLast||">>",a.textNext=a.textNext||">",a.textPrev=a.textPrev||"<",a.textFirstClass=a.textFirstClass||"",a.textLastClass=a.textLastClass||"",a.textNextClass=a.textNextClass||"",a.textPrevClass=a.textPrevClass||"",a.textTitlePage=a.textTitlePage||"Page {page}",a.textTitleFirst=a.textTitleFirst||"First Page",a.textTitleLast=a.textTitleLast||"Last Page",a.textTitleNext=a.textTitleNext||"Next Page",a.textTitlePrev=a.textTitlePrev||"Previous Page",a.hideIfEmpty=d(a,b.hideIfEmpty),a.showPrevNext=d(a,b.showPrevNext),a.showFirstLast=d(a,b.showFirstLast),a.scrollTop=d(a,b.scrollTop),a.isDisabled=d(a,b.disabled)}function d(a,b){return angular.isDefined(b)?!!a.$parent.$eval(b):!1}function e(a,b){a.page>b&&(a.page=b),a.page<=0&&(a.page=1),a.adjacent<=0&&(a.adjacent=2),1>=b&&(a.Hide=a.hideIfEmpty)}function f(a,b){a.page!=b&&(a.isDisabled||(a.page=b,a.pagingAction({page:a.page,pageSize:a.pageSize,total:a.total}),a.scrollTop&&scrollTo(0,0)))}function g(a,b,c){if(!(!a.showPrevNext&&!a.showFirstLast||1>b)){var d,e,g;if("prev"===c){d=a.page-1<=0;var h=a.page-1<=0?1:a.page-1;a.showFirstLast&&(e={value:a.textFirst,title:a.textTitleFirst,aClass:a.textFirstClass,page:1}),a.showPrevNext&&(g={value:a.textPrev,title:a.textTitlePrev,aClass:a.textPrevClass,page:h})}else{d=a.page+1>b;var i=a.page+1>=b?b:a.page+1;a.showPrevNext&&(e={value:a.textNext,title:a.textTitleNext,aClass:a.textNextClass,page:i}),a.showFirstLast&&(g={value:a.textLast,title:a.textTitleLast,aClass:a.textLastClass,page:b})}var j=function(b,c){return{title:b.title,aClass:b.aClass,value:b.aClass?"":b.value,liClass:c?a.disabledClass:"",pgHref:c?"":a.pgHref.replace(m,b.page),action:function(){c||f(a,b.page)}}};if(a.isDisabled&&(d=!0),e){var k=j(e,d);a.List.push(k)}if(g){var l=j(g,d);a.List.push(l)}}}function h(a,b,c){var d=0;for(d=a;b>=d;d++){var e=c.pgHref.replace(m,d),g=c.page==d?c.activeClass:"";c.isDisabled&&(e="",g=c.disabledClass),c.List.push({value:d,title:c.textTitlePage.replace(m,d),liClass:g,pgHref:e,action:function(){f(c,this.value)}})}}function i(a){a.List.push({value:a.dots,liClass:a.disabledClass})}function j(a,b){h(1,2,a),3!=b&&i(a)}function k(a,b,c){c!=a-2&&i(b),h(a-1,a,b)}function l(a,b){(!a.pageSize||a.pageSize<=0)&&(a.pageSize=1);var d=Math.ceil(a.total/a.pageSize);c(a,b),e(a,d);var f,i,l=2*a.adjacent+2;g(a,d,"prev"),l+2>=d?(f=1,h(f,d,a)):a.page-a.adjacent<=2?(f=1,i=1+l,h(f,i,a),k(d,a,i)):a.page<d-(a.adjacent+2)?(f=a.page-a.adjacent,i=a.page+a.adjacent,j(a,f),h(f,i,a),k(d,a,i)):(f=d-l,i=d,j(a,f),h(f,i,a)),g(a,d,"next")}var m=/\{page\}/g;return{restrict:"EA",link:a,template:b,scope:{page:"=",pageSize:"=",total:"=",disabled:"@",dots:"@",ulClass:"@",activeClass:"@",disabledClass:"@",adjacent:"@",pagingAction:"&",pgHref:"@",textFirst:"@",textLast:"@",textNext:"@",textPrev:"@",textFirstClass:"@",textLastClass:"@",textNextClass:"@",textPrevClass:"@",textTitlePage:"@",textTitleFirst:"@",textTitleLast:"@",textTitleNext:"@",textTitlePrev:"@"}}});