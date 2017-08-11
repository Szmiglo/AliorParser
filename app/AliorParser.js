function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}
var WydatekViewModel = function (line) {
    var self = this;
    pieces = line.split(';');
    iterator = 0;
    this.dataKsiegowania = ko.observable(moment(pieces[iterator++], "YYYYMMDD"));
    this.dataTransakcji = ko.observable(moment(pieces[iterator++], "YYYYMMDD"));
    //console.log(this.dataKsiegowania());
    this.nadawca = ko.observable(replaceAll('"', '', pieces[iterator++].trim()));
    this.odbiorca = ko.observable(replaceAll('"', '', pieces[iterator++].trim()));
    var tytul = pieces[iterator++];
    while (true) {
        tytul += ";" + pieces[iterator];
        if ((pieces[iterator].match(/"/g) || []).length >= 1) {
            break;
        }
        iterator++;
    }
    this.tytulPlatnosci = ko.observable(replaceAll('"', '', tytul));
    iterator += 3;
    if (pieces.length >= 13)
        iterator++;
    this.opisTransakcji = ko.observable(replaceAll('"', '', pieces[iterator++].trim()));
    this.kwota = ko.observable(parseFloat(replaceAll('"', '', pieces[iterator++].trim().replace(/,/g, '.'))));
    this.waluta = ko.observable(replaceAll('"', '', pieces[iterator++].trim()));
    this.saldoPoOperacji = ko.observable(replaceAll('"', '', pieces[iterator++].trim()));
    this.MCC = ko.observable(0);
    if (this.tytulPlatnosci().indexOf("Kod MCC") > -1) {
        this.MCC = ko.observable(this.tytulPlatnosci().substr(this.tytulPlatnosci().search("Kod MCC") + 8, 4));
        //console.log(this.MCC());
    }
};
