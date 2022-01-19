(function (module) {
    mifosX.controllers = _.extend(module, {
        HoldSavingsTransactionController: function (scope, resourceFactory, routeParams, location, route) {

            scope.loanOfficers = [];
            //scope.transactiondata = {};
            scope.formData = {};
            scope.staffData = {};
            scope.paramData = {};
            scope.savingsId = routeParams.savingsId;
            scope.showHoldAccount = false;
            scope.showHoldTransaction = false;

            resourceFactory.savingsAccountHoldTransactionResource.getHoldTransactions({savingsId: scope.savingsId}, function (data) {
                scope.transactiondata = data;
            });

            resourceFactory.codeValueResource.getAllCodeValues({codeId: 38}, function (data) {
                scope.reasons = data;
            });

            scope.cancel = function () {
                location.path('/viewsavingaccount/' + scope.savingsId);
            };

            scope.releasefund = function (transactionId) {
                resourceFactory.savingsAccountReleaseTransactionResource.post({savingsId: scope.savingsId, transactionId: transactionId}, function () {
                        scope.showrefunded = true;
                        route.reload();
                });
            };

        }
    });
    mifosX.ng.application.controller('HoldSavingsTransactionController', ['$scope', 'ResourceFactory', '$routeParams', '$location', '$route', mifosX.controllers.HoldSavingsTransactionController]).run(function ($log) {
        $log.info("HoldSavingsTransactionController initialized");
    });
}(mifosX.controllers || {}));

