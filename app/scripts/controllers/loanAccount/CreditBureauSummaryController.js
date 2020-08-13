(function (module) {
    mifosX.controllers = _.extend(module, {
        CreditBureauSummaryController: function (scope, rootScope, http, API_VERSION, resourceFactory, routeParams,location) {

            scope.lpId=routeParams.productId;



            resourceFactory.creditBureauByLoanProductId.get({loanProductId: scope.lpId}, function (data) {
                scope.creditBureauByLoanProduct = data;
                scope.cbId = scope.creditBureauByLoanProduct.organisationCreditBureauId;
                scope.cbname = scope.creditBureauByLoanProduct.alias;
                scope.lpId = scope.creditBureauByLoanProduct.loanProductId;
                scope.lpName = scope.creditBureauByLoanProduct.loanProductName;
                scope.cbactive = scope.creditBureauByLoanProduct.isActive;
            });

            scope.routeToCreditBureau=function() {
                if (  scope.cbname == 'THITSAWORKS' && scope.cbactive == true) {
                    location.path('/creditreport/thitsaworkCreditbureau/'+scope.lpId+'/'+scope.cbId);
                }

            };
            scope.cancel=function() {
                    location.path('/viewloanaccount/'+scope.lpId);
            };
                //var creditreportmap = new Map([[scope.creditbureauid , scope.creditbureauidvalue], [scope.nrcid,scope.nrcidvalue]]);
                //  var creditreportmap = {user:'john', email:'john@email.com'};
             //
               // {<a class="btn btn-primary"  ng-click="routeToCreditBureau()" >{{'label.button.creditcheck' | translate}}</a>

               // };




        }
    });
    mifosX.ng.application.controller('CreditBureauSummaryController', ['$scope', '$rootScope','$http','API_VERSION', 'ResourceFactory','$routeParams', '$location', mifosX.controllers.CreditBureauSummaryController]).run(function ($log) {
        $log.info("CreditBureauSummaryController initialized");
    });
}(mifosX.controllers || {}));
