var ChartByMonthViewModel = function (allSpendings) {
    var self = this;



    this.allSpendings = ko.observableArray(allSpendings);
    this.monthsArray = ko.observableDictionary([]);
    this.chartsData = ko.observableDictionary([]);
    this.summaryData = ko.observableDictionary([]);
    this.averageSummaryData = ko.observable(0);

    for (var i = 0; i < self.allSpendings().length; i++) {
        var tempDate = self.allSpendings()[i].dataTransakcji().format("MM.YYYY");
        if (self.monthsArray.indexOf(tempDate) === -1) {
            self.monthsArray.push(tempDate, [self.allSpendings()[i]]);
        } else {
            tempArray = self.monthsArray.get(tempDate, false);
            self.monthsArray.push(tempDate, tempArray().concat(self.allSpendings()[i]));
        }
    }
    
    this.averageSummary = ko.computed(function() {
        var sum = 0.0;
        console.log("av summ");
        for(var i = 0; i < self.summaryData.keys(); i++) {
            var values = self.summaryData.get(self.summaryData.keys()[i]);
            console.log("klucz: " + self.summaryData.keys()[i]);
            console.log("wartosc: " + values());
            sum += values();
        }
        return sum / self.summaryData.keys().length;
    });
    
    this.drawCharts = function () {
        for (i = 0; i < self.monthsArray.keys().length; i++) {
            var values = self.monthsArray.get(self.monthsArray.keys()[i]);
            var income = 0;
            var outcome = 0;
            for (var j = 0; j < values().length; j++) {
                var spending = values()[j];
                //console.log(spending);
                if (spending.kwota() > 0) {
                    income += spending.kwota();
                } else {
                    outcome += Math.abs(spending.kwota());
                }
            }
            var summary = income - outcome;
            summary = summary.toFixed(2);
            self.summaryData.push(self.monthsArray.keys()[i], summary);
            var data = google.visualization.arrayToDataTable([
                ['Wpływy', 'Wydatki'],
                ['Wpływy', income],
                ['Wydatki', outcome]
            ]);
            var options = {
                title: self.monthsArray.keys()[i]
            };
            var chart = new google.visualization.PieChart(document.getElementById('chart_'+self.monthsArray.keys()[i]));

            chart.draw(data, options);
        }

    };
};
