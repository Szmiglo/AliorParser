var ViewModel = function () {
    var self = this;
    this.allSpendings = ko.observableArray();
    this.error = ko.observable("");
    this.rawText = ko.observable("");
    this.loading = ko.observable(true);
    
    this.allSpendingsVM = ko.observable();
    this.chartByMonthVM = ko.observable();
    this.spendingTypesVM = ko.observable();
    
    this.TextFileLoadedCallback = function (file, data) {
        self.rawText(data);
        var lines = data.split('\n');
        for (var i = 1; i < lines.length; i++) {
            if (lines[i] === "")
                continue;
            if(lines[i].indexOf("lokat") > -1) {
                var temp = new WydatekViewModel(lines[i]);
                console.log(temp.opisTransakcji());
                continue;
            }
            self.allSpendings.push(new WydatekViewModel(lines[i]));

        }
        self.allSpendings.valueHasMutated();
        self.loading(false);
    };

    this.ShowAllSpendings = function() {
        if(self.loading() == true) return;
        self.resetView();
        self.allSpendingsVM(new AllSpendingsViewModel(self.allSpendings()));
    };
    this.ShowChartByMonth = function() {
        if(self.loading() == true) return;
        self.resetView();
        self.chartByMonthVM(new ChartByMonthViewModel(self.allSpendings()));
        self.chartByMonthVM().drawCharts();
        self.chartByMonthVM().averageSummary();
    };
    this.ShowSpendingTypes = function() {
        if(self.loading() == true) return;
        self.resetView();
        self.spendingTypesVM(new SpendingTypesViewModel(self.allSpendings()));
        self.spendingTypesVM().drawCharts();
    };
    this.resetView = function() {
        self.allSpendingsVM(null);
        self.chartByMonthVM(null);
        self.spendingTypesVM(null);
    }
};

var RoundToTwo = function(number) {
  return number.toFixed(2);  
};
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

String.prototype.colorHex = function() {
    var num = this.hashCode() % (colors.length - 1);
    return colors[num];
};

var colors = [
"#F0F8FF",
"#FAEBD7",
"#00FFFF",
"#7FFFD4",
"#F0FFFF",
"#F5F5DC",
"#FFE4C4",
"#000000",
"#FFEBCD",
"#0000FF",
"#8A2BE2",
"#A52A2A",
"#DEB887",
"#5F9EA0",
"#7FFF00",
"#D2691E",
"#FF7F50",
"#6495ED",
"#FFF8DC",
"#DC143C",
"#00FFFF",
"#00008B",
"#008B8B",
"#B8860B",
"#A9A9A9",
"#006400",
"#BDB76B",
"#8B008B",
"#556B2F",
"#FF8C00",
"#9932CC",
"#8B0000",
"#E9967A",
"#8FBC8F",
"#483D8B",
"#2F4F4F",
"#00CED1",
"#9400D3",
"#FF1493",
"#00BFFF",
"#696969",
"#1E90FF",
"#B22222",
"#FFFAF0",
"#228B22",
"#FF00FF",
"#DCDCDC",
"#F8F8FF",
"#FFD700",
"#DAA520",
"#808080",
"#008000",
"#ADFF2F",
"#F0FFF0",
"#FF69B4",
"#CD5C5C",
"#4B0082",
"#FFFFF0",
"#F0E68C",
"#E6E6FA",
"#FFF0F5",
"#7CFC00",
"#FFFACD",
"#ADD8E6",
"#F08080",
"#E0FFFF",
"#FAFAD2",
"#D3D3D3",
"#90EE90",
"#FFB6C1",
"#FFA07A",
"#20B2AA",
"#87CEFA",
"#778899",
"#B0C4DE",
"#FFFFE0",
"#00FF00",
"#32CD32",
"#FAF0E6",
"#FF00FF",
"#800000",
"#66CDAA",
"#0000CD",
"#BA55D3",
"#9370DB",
"#3CB371",
"#7B68EE",
"#00FA9A",
"#48D1CC",
"#C71585",
"#191970",
"#F5FFFA",
"#FFE4E1",
"#FFE4B5",
"#FFDEAD",
"#000080",
"#FDF5E6",
"#808000",
"#6B8E23",
"#FFA500",
"#FF4500",
"#DA70D6",
"#EEE8AA",
"#98FB98",
"#AFEEEE",
"#DB7093",
"#FFEFD5",
"#FFDAB9",
"#CD853F",
"#FFC0CB",
"#DDA0DD",
"#B0E0E6",
"#800080",
"#FF0000",
"#BC8F8F",
"#4169E1",
"#8B4513"];



MCCTypes = [];
MCCTypes[0742]="Veterinary Services";
MCCTypes[0763]="Agricultural Cooperative";
MCCTypes[0780]="Landscaping Services";
MCCTypes[1520]="General Contractors";
MCCTypes[1711]="Heating, Plumbing, A/C";
MCCTypes[1731]="Electrical Contractors";
MCCTypes[1740]="Masonry, Stonework, and Plaster";
MCCTypes[1750]="Carpentry Contractors";
MCCTypes[1761]="Roofing/Siding, Sheet Metal";
MCCTypes[1771]="Concrete Work Contractors";
MCCTypes[1799]="Special Trade Contractors";
MCCTypes[2741]="Miscellaneous Publishing and Printing";
MCCTypes[2791]="Typesetting, Plate Making, and Related Services";
MCCTypes[2842]="Specialty Cleaning";
MCCTypes[3000]="Airlines";
MCCTypes[3351]="Car Rental";
MCCTypes[3501]="Hotels/Motels/Inns/Resorts";
MCCTypes[4011]="Railroads";
MCCTypes[4111]="Commuter Transport, Ferries";
MCCTypes[4112]="Passenger Railways";
MCCTypes[4119]="Ambulance Services";
MCCTypes[4121]="Taxicabs/Limousines";
MCCTypes[4131]="Bus Lines";
MCCTypes[4214]="Motor Freight Carriers and Trucking - Local and Long Distance, Moving and Storage Companies, and Local Delivery Services";
MCCTypes[4215]="Courier Services";
MCCTypes[4225]="Public Warehousing and Storage - Farm Products, Refrigerated Goods, Household Goods, and Storage";
MCCTypes[4411]="Cruise Lines";
MCCTypes[4457]="Boat Rentals and Leases";
MCCTypes[4468]="Marinas, Service and Supplies";
MCCTypes[4511]="Airlines, Air Carriers";
MCCTypes[4582]="Airports, Flying Fields";
MCCTypes[4722]="Travel Agencies, Tour Operators";
MCCTypes[4723]="TUI Travel - Germany";
MCCTypes[4784]="Tolls/Bridge Fees";
MCCTypes[4789]="Transportation Services (Not Elsewhere Classified)";
MCCTypes[4812]="Telecommunication Equipment and Telephone Sales";
MCCTypes[4814]="Telecommunication Services";
MCCTypes[4816]="Computer Network Services";
MCCTypes[4821]="Telegraph Services";
MCCTypes[4829]="Wires, Money Orders";
MCCTypes[4899]="Cable, Satellite, and Other Pay Television and Radio";
MCCTypes[4900]="Utilities";
MCCTypes[5013]="Motor Vehicle Supplies and New Parts";
MCCTypes[5021]="Office and Commercial Furniture";
MCCTypes[5039]="Construction Materials (Not Elsewhere Classified)";
MCCTypes[5044]="Photographic, Photocopy, Microfilm Equipment, and Supplies";
MCCTypes[5045]="Computers, Peripherals, and Software";
MCCTypes[5046]="Commercial Equipment (Not Elsewhere Classified)";
MCCTypes[5047]="Medical, Dental, Ophthalmic, and Hospital Equipment and Supplies";
MCCTypes[5051]="Metal Service Centers";
MCCTypes[5065]="Electrical Parts and Equipment";
MCCTypes[5072]="Hardware, Equipment, and Supplies";
MCCTypes[5074]="Plumbing, Heating Equipment, and Supplies";
MCCTypes[5085]="Industrial Supplies (Not Elsewhere Classified)";
MCCTypes[5094]="Precious Stones and Metals, Watches and Jewelry";
MCCTypes[5099]="Durable Goods (Not Elsewhere Classified)";
MCCTypes[5111]="Stationary, Office Supplies, Printing and Writing Paper";
MCCTypes[5122]="Drugs, Drug Proprietaries, and Druggist Sundries";
MCCTypes[5131]="Piece Goods, Notions, and Other Dry Goods";
MCCTypes[5137]="Uniforms, Commercial Clothing";
MCCTypes[5139]="Commercial Footwear";
MCCTypes[5169]="Chemicals and Allied Products (Not Elsewhere Classified)";
MCCTypes[5172]="Petroleum and Petroleum Products";
MCCTypes[5192]="Books, Periodicals, and Newspapers";
MCCTypes[5193]="Florists Supplies, Nursery Stock, and Flowers";
MCCTypes[5198]="Paints, Varnishes, and Supplies";
MCCTypes[5199]="Nondurable Goods (Not Elsewhere Classified)";
MCCTypes[5200]="Home Supply Warehouse Stores";
MCCTypes[5211]="Lumber, Building Materials Stores";
MCCTypes[5231]="Glass, Paint, and Wallpaper Stores";
MCCTypes[5251]="Hardware Stores";
MCCTypes[5261]="Nurseries, Lawn and Garden Supply Stores";
MCCTypes[5271]="Mobile Home Dealers";
MCCTypes[5300]="Wholesale Clubs";
MCCTypes[5309]="Duty Free Stores";
MCCTypes[5310]="Discount Stores";
MCCTypes[5311]="Department Stores";
MCCTypes[5331]="Variety Stores";
MCCTypes[5399]="Miscellaneous General Merchandise";
MCCTypes[5411]="Zakupy spożywcze";
MCCTypes[5422]="Freezer and Locker Meat Provisioners";
MCCTypes[5441]="Candy, Nut, and Confectionery Stores";
MCCTypes[5451]="Dairy Products Stores";
MCCTypes[5462]="Bakeries";
MCCTypes[5499]="Miscellaneous Food Stores - Convenience Stores and Specialty Markets";
MCCTypes[5511]="Car and Truck Dealers (New & Used) Sales, Service, Repairs Parts and Leasing";
MCCTypes[5521]="Car and Truck Dealers (Used Only) Sales, Service, Repairs Parts and Leasing";
MCCTypes[5531]="Auto and Home Supply Stores";
MCCTypes[5532]="Automotive Tire Stores";
MCCTypes[5533]="Automotive Parts and Accessories Stores";
MCCTypes[5541]="Service Stations";
MCCTypes[5542]="Automated Fuel Dispensers";
MCCTypes[5551]="Boat Dealers";
MCCTypes[5561]="Motorcycle Shops, Dealers";
MCCTypes[5571]="Motorcycle Shops and Dealers";
MCCTypes[5592]="Motor Homes Dealers";
MCCTypes[5598]="Snowmobile Dealers";
MCCTypes[5599]="Miscellaneous Auto Dealers";
MCCTypes[5611]="Men’s and Boy’s Clothing and Accessories Stores";
MCCTypes[5621]="Women’s Ready-To-Wear Stores";
MCCTypes[5631]="Women’s Accessory and Specialty Shops";
MCCTypes[5641]="Children’s and Infant’s Wear Stores";
MCCTypes[5651]="Family Clothing Stores";
MCCTypes[5655]="Sports and Riding Apparel Stores";
MCCTypes[5661]="Shoe Stores";
MCCTypes[5681]="Furriers and Fur Shops";
MCCTypes[5691]="Men’s, Women’s Clothing Stores";
MCCTypes[5697]="Tailors, Alterations";
MCCTypes[5698]="Wig and Toupee Stores";
MCCTypes[5699]="Miscellaneous Apparel and Accessory Shops";
MCCTypes[5712]="Furniture, Home Furnishings, and Equipment Stores, Except Appliances";
MCCTypes[5713]="Floor Covering Stores";
MCCTypes[5714]="Drapery, Window Covering, and Upholstery Stores";
MCCTypes[5718]="Fireplace, Fireplace Screens, and Accessories Stores";
MCCTypes[5719]="Miscellaneous Home Furnishing Specialty Stores";
MCCTypes[5722]="Household Appliance Stores";
MCCTypes[5732]="Electronics Stores";
MCCTypes[5733]="Music Stores-Musical Instruments, Pianos, and Sheet Music";
MCCTypes[5734]="Computer Software Stores";
MCCTypes[5735]="Record Stores";
MCCTypes[5811]="Caterers";
MCCTypes[5812]="Eating Places, Restaurants";
MCCTypes[5813]="Drinking Places";
MCCTypes[5814]="Fast Food Restaurants";
MCCTypes[5912]="Drug Stores and Pharmacies";
MCCTypes[5921]="Package Stores-Beer, Wine, and Liquor";
MCCTypes[5931]="Used Merchandise and Secondhand Stores";
MCCTypes[5932]="Antique Shops";
MCCTypes[5933]="Pawn Shops";
MCCTypes[5935]="Wrecking and Salvage Yards";
MCCTypes[5937]="Antique Reproductions";
MCCTypes[5940]="Bicycle Shops";
MCCTypes[5941]="Sporting Goods Stores";
MCCTypes[5942]="Book Stores";
MCCTypes[5943]="Stationery Stores, Office, and School Supply Stores";
MCCTypes[5944]="Jewelry Stores, Watches, Clocks, and Silverware Stores";
MCCTypes[5945]="Hobby, Toy, and Game Shops";
MCCTypes[5946]="Camera and Photographic Supply Stores";
MCCTypes[5947]="Gift, Card, Novelty, and Souvenir Shops";
MCCTypes[5948]="Luggage and Leather Goods Stores";
MCCTypes[5949]="Sewing, Needlework, Fabric, and Piece Goods Stores";
MCCTypes[5950]="Glassware, Crystal Stores";
MCCTypes[5960]="Direct Marketing - Insurance Services";
MCCTypes[5962]="Direct Marketing - Travel";
MCCTypes[5963]="Door-To-Door Sales";
MCCTypes[5964]="Direct Marketing - Catalog Merchant";
MCCTypes[5965]="Direct Marketing - Combination Catalog and Retail Merchant";
MCCTypes[5966]="Direct Marketing - Outbound Tele";
MCCTypes[5967]="Direct Marketing - Inbound Tele";
MCCTypes[5968]="Direct Marketing - Subscription";
MCCTypes[5969]="Direct Marketing - Other";
MCCTypes[5970]="Artist’s Supply and Craft Shops";
MCCTypes[5971]="Art Dealers and Galleries";
MCCTypes[5972]="Stamp and Coin Stores";
MCCTypes[5973]="Religious Goods Stores";
MCCTypes[5975]="Hearing Aids Sales and Supplies";
MCCTypes[5976]="Orthopedic Goods - Prosthetic Devices";
MCCTypes[5977]="Cosmetic Stores";
MCCTypes[5978]="Typewriter Stores";
MCCTypes[5983]="Fuel Dealers (Non Automotive)";
MCCTypes[5992]="Florists";
MCCTypes[5993]="Cigar Stores and Stands";
MCCTypes[5994]="News Dealers and Newsstands";
MCCTypes[5995]="Pet Shops, Pet Food, and Supplies";
MCCTypes[5996]="Swimming Pools Sales";
MCCTypes[5997]="Electric Razor Stores";
MCCTypes[5998]="Tent and Awning Shops";
MCCTypes[5999]="Miscellaneous Specialty Retail";
MCCTypes[6010]="Manual Cash Disburse";
MCCTypes[6011]="Wypłata w bankomacie";
MCCTypes[6012]="Financial Institutions";
MCCTypes[6051]="Non-FI, Money Orders";
MCCTypes[6211]="Security Brokers/Dealers";
MCCTypes[6300]="Insurance Underwriting, Premiums";
MCCTypes[6399]="Insurance - Default";
MCCTypes[6513]="Real Estate Agents and Managers - Rentals";
MCCTypes[7011]="Hotels, Motels, and Resorts";
MCCTypes[7012]="Timeshares";
MCCTypes[7032]="Sporting/Recreation Camps";
MCCTypes[7033]="Trailer Parks, Campgrounds";
MCCTypes[7210]="Laundry, Cleaning Services";
MCCTypes[7211]="Laundries";
MCCTypes[7216]="Dry Cleaners";
MCCTypes[7217]="Carpet/Upholstery Cleaning";
MCCTypes[7221]="Photographic Studios";
MCCTypes[7230]="Barber and Beauty Shops";
MCCTypes[7251]="Shoe Repair/Hat Cleaning";
MCCTypes[7261]="Funeral Services, Crematories";
MCCTypes[7273]="Dating/Escort Services";
MCCTypes[7276]="Tax Preparation Services";
MCCTypes[7277]="Counseling Services";
MCCTypes[7278]="Buying/Shopping Services";
MCCTypes[7296]="Clothing Rental";
MCCTypes[7297]="Massage Parlors";
MCCTypes[7298]="Health and Beauty Spas";
MCCTypes[7299]="Miscellaneous General Services";
MCCTypes[7311]="Advertising Services";
MCCTypes[7321]="Credit Reporting Agencies";
MCCTypes[7333]="Commercial Photography, Art and Graphics";
MCCTypes[7338]="Quick Copy, Repro, and Blueprint";
MCCTypes[7339]="Secretarial Support Services";
MCCTypes[7342]="Exterminating Services";
MCCTypes[7349]="Cleaning and Maintenance";
MCCTypes[7361]="Employment/Temp Agencies";
MCCTypes[7372]="Computer Programming";
MCCTypes[7375]="Information Retrieval Services";
MCCTypes[7379]="Computer Repair";
MCCTypes[7392]="Consulting, Public Relations";
MCCTypes[7393]="Detective Agencies";
MCCTypes[7394]="Equipment Rental";
MCCTypes[7395]="Photo Developing";
MCCTypes[7399]="Miscellaneous Business Services";
MCCTypes[7511]="Truck Stop";
MCCTypes[7512]="Car Rental Agencies";
MCCTypes[7513]="Truck/Utility Trailer Rentals";
MCCTypes[7519]="Recreational Vehicle Rentals";
MCCTypes[7523]="Parking Lots, Garages";
MCCTypes[7531]="Auto Body Repair Shops";
MCCTypes[7534]="Tire Retreading and Repair";
MCCTypes[7535]="Auto Paint Shops";
MCCTypes[7538]="Auto Service Shops";
MCCTypes[7542]="Car Washes";
MCCTypes[7549]="Towing Services";
MCCTypes[7622]="Electronics Repair Shops";
MCCTypes[7623]="A/C, Refrigeration Repair";
MCCTypes[7629]="Small Appliance Repair";
MCCTypes[7631]="Watch/Jewelry Repair";
MCCTypes[7641]="Furniture Repair, Refinishing";
MCCTypes[7692]="Welding Repair";
MCCTypes[7699]="Miscellaneous Repair Shops";
MCCTypes[7829]="Picture/Video Production";
MCCTypes[7832]="Motion Picture Theaters";
MCCTypes[7841]="Video Tape Rental Stores";
MCCTypes[7911]="Dance Hall, Studios, Schools";
MCCTypes[7922]="Theatrical Ticket Agencies";
MCCTypes[7929]="Bands, Orchestras";
MCCTypes[7932]="Billiard/Pool Establishments";
MCCTypes[7933]="Bowling Alleys";
MCCTypes[7941]="Sports Clubs/Fields";
MCCTypes[7991]="Tourist Attractions and Exhibits";
MCCTypes[7992]="Golf Courses - Public";
MCCTypes[7993]="Video Amusement Game Supplies";
MCCTypes[7994]="Video Game Arcades";
MCCTypes[7995]="Betting/Casino Gambling";
MCCTypes[7996]="Amusement Parks/Carnivals";
MCCTypes[7997]="Country Clubs";
MCCTypes[7998]="Aquariums";
MCCTypes[7999]="Miscellaneous Recreation Services";
MCCTypes[8011]="Doctors";
MCCTypes[8021]="Dentists, Orthodontists";
MCCTypes[8031]="Osteopaths";
MCCTypes[8041]="Chiropractors";
MCCTypes[8042]="Optometrists, Ophthalmologist";
MCCTypes[8043]="Opticians, Eyeglasses";
MCCTypes[8049]="Chiropodists, Podiatrists";
MCCTypes[8050]="Nursing/Personal Care";
MCCTypes[8062]="Hospitals";
MCCTypes[8071]="Medical and Dental Labs";
MCCTypes[8099]="Medical Services";
MCCTypes[8111]="Legal Services, Attorneys";
MCCTypes[8211]="Elementary, Secondary Schools";
MCCTypes[8220]="Colleges, Universities";
MCCTypes[8241]="Correspondence Schools";
MCCTypes[8244]="Business/Secretarial Schools";
MCCTypes[8249]="Vocational/Trade Schools";
MCCTypes[8299]="Educational Services";
MCCTypes[8351]="Child Care Services";
MCCTypes[8398]="Charitable and Social Service Organizations - Fundraising";
MCCTypes[8641]="Civic, Social, Fraternal Associations";
MCCTypes[8651]="Political Organizations";
MCCTypes[8661]="Religious Organizations";
MCCTypes[8675]="Automobile Associations";
MCCTypes[8699]="Membership Organizations";
MCCTypes[8734]="Testing Laboratories";
MCCTypes[8911]="Architectural/Surveying Services";
MCCTypes[8931]="Accounting/Bookkeeping Services";
MCCTypes[8999]="Professional Services";
MCCTypes[9211]="Court Costs, Including Alimony and Child Support - Courts of Law";
MCCTypes[9222]="Fines - Government Administrative Entities";
MCCTypes[9223]="Bail and Bond Payments (payment to the surety for the bond, not the actual bond paid to the government agency)";
MCCTypes[9311]="Tax Payments - Government Agencies";
MCCTypes[9399]="Government Services (Not Elsewhere Classified)";
MCCTypes[9402]="Postal Services - Government Only";
MCCTypes[9405]="U.S. Federal Government Agencies or Departments";
MCCTypes[9950]="Intra-Company Purchases";
MCCTypes[3246]="RyanAir";

MCCTypes[5013]="Zaopatrzenie samochodowe, nowe części samochodowe";
MCCTypes[5021]="Meble sklepowe i biurowe";
MCCTypes[5039]="Materiały budowlane, nigdzie indziej niesklasyfikowane";
MCCTypes[5044]="Wyposażenie biurowe, fotograficzne, fotokopii i mikrofilmów";
MCCTypes[5045]="Oprogramowanie, komputerowe urządzenia peryferyjne, oprogramowanie";
MCCTypes[5046]="Wyposażenie handlowe, gdzie indziej niesklasyfikowana";
MCCTypes[5047]="Sprzęt szpitalny i zaopatrzenie medyczne, stomatologiczne i okulistyczne";
MCCTypes[5051]="Centra Serwisowe i biurowe";
MCCTypes[5065]="Części  i urządzenia elektryczne";
MCCTypes[5072]="Sprzęt komputerowy i materiały eksploatacyjne";
MCCTypes[5074]="Sprzęt sanitarny i grzejny";
MCCTypes[5085]="Dostawy przemysłowe, nigdzie indziej niesklasyfikowane";
MCCTypes[5094]="Szlachetne kamienie i metale, zegarki i biżuteria";
MCCTypes[5099]="Dobra trwałe, nigdzie indziej niesklasyfikowana";
MCCTypes[5111]="Artykuły papiernicze, biurowe, drukarnie i papier";
MCCTypes[5122]="Środki odurzające, właściciele aptek";
MCCTypes[5131]="Towary w kawałkach, galanteria i inne suche towary";
MCCTypes[5137]="Ubiory męskie, damskie i dziecięce";
MCCTypes[5139]="Obuwie";
MCCTypes[5169]="Chemikalia i produkty związane z nimi, nigdzie indziej niesklasyfikowane";
MCCTypes[5172]="Ropa naftowa i produkty naftowe - paliwo";
MCCTypes[5192]="Książki, czasopisma i prasa";
MCCTypes[5193]="Artykuły kwiaciarskie, materiał szkółkarski i kwiaty";
MCCTypes[5198]="Farby, lakiery i akcesoria";
MCCTypes[5199]="Towary nietrwałe, nigdzie indziej niesklasyfikowane";
MCCTypes[5200]="Dostawy domowe ze sklepów";
MCCTypes[5211]="Sklepy z drewnem i materiałami budowlanymi";
MCCTypes[5231]="Sklepy ze szkłem";
MCCTypes[5231]="Sklepy z farbami i tapetami";
MCCTypes[5231]="Sklep z tapetami";
MCCTypes[5251]="Sklepy ze sprzętem";
MCCTypes[5261]="Sklepy z zaopatrzeniem ogrodowym, trawniki, szkółki";
MCCTypes[5271]="Dealerzy mobilnych domków";
MCCTypes[5300]="Hurtownie";
MCCTypes[5309]="Sklepy wolnocłowe";
MCCTypes[5310]="Sklepy dyskontowe";
MCCTypes[5311]="Domy handlowe";
MCCTypes[5331]="Sklepy z różnościami";
MCCTypes[5399]="Różnorodne gadżety";
MCCTypes[5411]="Sklepy spożywcze";
MCCTypes[5411]="Supermarkety";
MCCTypes[5422]="Zamrażarki i szafki mięsne";
MCCTypes[5422]="Zamrażarki i szafki mięsne";
MCCTypes[5441]="Sklepy cukiernicze";
MCCTypes[5441]="Cukiernie";
MCCTypes[5441]="Sklepy z orzechami";
MCCTypes[5451]="Sklepy z nabiałem";
MCCTypes[5462]="Piekarnie";
MCCTypes[5499]="Sklepy spożywcze, sklepy pierwszej potrzeby i specjalne";
MCCTypes[5511]="Dealerzy samochodów osobowych i ciężarowych (nowe i używane) - sprzedaż, serwis, naprawy, części, leasing";
MCCTypes[5521]="Dealerzy samochodów i ciężarówek (tylko używane)";
MCCTypes[5531]="Sklepy samochodowe";
MCCTypes[5532]="Sklepy z oponami do samochodów";
MCCTypes[5533]="Sklepy z częściami i akcesoriami do samochodów";
MCCTypes[5541]="Stacje serwisowe (z lub bez usług dodatkowych)";
MCCTypes[5542]="Samoobsługowe stacje benzynowe";
MCCTypes[5551]="Dealerzy łodzi";
MCCTypes[5561]="Dealerzy przyczep kampingowych, rekreacyjnych";
MCCTypes[5571]="Dealerzy motocykli";
MCCTypes[5592]="Dealerzy samochodów kempingowych";
MCCTypes[5598]="Dealerzy pojazdów śniegowych";
MCCTypes[5611]="Sklepy z akcesoriami i odzieżą męską i chłopięcą";
MCCTypes[5621]="Sklepy z odzieżą damskią";
MCCTypes[5631]="Sklepy specjalistyczne z damskimi akcesoriami";
MCCTypes[5641]="Odzież dla dzieci i niemowląt";
MCCTypes[5651]="Sklepy odzieżowe rodzinne";
MCCTypes[5655]="Stroje i akcesoria sportowe";
MCCTypes[5661]="Sklepy obuwnicze";
MCCTypes[5681]="Kuśnierze i sklepy z futrami";
MCCTypes[5691]="Sklepy z odzieżą dla mężczyzn i damskich";
MCCTypes[5697]="Krawiec, szwaczka, cerowania";
MCCTypes[5698]="Sklepy z perukami i czapkami";
MCCTypes[5699]="Sklepy z innymi akcesoriami i odzieżą";
MCCTypes[5712]="Meble, wyposażenie wnętrz, wyposażenie magazynów, z wyjątkiem urządzeń";
MCCTypes[5713]="Sklepy z wykładzinami podłogowymi";
MCCTypes[5714]="Sklepy z firanami, zasłonami do okien oraz sklepy tapicerskie";
MCCTypes[5718]="Sklepy z kominkami, ekrany kominkowe i akcesoria";
MCCTypes[5719]="Sklepy z akcesoriami meblowymi";
MCCTypes[5722]="Sklepy z urządzeniami AGD";
MCCTypes[5732]="Sprzedaż urządzeń elektronicznych";
MCCTypes[5733]="Sklepy z muzyka, instrumentami muzycznymi, papierem muzycznym";
MCCTypes[5734]="Sklepy z oprogramowaniem komputerowym";
MCCTypes[5735]="Sklepy muzyczne";
MCCTypes[5811]="Firmy cateringowe";
MCCTypes[5812]="Restauracje, gastronomia";
MCCTypes[5813]="Pijalnie (napoje alkoholowe), bary, tawerny, kluby nocne i dyskoteki";
MCCTypes[5814]="Fast foody";
MCCTypes[5912]="Drogerie i apteki";
MCCTypes[5921]="Sklepy z piwem, winem, alkoholem";
MCCTypes[5931]="Sklep z rzeczami używanymi, gadżetami";
MCCTypes[5832]="Antykwariaty - sprzedaż, naprawa i usługi konserwatorskie";
MCCTypes[5933]="Lombardy";
MCCTypes[5935]="Rozbiórki";
MCCTypes[5937]="Reprodukcje antyków";
MCCTypes[5940]="Sklepy rowerowe - sprzedaż i serwis";
MCCTypes[5941]="Sprzęt sportowy";
MCCTypes[5942]="Księgarnie";
MCCTypes[5943]="Sklepy papiernicze, artykułów biurowych i szkolnych";
MCCTypes[5944]="Sklepy z zegarkami, biżuterią i srebrem - Jubilerzy";
MCCTypes[5945]="Sklepy z zabawkami, grami";
MCCTypes[5946]="Sklepy z aparatami fotograficznymi oraz osprzętem";
MCCTypes[5947]="Sklepy z prezentami, gadżetami oraz sklepy z pamiątkami";
MCCTypes[5948]="Sklepy ze skórą";
MCCTypes[5949]="Sklepy z artykułami do szycia, igły, tkaniny";
MCCTypes[5950]="Sklepy ze szkłem / kryształami";
MCCTypes[5960]="Marketing bezpośredni - usługi ubezpieczenia";
MCCTypes[5961]="Domy sprzedaży wysyłkowej włącznie z zamówieniami z katalogów (nie jest już dozwolone)";
MCCTypes[5962]="Marketing bezpośredni - usługi biur podróży";
MCCTypes[5963]="Sprzedaż bezpośrednia (drzwi w drzwi)";
MCCTypes[5964]="Marketing bezpośredni - Katalogi sprzedawcy";
MCCTypes[5965]="Marketing bezpośredni - Katalogi i wykazy sprzedawcy detalicznego";
MCCTypes[5966]="Marketing bezpośredni - telemarketing";
MCCTypes[5967]="Marketing bezpośredni - TeleSerwis";
MCCTypes[5968]="Marketing bezpośredni - Subskrypcje";
MCCTypes[5969]="Marketing bezpośredni - nigdzie indziej nie sklasyfikowane";
MCCTypes[5970]="Sklepy z artykułami artystycznymi, rękodziełem";
MCCTypes[5971]="Marszandzi i galerie sztuki";
MCCTypes[5972]="Sklepy z pieczątkami i pieniędzmi - akcesoria filatelistyczne i numizmatyczne";
MCCTypes[5973]="Dewocjonalia";
MCCTypes[5975]="Sklepy z aparatami słuchowymi - sprzedaż, serwis";
MCCTypes[5976]="Sprzęt ortopedyczny - urządzenia protetyczne";
MCCTypes[5977]="Sklepy kosmetyczne - drogerie";
MCCTypes[5978]="Sklepy z maszynami do pisania - sprzedaż, wynajem, serwis";
MCCTypes[5983]="Stacje benzynowe - olej opałowy, drewno, węgiel, benzyna";
MCCTypes[5992]="Kwiaciarnie";
MCCTypes[5993]="Sklepy z cygarami";
MCCTypes[5994]="Kolportarz gazet";
MCCTypes[5995]="Sklepy zoologiczne, pokarm dla zwierząt domowych, akcesoria";
MCCTypes[5996]="Baseny - sprzedaż, serwis i materiały eksploatacyjne";
MCCTypes[5997]="Sklepy z golarkami elektrycznymi - sprzedaż i serwis";
MCCTypes[5998]="Sklepy z namiotami";
MCCTypes[5999]="Sklepy z różnościami";
