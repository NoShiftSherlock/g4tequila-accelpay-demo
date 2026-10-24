/* G4 Tequila demo: the PKGD Group Shopify store (shop.pkgdgroup.com) with the AccelPay
 * Shopify app in place of the Bottle Nexus cart embed.
 *
 * The storefront, cart drawer and one-page checkout imitate Shopify. What AccelPay adds
 * is shown as small callouts at checkout: payments, taxes and routing each order to a
 * licensed retailer by the shipping address. No third-party cart.
 *
 * Express checkout (Shop Pay, Apple Pay, Google Pay) is supported by the AccelPay Shopify
 * integration and is shown at the top of checkout and in the cart drawer. In the demo the
 * buttons fill a sample contact and address and continue.
 *
 * WHAT IS REAL AND WHAT IS NOT
 *   Real:  G4 products, images, copy and Shopify prices from shop.pkgdgroup.com
 *          (products.json, 2026-10-24). Retailers with G4 in stock, cities and stock, from the
 *          ReserveBar/AccelPay retailer catalog and retailer inventory feeds, 2026-10-24. Gopuff
 *          delivery ZIPs of the 109 locations listing G4 in a live check, 2026-10-24.
 *          Anejo price: the most common network retailer price.
 *   Not:   shipping and delivery rates, the tax rate, the payment step. No order is ever placed.
 */
(function () {
  'use strict';

  const MAIN = 'g4-tequila-blanco';
  const CATALOG = {
    'g4-tequila-blanco': {
      name: 'G4 Blanco', short: 'G4 Blanco', size: '750ML', tag: 'Tequila',
      price: 4999, shop: true,
      image: 'assets/g4-blanco.png', gallery: ['assets/g4-blanco.png', 'assets/hero-bottles.jpg'],
      lead: 'The purest expression of Blue Weber agave.', specs: 'BLANCO / 40% ABV / 750ML',
      desc: ['G4 Blanco, the purest expression of Blue Weber agave, offers a silky texture and delicate minerality, making it a favorite among tequila lovers.',
             'Made at El Pandillo Distillery in Jalisco from oven-baked Los Altos agave, ancestral yeast, and a blend of rainwater and spring water.']
    },
    'g4-reposado': {
      name: 'G4 Reposado', short: 'G4 Reposado', size: '750ML', tag: 'Tequila',
      price: 5999, shop: true,
      image: 'assets/g4-reposado.png', gallery: ['assets/g4-reposado.png', 'assets/hero-bottles.jpg'],
      lead: 'Aged six months in whiskey barrels.', specs: 'REPOSADO / 40% ABV / 750ML',
      desc: ['Aged six months in whiskey barrels, this Reposado blends floral, herbal, and citrus notes from Rancho El Pandillo’s landscape.']
    },
    'g4-high-proof': {
      name: 'G4 High Proof', short: 'G4 High Proof', size: '750ML', tag: 'Tequila',
      price: 5999, shop: true,
      image: 'assets/g4-high-proof.png', gallery: ['assets/g4-high-proof.png'],
      lead: 'G4 Blanco 108.', specs: 'BLANCO / 108 PROOF / 750ML',
      desc: ['G4 Blanco 108 is a bold, high-proof expression with complex aromas, a long finish, and perfect texture.']
    },
    'g4-madera': {
      name: 'G4 Madera', short: 'G4 Madera', size: '750ML', tag: 'Tequila',
      price: 6999, shop: true,
      image: 'assets/g4-madera.png', gallery: ['assets/g4-madera.png'],
      lead: 'Limited edition, hand-numbered Blanco.', specs: 'BLANCO / 750ML',
      desc: ['G4 Madera is a limited-edition, hand-numbered Blanco tequila made with deep well water, offering unique depth and complexity.']
    },
    'g4-anejo': {
      name: 'G4 Añejo', short: 'G4 Añejo', size: '750ML', tag: 'Tequila',
      price: 8262, shop: false,
      image: 'assets/anejo-bottle.jpg', gallery: ['assets/anejo-bottle.jpg', 'assets/anejo.png'],
      lead: 'Balanced and refined, with subtle oak and vanilla notes.', specs: 'AÑEJO / 750ML',
      desc: ['Not in the online shop today, but 27 licensed retailers in the network have G4 Añejo in stock (Texas, Florida and Washington, DC). With the AccelPay app it can be sold here too, filled from those retailers.',
             'Price shown is the most common retailer price in the network. Licensed retailers set the final retail price.']
    }
  };
  const ORDER = ['g4-tequila-blanco', 'g4-reposado', 'g4-high-proof', 'g4-madera', 'g4-anejo'];
  // Gopuff locations list G4 Blanco and Reposado in the retailer feed.
  const GOPUFF_HANDLES = ['g4-tequila-blanco', 'g4-reposado'];

  // REAL: licensed retailers with an active, in-stock G4 listing in the ReserveBar/AccelPay
  // retailer catalog (synced Sept 1 to Oct 24 2026) or on their own inventory feed, a few per state.
  // Stock per handle; feed sentinels (1000+) are capped.
  const RETAILERS = [{"id":"specs0houston","name":"Spec's Wines, Spirits & Finer Foods","city":"Houston","st":"TX","skus":{"g4-tequila-blanco":6,"g4-reposado":4,"g4-anejo":1}},
    {"id":"specs62austin","name":"Spec's Wines, Spirits & Finer Foods","city":"Austin","st":"TX","skus":{"g4-tequila-blanco":14,"g4-reposado":2,"g4-anejo":3}},
    {"id":"specs150dallas","name":"Spec's Wines, Spirits & Finer Foods","city":"Dallas","st":"TX","skus":{"g4-reposado":6,"g4-anejo":3,"g4-tequila-blanco":18}},
    {"id":"specs100sanantonio","name":"Spec's Wines, Spirits & Finer Foods","city":"San Antonio","st":"TX","skus":{"g4-anejo":6,"g4-tequila-blanco":11,"g4-reposado":5}},
    {"id":"specs128addison","name":"Spec's Wines, Spirits & Finer Foods","city":"Addison","st":"TX","skus":{"g4-reposado":10,"g4-tequila-blanco":6,"g4-anejo":6}},
    {"id":"beveragebossnewhaven","name":"Beverage Boss","city":"New Haven","st":"CT","skus":{"g4-tequila-blanco":24}},
    {"id":"remedyliquorglendale","name":"Remedy Liquor","city":"Glendale","st":"CA","skus":{"g4-tequila-blanco":24,"g4-madera":24,"g4-reposado":24}},
    {"id":"mainstreetliquorsandie","name":"Main Street Liquor","city":"San Diego","st":"CA","skus":{"g4-tequila-blanco":7,"g4-high-proof":4}},
    {"id":"101winecompanyencinita","name":"101 Wine Company","city":"Encinitas","st":"CA","skus":{"g4-tequila-blanco":28}},
    {"id":"acespiritshopkins","name":"Ace Spirits","city":"Hopkins","st":"MN","skus":{"g4-reposado":4}},
    {"id":"remedynyqueens","name":"Remedy NY","city":"Queens","st":"NY","skus":{"g4-reposado":34,"g4-tequila-blanco":17,"g4-madera":16},"localZip3":["110","111","113","114"]},
    {"id":"michaeltownewinespirit","name":"Michael Towne Wine & Spirits","city":"New York","st":"NY","skus":{"g4-reposado":8,"g4-tequila-blanco":5}},
    {"id":"primoliquorsfinewinefo","name":"Primo Liquors & Fine Wine","city":"Fort Lauderdale","st":"FL","skus":{"g4-tequila-blanco":24,"g4-reposado":24,"g4-anejo":13}},
    {"id":"patsliquoroviedo","name":"Pat's Liquor","city":"Oviedo","st":"FL","skus":{"g4-reposado":24,"g4-tequila-blanco":24}},
    {"id":"maisonmuramiami","name":"Maison MURA","city":"Miami","st":"FL","skus":{"g4-anejo":1,"g4-reposado":6}},
    {"id":"1westdupontwineliquors","name":"1 West Dupont Wine & Liquors","city":"Washington","st":"DC","skus":{"g4-tequila-blanco":39,"g4-reposado":39},"localZip3":["200"]},
    {"id":"exoticwinespiritswashi","name":"Exotic Wine & Spirits","city":"Washington","st":"DC","skus":{"g4-anejo":11,"g4-reposado":5}},
    {"id":"bottlerepublicsomerset","name":"Bottle Republic","city":"Somerset","st":"NJ","skus":{"g4-tequila-blanco":22,"g4-madera":3,"g4-reposado":21}},
    {"id":"mayfairliquorsdenver","name":"Mayfair Liquors","city":"Denver","st":"CO","skus":{"g4-tequila-blanco":9,"g4-reposado":13,"g4-madera":9}},
    {"id":"heritagewineandmorecen","name":"Heritage Wine and More","city":"Centennial","st":"CO","skus":{"g4-reposado":2,"g4-tequila-blanco":8,"g4-madera":7}},
    {"id":"liquorbarnwheeling","name":"Liquor Barn","city":"Wheeling","st":"IL","skus":{"g4-tequila-blanco":39,"g4-madera":6,"g4-high-proof":9,"g4-reposado":8},"localZip3":["600"]},
    {"id":"georgiosliquorswaltham","name":"Georgio's Liquors - Waltham","city":"Waltham","st":"MA","skus":{"g4-reposado":12,"g4-tequila-blanco":4}},
    {"id":"georgiosliquorsbilleri","name":"Georgio's Liquors - Billerica","city":"Billerica","st":"MA","skus":{"g4-reposado":7,"g4-tequila-blanco":2}}];
  // REAL: delivery ZIPs of the 109 Gopuff locations listing G4 in a live check, 2026-10-24 (ZIP -> city).
  const GOPUFF_ZIPS = {"92503":"Corona","92505":"Corona","92570":"Corona","92860":"Corona","92878":"Corona","92879":"Corona","92881":"Corona","92882":"Corona","92883":"Corona","94525":"Pinole","94530":"Pinole","94547":"Pinole","94553":"Pinole","94564":"Pinole","94569":"Pinole","94572":"Pinole","94801":"Pinole","94803":"Pinole","94804":"Pinole","94805":"Pinole","94806":"Pinole","94002":"San Mateo","94010":"San Mateo","94019":"San Mateo","94025":"San Mateo","94027":"San Mateo","94061":"San Mateo","94062":"San Mateo","94063":"San Mateo","94065":"San Mateo","94070":"San Mateo","94303":"San Mateo","94401":"San Mateo","94402":"San Mateo","94403":"San Mateo","94404":"San Mateo","90601":"City of Industry","91706":"City of Industry","91709":"City of Industry","91724":"City of Industry","91732":"City of Industry","91733":"City of Industry","91744":"City of Industry","91745":"City of Industry","91746":"City of Industry","91748":"City of Industry","91765":"City of Industry","91766":"City of Industry","91768":"City of Industry","91773":"City of Industry","91789":"City of Industry","91790":"City of Industry","91791":"City of Industry","91792":"City of Industry","92821":"City of Industry","93619":"Fresno","93636":"Fresno","93650":"Fresno","93701":"Fresno","93702":"Fresno","93703":"Fresno","93704":"Fresno","93705":"Fresno","93710":"Fresno","93711":"Fresno","93720":"Fresno","93721":"Fresno","93722":"Fresno","93723":"Fresno","93726":"Fresno","93728":"Fresno","93730":"Fresno","93741":"Fresno","94903":"Novato","94945":"Novato","94947":"Novato","94949":"Novato","94952":"Novato","94954":"Novato","94960":"Novato","93221":"Visalia","93223":"Visalia","93274":"Visalia","93277":"Visalia","93291":"Visalia","93292":"Visalia","94533":"Fairfield","94534":"Fairfield","85029":"Glendale","85053":"Glendale","85302":"Glendale","85304":"Glendale","85306":"Glendale","85308":"Glendale","85310":"Glendale","85335":"Glendale","85345":"Glendale","85351":"Glendale","85363":"Glendale","85373":"Glendale","85374":"Glendale","85375":"Glendale","85378":"Glendale","85379":"Glendale","85381":"Glendale","85382":"Glendale","85383":"Glendale","93534":"Palmdale","93535":"Palmdale","93536":"Palmdale","93543":"Palmdale","93550":"Palmdale","93551":"Palmdale","93552":"Palmdale","95319":"Riverbank","95320":"Riverbank","95350":"Riverbank","95354":"Riverbank","95355":"Riverbank","95356":"Riverbank","95357":"Riverbank","95361":"Riverbank","95367":"Riverbank","95605":"Sacramento","95626":"Sacramento","95652":"Sacramento","95660":"Sacramento","95673":"Sacramento","95811":"Sacramento","95815":"Sacramento","95821":"Sacramento","95833":"Sacramento","95834":"Sacramento","95835":"Sacramento","95836":"Sacramento","95838":"Sacramento","95608":"Sacramento","95655":"Sacramento","95670":"Sacramento","95816":"Sacramento","95819":"Sacramento","95820":"Sacramento","95825":"Sacramento","95826":"Sacramento","95827":"Sacramento","95828":"Sacramento","95829":"Sacramento","95841":"Sacramento","95864":"Sacramento","90247":"Torrance","90248":"Torrance","90254":"Torrance","90260":"Torrance","90274":"Torrance","90277":"Torrance","90278":"Torrance","90501":"Torrance","90502":"Torrance","90503":"Torrance","90504":"Torrance","90505":"Torrance","90506":"Torrance","90745":"Torrance","90746":"Torrance","90747":"Torrance","91710":"Upland","91711":"Upland","91730":"Upland","91750":"Upland","91761":"Upland","91762":"Upland","91763":"Upland","91764":"Upland","91767":"Upland","91786":"Upland","94507":"Walnut Creek","94518":"Walnut Creek","94520":"Walnut Creek","94523":"Walnut Creek","94549":"Walnut Creek","94556":"Walnut Creek","94563":"Walnut Creek","94595":"Walnut Creek","94596":"Walnut Creek","94597":"Walnut Creek","94598":"Walnut Creek","94602":"Walnut Creek","94611":"Walnut Creek","94618":"Walnut Creek","94705":"Walnut Creek","94708":"Walnut Creek","94720":"Walnut Creek","95926":"Chico","95928":"Chico","95938":"Chico","95973":"Chico","95610":"Citrus Heights","95621":"Citrus Heights","95628":"Citrus Heights","95630":"Citrus Heights","95661":"Citrus Heights","95662":"Citrus Heights","95678":"Citrus Heights","95683":"Citrus Heights","95742":"Citrus Heights","95746":"Citrus Heights","95747":"Citrus Heights","95842":"Citrus Heights","95843":"Citrus Heights","93611":"Clovis","93612":"Clovis","93657":"Clovis","93725":"Clovis","93727":"Clovis","93737":"Clovis","94005":"Colma","94014":"Colma","94015":"Colma","94030":"Colma","94044":"Colma","94066":"Colma","94080":"Colma","94112":"Colma","94116":"Colma","94127":"Colma","94128":"Colma","94132":"Colma","92024":"Escondido","92025":"Escondido","92026":"Escondido","92027":"Escondido","92029":"Escondido","92067":"Escondido","92069":"Escondido","92078":"Escondido","92084":"Escondido","92091":"Escondido","92096":"Escondido","92127":"Escondido","91752":"Jurupa Valley","92509":"Jurupa Valley","94089":"Milpitas","94538":"Milpitas","94539":"Milpitas","95002":"Milpitas","95035":"Milpitas","95054":"Milpitas","95110":"Milpitas","95112":"Milpitas","95116":"Milpitas","95127":"Milpitas","95131":"Milpitas","95132":"Milpitas","95133":"Milpitas","95134":"Milpitas","95307":"Modesto","95326":"Modesto","95351":"Modesto","95358":"Modesto","95366":"Modesto","95368":"Modesto","85083":"Peoria","85085":"Peoria","85387":"Peoria","92313":"Redlands","92318":"Redlands","92324":"Redlands","92346":"Redlands","92350":"Redlands","92354":"Redlands","92359":"Redlands","92373":"Redlands","92374":"Redlands","92399":"Redlands","92401":"Redlands","92404":"Redlands","92405":"Redlands","92407":"Redlands","92408":"Redlands","92410":"Redlands","92415":"Redlands","95648":"Roseville","95650":"Roseville","95663":"Roseville","95668":"Roseville","95677":"Roseville","95765":"Roseville","92104":"San Diego","92101":"San Diego","92103":"San Diego","92102":"San Diego","92110":"San Diego","92117":"San Diego","92116":"San Diego","92123":"San Diego","92108":"San Diego","92106":"San Diego","92107":"San Diego","92111":"San Diego","92113":"San Diego","92140":"San Diego","92134":"San Diego","92132":"San Diego","92147":"San Diego","93013":"Santa Barbara","93067":"Santa Barbara","93101":"Santa Barbara","93103":"Santa Barbara","93105":"Santa Barbara","93108":"Santa Barbara","93109":"Santa Barbara","93110":"Santa Barbara","93111":"Santa Barbara","92562":"Temecula","92563":"Temecula","92584":"Temecula","92590":"Temecula","92591":"Temecula","92592":"Temecula","92596":"Temecula","90275":"Torrance","90710":"Torrance","90717":"Torrance","90731":"Torrance","90732":"Torrance","90744":"Torrance","90802":"Torrance","90806":"Torrance","90810":"Torrance","90813":"Torrance","94505":"Tracy","94514":"Tracy","94550":"Tracy","95304":"Tracy","95376":"Tracy","95377":"Tracy","95391":"Tracy","91701":"Upland","91737":"Upland","91759":"Upland","91784":"Upland","93563":"Upland","98004":"Bellevue","98005":"Bellevue","98006":"Bellevue","98033":"Bellevue","98034":"Bellevue","98039":"Bellevue","98040":"Bellevue","95003":"Capitola","95010":"Capitola","95018":"Capitola","95060":"Capitola","95062":"Capitola","95064":"Capitola","95065":"Capitola","95066":"Capitola","95073":"Capitola","95076":"Capitola","85044":"Chandler","85045":"Chandler","85048":"Chandler","85226":"Chandler","85283":"Chandler","85284":"Chandler","85339":"Chandler","91708":"Chino","94607":"Emeryville","94608":"Emeryville","94609":"Emeryville","94702":"Emeryville","94703":"Emeryville","94704":"Emeryville","94709":"Emeryville","94710":"Emeryville","91008":"Glendora","91010":"Glendora","91702":"Glendora","91722":"Glendora","91723":"Glendora","91740":"Glendora","91741":"Glendora","92602":"Irvine","92603":"Irvine","92604":"Irvine","92606":"Irvine","92612":"Irvine","92614":"Irvine","92617":"Irvine","92618":"Irvine","92620":"Irvine","92660":"Irvine","92697":"Irvine","92701":"Irvine","92703":"Irvine","92704":"Irvine","92705":"Irvine","92707":"Irvine","92780":"Irvine","92782":"Irvine","91935":"La Mesa","91941":"La Mesa","91942":"La Mesa","91945":"La Mesa","91977":"La Mesa","91978":"La Mesa","92019":"La Mesa","92020":"La Mesa","92021":"La Mesa","92071":"La Mesa","92105":"La Mesa","92114":"La Mesa","92115":"La Mesa","92119":"La Mesa","92120":"La Mesa","92124":"La Mesa","92182":"La Mesa","92201":"La Quinta","92203":"La Quinta","92210":"La Quinta","92211":"La Quinta","92236":"La Quinta","92241":"La Quinta","92253":"La Quinta","92260":"La Quinta","92270":"La Quinta","92274":"La Quinta","92276":"La Quinta","92610":"Lake Forest","92630":"Lake Forest","92637":"Lake Forest","92651":"Lake Forest","92653":"Lake Forest","92656":"Lake Forest","92675":"Lake Forest","92676":"Lake Forest","92679":"Lake Forest","92688":"Lake Forest","92691":"Lake Forest","92692":"Lake Forest","90016":"Los Angeles","90018":"Los Angeles","90019":"Los Angeles","90024":"Los Angeles","90034":"Los Angeles","90035":"Los Angeles","90036":"Los Angeles","90046":"Los Angeles","90048":"Los Angeles","90064":"Los Angeles","90067":"Los Angeles","90069":"Los Angeles","90077":"Los Angeles","90210":"Los Angeles","90211":"Los Angeles","90212":"Los Angeles","90232":"Los Angeles","91604":"Los Angeles","92234":"Palm Springs","92240":"Palm Springs","92258":"Palm Springs","92262":"Palm Springs","92264":"Palm Springs","85022":"Phoenix","85023":"Phoenix","85024":"Phoenix","85027":"Phoenix","85032":"Phoenix","85050":"Phoenix","85054":"Phoenix","85086":"Phoenix","91739":"Rancho Cucamonga","92316":"Rancho Cucamonga","92335":"Rancho Cucamonga","92336":"Rancho Cucamonga","92337":"Rancho Cucamonga","92376":"Rancho Cucamonga","92377":"Rancho Cucamonga","96001":"Redding","96002":"Redding","96003":"Redding","96008":"Redding","96019":"Redding","96062":"Redding","96069":"Redding","96073":"Redding","92064":"San Diego","92121":"San Diego","92122":"San Diego","92126":"San Diego","92128":"San Diego","92129":"San Diego","92130":"San Diego","92131":"San Diego","92145":"San Diego","95008":"San Jose","95013":"San Jose","95111":"San Jose","95113":"San Jose","95118":"San Jose","95119":"San Jose","95120":"San Jose","95121":"San Jose","95122":"San Jose","95123":"San Jose","95124":"San Jose","95125":"San Jose","95126":"San Jose","95135":"San Jose","95136":"San Jose","95138":"San Jose","95139":"San Jose","95148":"San Jose","95192":"San Jose","94901":"San Rafael","94904":"San Rafael","94925":"San Rafael","94930":"San Rafael","94939":"San Rafael","94957":"San Rafael","94964":"San Rafael","94973":"San Rafael","94085":"Santa Clara","94086":"Santa Clara","94087":"Santa Clara","95014":"Santa Clara","95050":"Santa Clara","95051":"Santa Clara","95053":"Santa Clara","95117":"Santa Clara","95128":"Santa Clara","95129":"Santa Clara","95130":"Santa Clara","91321":"Santa Clarita","91325":"Santa Clarita","91326":"Santa Clarita","91331":"Santa Clarita","91340":"Santa Clarita","91342":"Santa Clarita","91343":"Santa Clarita","91344":"Santa Clarita","91345":"Santa Clarita","91350":"Santa Clarita","91351":"Santa Clarita","91355":"Santa Clarita","91381":"Santa Clarita","91387":"Santa Clarita","91390":"Santa Clarita","91402":"Santa Clarita","94928":"Santa Rosa","94931":"Santa Rosa","94951":"Santa Rosa","95401":"Santa Rosa","95403":"Santa Rosa","95404":"Santa Rosa","95405":"Santa Rosa","95407":"Santa Rosa","95409":"Santa Rosa","95439":"Santa Rosa","95448":"Santa Rosa","95472":"Santa Rosa","95492":"Santa Rosa","95202":"Stockton","95203":"Stockton","95204":"Stockton","95205":"Stockton","95206":"Stockton","95207":"Stockton","95209":"Stockton","95210":"Stockton","95211":"Stockton","95212":"Stockton","95215":"Stockton","95219":"Stockton","95240":"Stockton","95242":"Stockton","90265":"Thousand Oaks","91301":"Thousand Oaks","91302":"Thousand Oaks","91307":"Thousand Oaks","91320":"Thousand Oaks","91360":"Thousand Oaks","91361":"Thousand Oaks","91362":"Thousand Oaks","91377":"Thousand Oaks","93012":"Thousand Oaks","93065":"Thousand Oaks","85619":"Tucson","85707":"Tucson","85708":"Tucson","85710":"Tucson","85711":"Tucson","85712":"Tucson","85713":"Tucson","85715":"Tucson","85716":"Tucson","85718":"Tucson","85730":"Tucson","85747":"Tucson","85748":"Tucson","85749":"Tucson","85750":"Tucson","91354":"Valencia","91384":"Valencia","93001":"Ventura","93003":"Ventura","93004":"Ventura","93030":"Ventura","93033":"Ventura","93035":"Ventura","93036":"Ventura","93041":"Ventura","93043":"Ventura","93060":"Ventura","93066":"Ventura","92003":"Vista","92009":"Vista","92010":"Vista","92056":"Vista","92057":"Vista","92081":"Vista","92083":"Vista","94706":"Albany","94707":"Albany","98225":"Bellingham","98226":"Bellingham","98229":"Bellingham","98247":"Bellingham","98248":"Bellingham","98264":"Bellingham","90027":"Burbank","90068":"Burbank","91040":"Burbank","91042":"Burbank","91201":"Burbank","91202":"Burbank","91207":"Burbank","91352":"Burbank","91501":"Burbank","91502":"Burbank","91504":"Burbank","91505":"Burbank","91506":"Burbank","91521":"Burbank","91522":"Burbank","91523":"Burbank","91601":"Burbank","91602":"Burbank","91605":"Burbank","91606":"Burbank","91607":"Burbank","91608":"Burbank","91915":"Chula Vista","91902":"Chula Vista","91914":"Chula Vista","91911":"Chula Vista","91910":"Chula Vista","91913":"Chula Vista","92139":"Chula Vista","90001":"Culver City","90003":"Culver City","90007":"Culver City","90008":"Culver City","90011":"Culver City","90037":"Culver City","90043":"Culver City","90044":"Culver City","90045":"Culver City","90047":"Culver City","90056":"Culver City","90058":"Culver City","90062":"Culver City","90066":"Culver City","90089":"Culver City","90094":"Culver City","90230":"Culver City","90291":"Culver City","90292":"Culver City","90293":"Culver City","90301":"Culver City","90302":"Culver City","90305":"Culver City","90620":"Cypress","90621":"Cypress","90623":"Cypress","90630":"Cypress","90638":"Cypress","90670":"Cypress","90680":"Cypress","90701":"Cypress","90703":"Cypress","90713":"Cypress","90715":"Cypress","90716":"Cypress","90720":"Cypress","90740":"Cypress","90742":"Cypress","90743":"Cypress","90755":"Cypress","90803":"Cypress","90804":"Cypress","90808":"Cypress","90814":"Cypress","90815":"Cypress","90840":"Cypress","92647":"Cypress","92648":"Cypress","92649":"Cypress","92655":"Cypress","92683":"Cypress","92706":"Cypress","92708":"Cypress","92801":"Cypress","92802":"Cypress","92804":"Cypress","92805":"Cypress","92833":"Cypress","92840":"Cypress","92841":"Cypress","92843":"Cypress","92844":"Cypress","92845":"Cypress","92007":"Encinitas","92008":"Encinitas","92011":"Encinitas","92014":"Encinitas","92075":"Encinitas","94536":"Fremont","94544":"Fremont","94555":"Fremont","94560":"Fremont","94587":"Fremont","85037":"Goodyear","85307":"Goodyear","85309":"Goodyear","85323":"Goodyear","85326":"Goodyear","85329":"Goodyear","85338":"Goodyear","85340":"Goodyear","85353":"Goodyear","85355":"Goodyear","85392":"Goodyear","85395":"Goodyear","85396":"Goodyear","92037":"La Jolla","92109":"La Jolla","92501":"Moreno Valley","92504":"Moreno Valley","92506":"Moreno Valley","92507":"Moreno Valley","92508":"Moreno Valley","92518":"Moreno Valley","92521":"Moreno Valley","92551":"Moreno Valley","92553":"Moreno Valley","92555":"Moreno Valley","92557":"Moreno Valley","92571":"Moreno Valley","92530":"Murrieta","92595":"Murrieta","92054":"Oceanside","92055":"Oceanside","92058":"Oceanside","92806":"Orange","92807":"Orange","92808":"Orange","92823":"Orange","92831":"Orange","92832":"Orange","92835":"Orange","92861":"Orange","92865":"Orange","92866":"Orange","92867":"Orange","92868":"Orange","92869":"Orange","92870":"Orange","92886":"Orange","92887":"Orange","91001":"Pasadena","91006":"Pasadena","91007":"Pasadena","91011":"Pasadena","91016":"Pasadena","91024":"Pasadena","91101":"Pasadena","91104":"Pasadena","91106":"Pasadena","91107":"Pasadena","91108":"Pasadena","91731":"Pasadena","91770":"Pasadena","91775":"Pasadena","91776":"Pasadena","91780":"Pasadena","91801":"Pasadena","94506":"Pleasanton","94551":"Pleasanton","94566":"Pleasanton","94568":"Pleasanton","94582":"Pleasanton","94583":"Pleasanton","94586":"Pleasanton","94588":"Pleasanton","94103":"San Francisco","94105":"San Francisco","94107":"San Francisco","94110":"San Francisco","94111":"San Francisco","94114":"San Francisco","94124":"San Francisco","94131":"San Francisco","94134":"San Francisco","94158":"San Francisco","94501":"San Leandro","94541":"San Leandro","94542":"San Leandro","94545":"San Leandro","94546":"San Leandro","94552":"San Leandro","94577":"San Leandro","94578":"San Leandro","94579":"San Leandro","94580":"San Leandro","94601":"San Leandro","94603":"San Leandro","94605":"San Leandro","94606":"San Leandro","94613":"San Leandro","94619":"San Leandro","94621":"San Leandro","93401":"San Luis Obispo","93402":"San Luis Obispo","93405":"San Luis Obispo","93407":"San Luis Obispo","93408":"San Luis Obispo","93410":"San Luis Obispo","93424":"San Luis Obispo","93449":"San Luis Obispo","85016":"Scottsdale","85018":"Scottsdale","85020":"Scottsdale","85028":"Scottsdale","85251":"Scottsdale","85253":"Scottsdale","85254":"Scottsdale","85255":"Scottsdale","85256":"Scottsdale","85258":"Scottsdale","85259":"Scottsdale","85260":"Scottsdale","90004":"West Hollywood","90005":"West Hollywood","90006":"West Hollywood","90020":"West Hollywood","90028":"West Hollywood","90029":"West Hollywood","90038":"West Hollywood","90290":"Canoga Park","91303":"Canoga Park","91304":"Canoga Park","91306":"Canoga Park","91311":"Canoga Park","91316":"Canoga Park","91324":"Canoga Park","91330":"Canoga Park","91335":"Canoga Park","91356":"Canoga Park","91364":"Canoga Park","91367":"Canoga Park","91371":"Canoga Park","92625":"Costa Mesa","92626":"Costa Mesa","92627":"Costa Mesa","92646":"Costa Mesa","92657":"Costa Mesa","92661":"Costa Mesa","92662":"Costa Mesa","92663":"Costa Mesa","94526":"Danville","94528":"Danville","90012":"Glendale","90026":"Glendale","90031":"Glendale","90039":"Glendale","90041":"Glendale","90042":"Glendale","90057":"Glendale","90065":"Glendale","91020":"Glendale","91203":"Glendale","91204":"Glendale","91205":"Glendale","91206":"Glendale","91208":"Glendale","91210":"Glendale","91214":"Glendale","93106":"Goleta","93117":"Goleta","92672":"Ladera Ranch","92673":"Ladera Ranch","92677":"Ladera Ranch","92694":"Ladera Ranch","92624":"Laguna Niguel","92629":"Laguna Niguel","94022":"Los Altos","94024":"Los Altos","94028":"Los Altos","94040":"Los Altos","94041":"Los Altos","94043":"Los Altos","94301":"Los Altos","94304":"Los Altos","94305":"Los Altos","94306":"Los Altos","95033":"Los Gatos","95030":"Los Gatos","95032":"Los Gatos","95070":"Los Gatos","90002":"Manhattan Beach","90059":"Manhattan Beach","90061":"Manhattan Beach","90222":"Manhattan Beach","90245":"Manhattan Beach","90249":"Manhattan Beach","90250":"Manhattan Beach","90266":"Manhattan Beach","90303":"Manhattan Beach","90304":"Manhattan Beach","94502":"Oakland","94610":"Oakland","94612":"Oakland","90013":"Pasadena","90014":"Pasadena","90015":"Pasadena","90017":"Pasadena","90021":"Pasadena","90023":"Pasadena","90032":"Pasadena","90033":"Pasadena","90063":"Pasadena","90071":"Pasadena","91030":"Pasadena","91103":"Pasadena","91105":"Pasadena","91123":"Pasadena","91754":"Pasadena","91755":"Pasadena","91803":"Pasadena","95624":"Sacramento","95691":"Sacramento","95757":"Sacramento","95758":"Sacramento","95814":"Sacramento","95817":"Sacramento","95818":"Sacramento","95822":"Sacramento","95823":"Sacramento","95824":"Sacramento","95830":"Sacramento","95831":"Sacramento","95832":"Sacramento","93906":"Salinas","93905":"Salinas","93907":"Salinas","93962":"Salinas","94102":"San Francisco","94104":"San Francisco","94108":"San Francisco","94109":"San Francisco","94115":"San Francisco","94117":"San Francisco","94123":"San Francisco","94129":"San Francisco","94133":"San Francisco","90025":"Santa Monica","90049":"Santa Monica","90073":"Santa Monica","90095":"Santa Monica","90272":"Santa Monica","90401":"Santa Monica","90402":"Santa Monica","90403":"Santa Monica","90404":"Santa Monica","90405":"Santa Monica","98117":"Seattle","98109":"Seattle","98103":"Seattle","98107":"Seattle","98119":"Seattle","98177":"Seattle","98133":"Seattle","98199":"Seattle","93021":"Simi Valley","93063":"Simi Valley","96150":"South Lake Tahoe","94035":"Sunnyvale","98371":"Tacoma","98388":"Tacoma","98402":"Tacoma","98403":"Tacoma","98404":"Tacoma","98405":"Tacoma","98406":"Tacoma","98407":"Tacoma","98408":"Tacoma","98409":"Tacoma","98416":"Tacoma","98418":"Tacoma","98421":"Tacoma","98424":"Tacoma","98430":"Tacoma","98433":"Tacoma","98438":"Tacoma","98439":"Tacoma","98443":"Tacoma","98444":"Tacoma","98445":"Tacoma","98447":"Tacoma","98465":"Tacoma","98466":"Tacoma","98467":"Tacoma","98498":"Tacoma","98499":"Tacoma","91401":"Van Nuys","91403":"Van Nuys","91405":"Van Nuys","91406":"Van Nuys","91411":"Van Nuys","91423":"Van Nuys","91436":"Van Nuys","97230":"Vancouver","98606":"Vancouver","98607":"Vancouver","98660":"Vancouver","98661":"Vancouver","98662":"Vancouver","98663":"Vancouver","98664":"Vancouver","98665":"Vancouver","98671":"Vancouver","98682":"Vancouver","98683":"Vancouver","98684":"Vancouver","94517":"Walnut Creek","94519":"Walnut Creek","94521":"Walnut Creek","94565":"Walnut Creek"};

  // ILLUSTRATIVE rates and tax.
  const RATES = { shipping: 999, gopuff: 499, local: 999 };
  const TAX_RATE = 0.085;
  const STATE_NAMES = { AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming' };
  const ZIP3 = [[5,5,'NY'],[10,27,'MA'],[28,29,'RI'],[30,38,'NH'],[39,49,'ME'],[50,59,'VT'],[60,69,'CT'],[70,89,'NJ'],[100,149,'NY'],[150,196,'PA'],[197,199,'DE'],[200,200,'DC'],[201,201,'VA'],[202,205,'DC'],[206,219,'MD'],[220,246,'VA'],[247,268,'WV'],[270,289,'NC'],[290,299,'SC'],[300,319,'GA'],[320,349,'FL'],[350,369,'AL'],[370,385,'TN'],[386,397,'MS'],[398,399,'GA'],[400,427,'KY'],[430,459,'OH'],[460,479,'IN'],[480,499,'MI'],[500,528,'IA'],[530,549,'WI'],[550,567,'MN'],[569,569,'DC'],[570,577,'SD'],[580,588,'ND'],[590,599,'MT'],[600,629,'IL'],[630,658,'MO'],[660,679,'KS'],[680,693,'NE'],[700,715,'LA'],[716,729,'AR'],[730,749,'OK'],[750,799,'TX'],[800,816,'CO'],[820,831,'WY'],[832,838,'ID'],[840,847,'UT'],[850,865,'AZ'],[870,884,'NM'],[885,885,'TX'],[889,898,'NV'],[900,961,'CA'],[967,968,'HI'],[970,979,'OR'],[980,994,'WA'],[995,999,'AK']];
  function stateForZip(zip) {
    if (!/^\d{5}$/.test(zip)) return null;
    const n = parseInt(zip.slice(0, 3), 10);
    for (const [a, b, s] of ZIP3) if (n >= a && n <= b) return s;
    return null;
  }

  // Shipping rates the AccelPay app returns for a ZIP and the current cart: one per
  // licensed in-state retailer that stocks every bottle in the cart, plus delivery where it applies.
  function ratesFor(zip) {
    const st = stateForZip(zip); if (!st) return null;
    const hs = state.items.map(i => i.h);
    const has = r => hs.every(h => (r.skus[h] || 0) > 0);
    const out = [];
    if (GOPUFF_ZIPS[zip] && hs.length && hs.every(h => GOPUFF_HANDLES.indexOf(h) >= 0)) out.push({ id: 'gopuff', kind: 'delivery', title: 'Delivery in about 30 minutes',
      sub: 'Gopuff, ' + GOPUFF_ZIPS[zip] + ' · licensed retailer', price: RATES.gopuff, icon: 'assets/gopuff-icon.png', by: 'Gopuff' });
    RETAILERS.filter(r => r.localZip3 && r.localZip3.indexOf(zip.slice(0, 3)) >= 0 && has(r)).forEach(r => out.push({ id: r.id + '-local', kind: 'delivery',
      title: 'Same-day local delivery', sub: r.name + ', ' + r.city + ', ' + r.st + ' · licensed retailer', price: RATES.local, by: r.name + ' (' + r.city + ', ' + r.st + ')' }));
    RETAILERS.filter(r => r.st === st && has(r)).forEach(r => out.push({ id: r.id, kind: 'shipping',
      title: 'Standard shipping, 2 to 5 business days', sub: 'Ships from ' + r.name + ', ' + r.city + ', ' + r.st + ' · licensed retailer', price: RATES.shipping, by: r.name + ' (' + r.city + ', ' + r.st + ')' }));
    return { st: st, rates: out };
  }

  // ---------------------------------------------------------------- cart (Shopify AJAX cart stand-in)
  const LS = 'g4-shopify-demo-v1';
  const state = load() || { items: [] };
  function load() { try { return JSON.parse(localStorage.getItem(LS)); } catch (e) { return null; } }
  function save() { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {} }
  const money = c => '$' + (c / 100).toFixed(2);
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function subtotal() { return state.items.reduce((a, i) => a + CATALOG[i.h].price * i.qty, 0); }
  function count() { return state.items.reduce((a, i) => a + i.qty, 0); }
  function add(h, qty) {
    const ex = state.items.filter(i => i.h === h)[0];
    if (ex) ex.qty = Math.min(12, ex.qty + qty); else state.items.push({ h: h, qty: qty });
    save(); renderAll(); openDrawer();
  }
  function setQty(h, q) { const it = state.items.filter(i => i.h === h)[0]; if (!it) return; it.qty = Math.max(0, Math.min(12, q)); if (!it.qty) state.items = state.items.filter(i => i.h !== h); save(); renderAll(); }

  function openDrawer() { const d = $('#drawer'); if (!d) return; d.classList.add('on'); $('#scrim').classList.add('on'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { const d = $('#drawer'); if (!d) return; d.classList.remove('on'); $('#scrim').classList.remove('on'); document.body.style.overflow = ''; }

  function renderHeader() { $$('[data-cart-count]').forEach(el => { el.textContent = count(); el.hidden = !count(); }); }

  function renderDrawer() {
    const box = $('#drawer-items'); if (!box) return;
    box.innerHTML = state.items.length ? state.items.map(i => {
      const p = CATALOG[i.h];
      return '<div class="cline"><div class="im"><img src="' + p.image + '" alt=""></div><div>' +
        '<div class="nm">' + esc(p.name) + '</div><div class="pr">' + money(p.price) + '</div>' +
        '<div class="qrow"><div class="qty"><button data-q="' + (i.qty - 1) + '" data-h="' + i.h + '" aria-label="Decrease quantity">−</button><span>' + i.qty + '</span><button data-q="' + (i.qty + 1) + '" data-h="' + i.h + '" aria-label="Increase quantity">+</button></div>' +
        '<button class="rm" data-q="0" data-h="' + i.h + '" aria-label="Remove">\u{1F5D1}︎</button></div></div>' +
        '<div class="tot">' + money(p.price * i.qty) + '</div></div>';
    }).join('') : '<div class="empty">Your cart is empty</div>';
    const f = $('#drawer-foot');
    if (f) f.innerHTML = '<div class="est"><span>Estimated total</span><span>' + money(subtotal()) + ' USD</span></div>' +
      '<div class="small">Taxes and shipping calculated at checkout. Orders ship from a licensed retailer in your state.</div>' +
      '<a class="btn block" href="checkout.html"' + (state.items.length ? '' : ' style="opacity:.4;pointer-events:none"') + '>Check out</a>' +
      (state.items.length ? '<div class="xpay">' +
        '<button type="button" class="xb shop" data-xpay="Shop Pay" aria-label="Shop Pay"><b>shop</b><span>Pay</span></button>' +
        '<button type="button" class="xb apple" data-xpay="Apple Pay" aria-label="Apple Pay"><svg width="17" height="20" viewBox="0 0 17 20" aria-hidden="true" fill="#fff"><path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1 7.4c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.9c1.5 0 2.4-1.3 3.3-2.7 1-1.5 1.5-3 1.5-3.1 0 0-2.9-1.1-3-4.6zM11.5 2.9c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.2.1 2.3-.6 3-1.5z"/></svg><span>Pay</span></button>' +
        '<button type="button" class="xb google" data-xpay="Google Pay" aria-label="Google Pay"><b class="g">G</b><span>Pay</span></button>' +
      '</div>' : '');
    $$('[data-xpay]', f).forEach(b => b.addEventListener('click', () => { location.href = 'checkout.html?express=' + encodeURIComponent(b.getAttribute('data-xpay')); }));
    $$('[data-q]', box).forEach(b => b.addEventListener('click', () => setQty(b.getAttribute('data-h'), +b.getAttribute('data-q'))));
  }

  // ---------------------------------------------------------------- product page
  const pd = { img: 0, qty: 1 };
  function renderProduct() {
    const host = $('#pdp'); if (!host) return;
    const h = host.getAttribute('data-handle'); const p = CATALOG[h] || CATALOG[MAIN];
    document.title = p.name + ' | PKGD Shop';
    host.innerHTML = [
      '<div class="gallery"><div class="main"><img src="', p.gallery[pd.img], '" alt="', esc(p.short), '"></div>',
        p.gallery.length > 1 ? '<div class="thumbs">' + p.gallery.map((g, i) => '<button data-img="' + i + '" aria-selected="' + (i === pd.img) + '"><img src="' + g + '" alt=""></button>').join('') + '</div>' : '',
      '</div>',
      '<div class="info">',
        '<h1>', esc(p.name), '</h1>',
        '<div class="price">', money(p.price), ' USD</div>',
        '<div class="small"><a href="#">Shipping</a> calculated at checkout.</div>',
        '<div class="qty-wrap">Quantity<div class="qty"><button id="qm" aria-label="Decrease quantity">−</button><span>', pd.qty, '</span><button id="qp" aria-label="Increase quantity">+</button></div></div>',
        '<button class="btn atc" id="atc">Add to cart</button>',
        '<div class="fulfil-line"><img src="assets/gopuff-icon.png" alt=""><span>Ships from a licensed retailer in your state. ' + (GOPUFF_HANDLES.indexOf(h) >= 0 ? 'Delivery in about 30 minutes through Gopuff in much of California, plus the Phoenix and Seattle areas. ' : '') + 'Rates show at checkout once you enter your address.</span></div>',
        p.shop ? '' : '<div class="notice">Not in the online shop today. Licensed retailers in the network already stock it, so it can sell here from day one.</div>',
        '<div class="desc"><p><b>', esc(p.lead), '</b><br>', esc(p.specs), '</p>', p.desc.map(d => '<p>' + esc(d) + '</p>').join(''), '</div>',
        '<div class="rb-note"><span class="rb-mark">ReserveBar</span><span><b>Also on ReserveBar.com.</b> G4 is listed on <a href="https://www.reservebar.com/collections/g4-tequila" target="_blank" rel="noopener">ReserveBar.com</a> for gifting.</span></div>',
      '</div>'].join('');
    $$('[data-img]', host).forEach(b => b.addEventListener('click', () => { pd.img = +b.getAttribute('data-img'); renderProduct(); }));
    $('#qm', host).addEventListener('click', () => { if (pd.qty > 1) { pd.qty--; renderProduct(); } });
    $('#qp', host).addEventListener('click', () => { if (pd.qty < 12) { pd.qty++; renderProduct(); } });
    const atc = $('#atc', host); if (atc) atc.addEventListener('click', () => add(h in CATALOG ? h : MAIN, pd.qty));
  }

  // ---------------------------------------------------------------- checkout
  const co = { rate: null };
  function renderCheckout() {
    const side = $('#os'); if (!side) return;
    const zipEl = $('#zip'), stEl = $('#state');
    const zip = (zipEl.value || '').trim();
    const r = ratesFor(zip);
    if (r && stEl.value !== r.st) stEl.value = r.st;
    const box = $('#rates');
    let rate = null;
    if (!state.items.length) box.innerHTML = '<div class="co-empty">Your cart is empty. <a href="index.html#shop">Shop G4</a></div>';
    else if (!r) box.innerHTML = '<div class="co-empty">Enter your shipping address to view available shipping methods.</div>';
    else if (!r.rates.length) box.innerHTML = '<div class="co-empty">No retailer shown for ' + esc(STATE_NAMES[r.st] || r.st) + ' stocks every bottle in this cart today. G4 is in stock at 245 licensed retailers in the network, in Texas, New York, California, Florida, Washington DC, Colorado, Massachusetts, Connecticut, Minnesota, New Jersey and Illinois, and on Gopuff in California, Arizona and Washington. At launch, more in-state retailers are connected.</div>';
    else {
      if (!r.rates.filter(x => x.id === co.rate)[0]) co.rate = r.rates[0].id;
      rate = r.rates.filter(x => x.id === co.rate)[0];
      box.innerHTML = '<div class="rates">' + r.rates.map(x => '<label class="rate' + (x.id === co.rate ? ' on' : '') + '"><input type="radio" name="rate" value="' + x.id + '"' + (x.id === co.rate ? ' checked' : '') + '>' +
        (x.icon ? '<img class="ic" src="' + x.icon + '" alt="">' : '') + '<span class="t">' + esc(x.title) + '<span>' + esc(x.sub) + '</span></span><span class="p">' + money(x.price) + '</span></label>').join('') + '</div>' +
        '<div class="callout"><span class="dot"></span><span><b>Retailer routing by AccelPay.</b> Your address decides which licensed retailer sells and ships the order. The order still lands in the PKGD Shopify admin with the full customer record.</span></div>';
      $$('input[name=rate]', box).forEach(i => i.addEventListener('change', () => { co.rate = i.value; renderCheckout(); }));
    }
    const sub = subtotal(), ship = rate ? rate.price : null, tax = rate ? Math.round(sub * TAX_RATE) : null;
    side.innerHTML = state.items.map(i => { const p = CATALOG[i.h];
        return '<div class="os-item"><div class="im"><img src="' + p.image + '" alt=""><span class="q">' + i.qty + '</span></div><div class="nm">' + esc(p.name) + '<span>' + p.size + '</span></div><div class="pr">' + money(p.price * i.qty) + '</div></div>'; }).join('') +
      '<div class="os-disc"><input placeholder="Discount code or gift card" aria-label="Discount code"><button type="button">Apply</button></div>' +
      '<div class="os-line"><span class="m">Subtotal · ' + count() + ' item' + (count() === 1 ? '' : 's') + '</span><span>' + money(sub) + '</span></div>' +
      '<div class="os-line"><span class="m">' + (rate && rate.kind === 'delivery' ? 'Delivery' : 'Shipping') + '</span><span>' + (ship === null ? '<span class="m">Enter shipping address</span>' : money(ship)) + '</span></div>' +
      '<div class="os-line"><span class="m">Estimated taxes</span><span>' + (tax === null ? '<span class="m">-</span>' : money(tax)) + '</span></div>' +
      '<div class="os-line total"><span>Total</span><span><small>USD</small>' + money(sub + (ship || 0) + (tax || 0)) + '</span></div>' +
      '<div class="callout"><span class="dot"></span><span><b>Taxes by AccelPay.</b> Sales tax calculated for the ship-to address.</span></div>' +
      (rate ? '<div class="callout"><span class="dot"></span><span>' + (rate.kind === 'delivery' ? 'Delivered by ' : 'Sold and shipped by ') + '<b>' + esc(rate.by) + '</b>, a licensed retailer. Adult signature (21+) required.</span></div>' : '');
    const pay = $('#pay');
    if (pay) { pay.disabled = !rate; pay.textContent = 'Pay now'; }
    co.current = rate; co.total = sub + (ship || 0) + (tax || 0);
  }
  function wireCheckout() {
    const form = $('#co-form'); if (!form) return;
    ['#zip', '#state'].forEach(s => $(s).addEventListener('input', () => { co.rate = null; renderCheckout(); }));
    $('#zip').addEventListener('change', renderCheckout);
    $$('[data-fill]').forEach(b => b.addEventListener('click', () => {
      const v = b.getAttribute('data-fill').split('|');
      form.address1.value = v[0]; form.city.value = v[1]; $('#zip').value = v[2]; co.rate = null; renderCheckout();
    }));
    const xp = $('#xpay-top');
    if (xp) { xp.innerHTML = '<div class="xpay big">' +
        '<button type="button" class="xb shop" data-xpay="Shop Pay" aria-label="Shop Pay"><b>shop</b><span>Pay</span></button>' +
        '<button type="button" class="xb apple" data-xpay="Apple Pay" aria-label="Apple Pay"><svg width="17" height="20" viewBox="0 0 17 20" aria-hidden="true" fill="#fff"><path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1 7.4c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.9c1.5 0 2.4-1.3 3.3-2.7 1-1.5 1.5-3 1.5-3.1 0 0-2.9-1.1-3-4.6zM11.5 2.9c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.2.1 2.3-.6 3-1.5z"/></svg><span>Pay</span></button>' +
        '<button type="button" class="xb google" data-xpay="Google Pay" aria-label="Google Pay"><b class="g">G</b><span>Pay</span></button>' +
      '</div>';
      $$('[data-xpay]', xp).forEach(b => b.addEventListener('click', () => expressFill(b.getAttribute('data-xpay')))); }
    const q = new URLSearchParams(location.search).get('express'); if (q) expressFill(q);
    function expressFill(method) {
      // Demo: the wallet hands back a saved contact and address, then checkout continues.
      form.email.value = form.email.value || 'shopper@example.com';
      form.first.value = form.first.value || 'Jordan'; form.last.value = form.last.value || 'Lee';
      form.address1.value = '350 E 13th St'; form.city.value = 'New York'; $('#zip').value = '10009'; co.rate = null; renderCheckout();
      const n = $('#xpay-note'); if (n) { n.hidden = false; n.textContent = method + ' filled your contact and address. Pick a shipping method below, then pay.'; }
      const r = $('#rates'); if (r && r.scrollIntoView) r.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.addEventListener('submit', e => {
      e.preventDefault(); if (!co.current) return;
      const n = 'G4-DEMO-' + (1000 + Math.floor(Math.random() * 9000));
      try { sessionStorage.setItem('g4-order', JSON.stringify({ n: n, total: co.total, by: co.current.by, kind: co.current.kind })); } catch (err) {}
      state.items = []; save();
      location.href = 'checkout.html?confirmed=1';
    });
  }

  function renderAll() { renderHeader(); renderDrawer(); renderProduct(); renderCheckout(); }
  function boot() {
    $$('[data-cart-toggle]').forEach(b => b.addEventListener('click', openDrawer));
    const x = $('#drawer-close'); if (x) x.addEventListener('click', closeDrawer);
    const s = $('#scrim'); if (s) s.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
    const burger = $('#burger'); if (burger) burger.addEventListener('click', () => $('nav.main').classList.toggle('open'));
    wireCheckout(); renderAll();
  }
  window.G4Demo = { catalog: CATALOG, order: ORDER, money: money, add: add };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
