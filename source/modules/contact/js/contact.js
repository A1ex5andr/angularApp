(function () {
   angular.module('contact', [])
       .controller('ContactCtrl', function () {
           // Activates Tooltips for Social Links
           $('.tooltip-social').tooltip({
               selector: "a[data-toggle=tooltip]"
           });
       });
}());