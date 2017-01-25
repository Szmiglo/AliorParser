var AllSpendingsViewModel = function (allSpendings) {
    var self = this;
    this.allSpendings = ko.observableArray(allSpendings.slice(0));
    this.headers = ko.observableArray([
        {title: 'Data Księgowania', sortKey: 'dataKsiegowania'},
        {title: 'Data Transakcji', sortKey: 'dataTransakcji'},
        {title: 'Nadawca', sortKey: 'nadawca'},
        {title: 'Odbiorca', sortKey: 'odbiorca'},
        {title: 'Tytuł Płatności', sortKey: 'tytulPlatnosci'},
        {title: 'Opis Transakcji', sortKey: 'opisTransakcji'},
        {title: 'Kwota', sortKey: 'kwota', sortMethod: 'asc'},
        {title: 'Waluta', sortKey: 'waluta'},
        {title: 'Saldo Po Operacji', sortKey: 'saldoPoOperacji'},
    ]);
    this.sortAsc = function (header, event) {
        var sortKey = header.sortKey;
        switch (sortKey) {
            case 'kwota':
                self.allSpendings.sort(function (a, b) {
                    return a.kwota() < b.kwota() ? -1 : a.kwota() > b.kwota() ? 1 : a.kwota() == b.kwota() ? 0 : 0;
                });
                break;
            case 'dataKsiegowania':
                self.allSpendings.sort(function (a, b) {
                    return a.dataKsiegowania().diff(b.dataKsiegowania());
                });
                break;
            case 'dataTransakcji':
                self.allSpendings.sort(function (a, b) {
                    return a.dataTransakcji().diff(b.dataTransakcji());
                });
                break;
            case 'nadawca':
                self.allSpendings.sort(function (a, b) {
                    return a.nadawca().toUpperCase() < b.nadawca().toUpperCase() ? -1 : a.nadawca().toUpperCase() > b.nadawca().toUpperCase() ? 1 : a.nadawca().toUpperCase() == b.nadawca().toUpperCase() ? 0 : 0;
                });
                break;
            case 'odbiorca':
                self.allSpendings.sort(function (a, b) {
                    return a.odbiorca().toUpperCase() < b.odbiorca().toUpperCase() ? -1 : a.odbiorca().toUpperCase() > b.odbiorca().toUpperCase() ? 1 : a.odbiorca().toUpperCase() == b.odbiorca().toUpperCase() ? 0 : 0;
                });
                break;
            case 'tytulPlatnosci':
                self.allSpendings.sort(function (a, b) {
                    return a.tytulPlatnosci().toUpperCase() < b.tytulPlatnosci().toUpperCase() ? -1 : a.tytulPlatnosci().toUpperCase() > b.tytulPlatnosci().toUpperCase() ? 1 : a.tytulPlatnosci().toUpperCase() == b.tytulPlatnosci().toUpperCase() ? 0 : 0;
                });
                break;
            case 'opisTransakcji':
                self.allSpendings.sort(function (a, b) {
                    return a.opisTransakcji().toUpperCase() < b.opisTransakcji().toUpperCase() ? -1 : a.opisTransakcji().toUpperCase() > b.opisTransakcji().toUpperCase() ? 1 : a.opisTransakcji().toUpperCase() == b.opisTransakcji().toUpperCase() ? 0 : 0;
                });
                break;
            case 'waluta':
                self.allSpendings.sort(function (a, b) {
                    return a.waluta().toUpperCase() < b.waluta().toUpperCase() ? -1 : a.waluta().toUpperCase() > b.waluta().toUpperCase() ? 1 : a.waluta().toUpperCase() == b.waluta().toUpperCase() ? 0 : 0;
                });
                break;
            case 'saldoPoOperacji':
                self.allSpendings.sort(function (a, b) {
                    return a.saldoPoOperacji().toUpperCase() < b.saldoPoOperacji().toUpperCase() ? -1 : a.saldoPoOperacji().toUpperCase() > b.saldoPoOperacji().toUpperCase() ? 1 : a.saldoPoOperacji().toUpperCase() == b.saldoPoOperacji().toUpperCase() ? 0 : 0;
                });
                break;
        }
    };
    this.sortDesc = function (header, event) {
        var sortKey = header.sortKey;
        switch (sortKey) {
            case 'kwota':
                self.allSpendings.sort(function (a, b) {
                    return a.kwota() > b.kwota() ? -1 : a.kwota() < b.kwota() ? 1 : a.kwota() == b.kwota() ? 0 : 0;
                });
                break;
            case 'dataKsiegowania':
                self.allSpendings.sort(function (a, b) {
                    return b.dataKsiegowania().diff(a.dataKsiegowania());
                });
                break;
            case 'dataTransakcji':
                self.allSpendings.sort(function (a, b) {
                    return b.dataTransakcji().diff(a.dataTransakcji());
                });
                break;
            case 'nadawca':
                self.allSpendings.sort(function (a, b) {
                    return a.nadawca().toUpperCase() > b.nadawca().toUpperCase() ? -1 : a.nadawca().toUpperCase() < b.nadawca().toUpperCase() ? 1 : a.nadawca().toUpperCase() == b.nadawca().toUpperCase() ? 0 : 0;
                });
                break;
            case 'odbiorca':
                self.allSpendings.sort(function (a, b) {
                    return a.odbiorca().toUpperCase() > b.odbiorca().toUpperCase() ? -1 : a.odbiorca().toUpperCase() < b.odbiorca().toUpperCase() ? 1 : a.odbiorca().toUpperCase() == b.odbiorca().toUpperCase() ? 0 : 0;
                });
                break;
            case 'tytulPlatnosci':
                self.allSpendings.sort(function (a, b) {
                    return a.tytulPlatnosci().toUpperCase() > b.tytulPlatnosci().toUpperCase() ? -1 : a.tytulPlatnosci().toUpperCase() < b.tytulPlatnosci().toUpperCase() ? 1 : a.tytulPlatnosci().toUpperCase() == b.tytulPlatnosci().toUpperCase() ? 0 : 0;
                });
                break;
            case 'opisTransakcji':
                self.allSpendings.sort(function (a, b) {
                    return a.opisTransakcji().toUpperCase() > b.opisTransakcji().toUpperCase() ? -1 : a.opisTransakcji().toUpperCase() < b.opisTransakcji().toUpperCase() ? 1 : a.opisTransakcji().toUpperCase() == b.opisTransakcji().toUpperCase() ? 0 : 0;
                });
                break;
            case 'waluta':
                self.allSpendings.sort(function (a, b) {
                    return a.waluta().toUpperCase() > b.waluta().toUpperCase() ? -1 : a.waluta().toUpperCase() < b.waluta().toUpperCase() ? 1 : a.waluta().toUpperCase() == b.waluta().toUpperCase() ? 0 : 0;
                });
                break;
            case 'saldoPoOperacji':
                self.allSpendings.sort(function (a, b) {
                    return a.saldoPoOperacji().toUpperCase() > b.saldoPoOperacji().toUpperCase() ? -1 : a.saldoPoOperacji().toUpperCase() < b.saldoPoOperacji().toUpperCase() ? 1 : a.saldoPoOperacji().toUpperCase() == b.saldoPoOperacji().toUpperCase() ? 0 : 0;
                });
                break;
        }
    };
};
