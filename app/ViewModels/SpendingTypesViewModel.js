var SpendingTypesViewModel = function (allSpendings) {
    var self = this;



    this.allSpendings = ko.observableArray(allSpendings);
    this.monthsArray = ko.observableDictionary([]);
    this.chartsData = ko.observableDictionary([]);


    for (var i = 0; i < self.allSpendings().length; i++) {
        var tempDate = self.allSpendings()[i].dataTransakcji().format("MM.YYYY");
        if (self.allSpendings()[i].MCC() == 0)
            continue;
        if (self.monthsArray.indexOf(tempDate) === -1) {
            self.monthsArray.push(tempDate, [self.allSpendings()[i]]);
        } else {
            tempArray = self.monthsArray.get(tempDate, false);
            self.monthsArray.push(tempDate, tempArray().concat(self.allSpendings()[i]));
        }
    }

    this.drawCharts = function () {
        for (i = 0; i < self.monthsArray.keys().length; i++) {
            var values = self.monthsArray.get(self.monthsArray.keys()[i]);

            spendingTypesData = ko.observableDictionary([]);

            for (var j = 0; j < values().length; j++) {
                var spendingMCC = (values()[j]).MCC();
                if (spendingTypesData.indexOf(spendingMCC) === -1) {
                    spendingTypesData.push(spendingMCC, Math.abs((values()[j]).kwota()));
                } else {
                    tempArray = spendingTypesData.get(spendingMCC, false);
                    spendingTypesData.push(spendingMCC, tempArray() + Math.abs((values()[j]).kwota()));
                }
            }
            
            chartData = [];

            for (var k = 0; k < spendingTypesData.keys().length; k++) {
                var val = spendingTypesData.get(spendingTypesData.keys()[k]);
                var MCCname = MCCTypes[spendingTypesData.keys()[k]];
                chartData.push([MCCname, val(), spendingTypesData.keys()[k].colorHex()]);
            }
            var dataConcat = [['Rodzaj wydatku', 'Koszt', {role: 'style'}]].concat(chartData);
            var data = google.visualization.arrayToDataTable(dataConcat);
            function getColors() {
                // build colors array
                var colors = [];
                for (var i = 0; i < data.getNumberOfRows(); i++) {
                    colors.push(data.getValue(i, 2));
                }
                return colors;
            }
            var options = {
                title: self.monthsArray.keys()[i],
                colors: getColors()
            };
            var chart = new google.visualization.PieChart(document.getElementById('spendingTypeChart_' + self.monthsArray.keys()[i]));

            chart.draw(data, options);
        }

    };


};
