const demoData = [
  {
    name: "KinoTeka",
    description: "Сollection of different movies that are worth watching",
    background: "edc961",
    backgroundImage: "/svg/movies.svg",
    items: [
      {
        name: "Black Swan",
        note: "Nina is a talented but unstable ballerina on the verge of stardom. Pushed to the breaking point by her artistic director and a seductive rival, Nina's grip on reality slips, plunging her into a waking nightmare.",
        tags: ["Drama", "Thriller"],
        image: "/images/black.png"
      },
      {
        name: "Birdman",
        note: "A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.",
        tags: ["Drama", "Comedy", "Satire"],
        image: "/images/bird.png"
      },
      {
        name: "Whiplash",
        note: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        tags: ["Drama", "Music"],
        image: "/images/whiplash.png"
      },
      {
        name: "Everything Everywhere All at Once",
        note: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
        tags: ["Drama", "Comedy", "Sci-Fi"],
        image: "/images/everything.png"
      },
      {
        name: "The Grand Budapest Hotel",
        note: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
        tags: ["Drama", "Comedy"],
        image: "/images/bud.png"
      },
      {
        name: "Gisaengchung",
        note: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        tags: ["Drama", "Thriller", "Tragedy", "Dark comedy"],
        image: "/images/pars.png"
      },
      {
        name: "The Martian",
        note: "An astronaut becomes stranded on Mars after his team assumes him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive and can survive until a potential rescue.",
        tags: ["Drama", "Sci-Fi", "Adventure"],
        image: "/images/martian.png"
      },
      {
        name: "The Truman Show",
        note: "An insurance salesman begins to suspect that his whole life is actually some sort of reality TV show.",
        tags: ["Drama", "Satire", "Comedy"],
        image: "/images/truman.png"
      },
      {
        name: "Joker",
        note: "Arthur Fleck, a party clown and a failed stand-up comedian, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of chaos in Gotham City.",
        tags: ["Drama", "Thriller", "Crime", "Tragedy"],
        image: "/images/joker.png"
      },
      {
        name: "Eternal Sunshine of the Spotless Mind",
        note: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories forever.",
        tags: ["Drama", "Romance", "Sci-Fi"],
        image: "/images/sunshine.png"
      },
      {
        name: "Shutter Island",
        note: "Two US marshals are sent to a mental institution on an inhospitable island in order to investigate the disappearance of a patient.",
        tags: ["Drama", "Thriller", "Mystery"],
        image: "/images/island.png"
      },
    ]
  },
  {
    name: "BiblioTeka",
    description: "Сollection of different books that are worth reading",
    background: "f0a154",
    backgroundImage: "/svg/books.svg",
    items: [
      {
        name: "To Kill a Mockingbird",
        note: "A lawyer's advice to his children as he defends the real mockingbird of Harper Lee's classic novel - a black man charged with the rape of a white girl. Through the young eyes of Scout and Jem Finch, Harper Lee explores with exuberant humour the irrationality of adult attitudes to race and class in the Deep South of the 1930s. The conscience of a town steeped in prejudice, violence and hypocrisy is pricked by the stamina of one man's struggle for justice. But the weight of history will only tolerate so much.",
        tags: ["Classics", "Fiction", "Historical", "School"],
        image: "/images/kill.jpg"
      },
      {
        name: "The Lord of the Rings",
        note: "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.",
        tags: ["Classics", "Fiction", "Fantasy", "Adventure"],
        image: "/images/lord.jpg"
      },
      {
        name: "The Wonderful Wizard of Oz",
        note: "Swept away from her home in Kansas by a tornado, Dorothy and her dog Toto find themselves stranded in the fantastical Land of Oz. As instructed by the Good Witch of the North and the Munchkins, Dorothy sets off on the yellow brick road to try and find her way to the Emerald City and the Wizard of Oz, who can help her get home. With her companions the Scarecrow, the Tin Woodman and the Cowardly Lion, Dorothy experiences an adventure full of friendship, magic and danger. A much-loved children's classic, The Wizard of Oz continues to delight readers young and old with its enchanting tale of witches, flying monkeys and silver shoes.",
        tags: ["Classics", "Fiction", "Fantasy", "Adventure"],
        image: "/images/oz.jpg"
      },
      {
        name: "Gone with the Wind",
        note: "Scarlett O'Hara, the beautiful, spoiled daughter of a well-to-do Georgia plantation owner, must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea.",
        tags: ["Classics", "Fiction", "Historical", "Romance"],
        image: "/images/wind.jpg"
      },
      {
        name: "Harry Potter and the Deathly Hallows",
        note: "It's no longer safe for Harry at Hogwarts, so he and his best friends, Ron and Hermione, are on the run. Professor Dumbledore has given them clues about what they need to do to defeat the dark wizard, Lord Voldemort, once and for all, but it's up to them to figure out what these hints and suggestions really mean. Their cross-country odyssey has them searching desperately for the answers, while evading capture or death at every turn. At the same time, their friendship, fortitude, and sense of right and wrong are tested in ways they never could have imagined. The ultimate battle between good and evil that closes out this final chapter of the epic series takes place where Harry's Wizarding life began: at Hogwarts. The satisfying conclusion offers shocking last-minute twists, incredible acts of courage, powerful new forms of magic, and the resolution of many mysteries. Above all, this intense, cathartic book serves as a clear statement of the message at the heart of the Harry Potter series: that choice matters much more than destiny, and that love will always triumph over death.",
        tags: ["Magic", "Fiction", "Fantasy"],
        image: "/images/hp.jpg"
      },
      {
        name: "Rebecca",
        note: "Working as a lady's companion, the heroine of Rebecca learns her place. Her future looks bleak until, on a trip to the South of France, she meets Max de Winter, a handsome widower whose sudden proposal of marriage takes her by surprise. She accepts, but whisked from glamorous Monte Carlo to the ominous and brooding Manderley, the new Mrs de Winter finds Max a changed man. And the memory of his dead wife Rebecca is forever kept alive by the forbidding housekeeper, Mrs Danvers...",
        tags: ["Classics", "Fiction", "Romance", "Gothic"],
        image: "/images/reb.jpg"
      },
      {
        name: "The Godfather",
        note: "Almost fifty years ago, a classic was born. A searing portrayal of the Mafia underworld, The Godfather introduced readers to the first family of American crime fiction, the Corleones, and their powerful legacy of tradition, blood, and honor. The seduction of power, the pitfalls of greed, and the allegiance to family—these are the themes that have resonated with millions of readers around the world and made The Godfather the definitive novel of the violent subculture that, steeped in intrigue and controversy, remains indelibly etched in our collective consciousness.",
        tags: ["Classics", "Fiction", "Crime"],
        image: "/images/godf.jpg"
      },
      {
        name: "Twelve Angry Men",
        note: "A landmark American drama that inspired a classic film and a Broadway revival—featuring an introduction by David Mamet",
        tags: ["Classics", "Fiction", "Drama"],
        image: "/images/12.jpg"
      },
      {
        name: "One Flew Over the Cuckoo’s Nest",
        note: "Tyrannical Nurse Ratched rules her ward in an Oregon State mental hospital with a strict and unbending routine, unopposed by her patients, who remain cowed by mind-numbing medication and the threat of electric shock therapy. But her regime is disrupted by the arrival of McMurphy – the swaggering, fun-loving trickster with a devilish grin who resolves to oppose her rules on behalf of his fellow inmates.",
        tags: ["Classics", "Fiction", "Psychology"],
        image: "/images/one.jpg"
      },
      {
        name: "The Shining",
        note: "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.",
        tags: ["Horror", "Fiction", "Classics"],
        image: "/images/shining.jpg"
      },
    ]
  },
  
];

export default demoData;