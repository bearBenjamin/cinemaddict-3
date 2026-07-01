const moviesData = [
  {
    id: 1,
    comments: ['c1', 'c2', 'c3'],
    filmInfo: {
      title: 'Made for Each Other',
      alternativeTitle: 'Созданы друг для друга',
      totalRating: 5,
      poster: 'images/posters/made-for-each-other.png',
      ageRating: 13,
      director: 'John Cromwell',
      writers: ['Jo Swerling', 'Rose Franken'],
      actors: ['Carole Lombard', 'James Stewart', 'Charles Coburn'],
      release: {
        date: '1939-02-10T00:00:00.000Z',
        realeseCountry: 'USA'
      },
      runTime: 92,
      genre: ['Comedy', 'Drama', 'Romance'],
      description: 'A young lawyer and his new wife marry after knowing each other for just one day. They must face financial hardship, meddlesome in-laws, and the sudden critical illness of their newborn child during their turbulent first year of marriage.',
      userDetails: {
        watchlist: false,
        alreadyWatched: true,
        watchingDate: '2019-04-12T16:54:32.554Z',
        favorite: false
      }
    }
  },
  {
    id: 2,
    comments: ['c4', 'c5'],
    filmInfo: {
      title: 'Popeye the Sailor Meets Sinbad the Sailor',
      alternativeTitle: 'Попай-моряк встречает Синдбада-моряка',
      totalRating: 9.6,
      poster: './images/posters/popeye-meets-sinbad.png',
      ageRating: 0,
      director: 'Dave Fleischer',
      writers: ['Izzy Sparber', 'Joe Stultz', 'Bill Turner', 'Jack Ward'],
      actors: ['Jack Mercer', 'Mae Questel', 'Gus Wickie', 'Lou Fleischer'],
      release: {
        date: '1936-11-27T00:00:00.000Z',
        realeseCountry: 'USA'
      },
      runTime: 16,
      genre: ['Animation', 'Short', 'Adventure', 'Comedy', 'Fantasy'],
      description: 'Sindbad the Sailor, reigning as a king on a remote island, declares himself the greatest sailor in the world. When Popeye\'s ship passes nearby, Sindbad kidnaps Olive Oyl, leading to an epic showdown between the two legendary sailors.',
      userDetails: {
        watchlist: true,
        alreadyWatched: false,
        watchingDate: '2019-05-20T11:12:01.104Z',
        favorite: true
      }
    }
  },
  {
    id: 3,
    comments: [],
    filmInfo: {
      title: 'Sagebrush Trail',
      alternativeTitle: 'Тропа полыни',
      totalRating: 2.5,
      poster: 'images/posters/sagebrush-trail.jpg',
      ageRating: 13,
      director: 'Armand Schaefer',
      writers: ['Lindsley Parsons'],
      actors: ['John Wayne', 'Nancy Shubert', 'Lane Chandler', 'Yakima Canutt'],
      release: {
        date: '1933-12-15T00:00:00.000Z',
        realeseCountry: 'USA'
      },
      runTime: 54,
      genre: ['Western', 'Action'],
      description: 'John Jones is wrongly convicted of a murder he didn\'t commit. After escaping from prison, he heads west, infiltrates a notorious outlaw gang under an alias, and seeks out the real killer to clear his name.',
      userDetails: {
        watchlist: false,
        alreadyWatched: true,
        watchingDate: '2019-06-01T18:24:11.992Z',
        favorite: false
      }
    }
  },
  {
    id: 4,
    comments: ['c6', 'c7', 'c8', 'c9'],
    filmInfo: {
      title: 'Santa Claus Conquers the Martians',
      alternativeTitle: 'Санта Клаус завоевывает марсиан',
      totalRating: 7.2,
      poster: 'images/posters/santa-claus-conquers-the-martians.jpg',
      ageRating: 0,
      director: 'Nicholas Webster',
      writers: ['Glenville Mareth', 'Paul L. Jacobson'],
      actors: ['John Call', 'Leonard Hicks', 'Vincent Beck', 'Bill McCutcheon', 'Pia Zadora'],
      release: {
        date: '1964-11-14T00:00:00.000Z',
        realeseCountry: 'USA'
      },
      runTime: 81,
      genre: ['Comedy', 'Family', 'Sci-Fi', 'Fantasy'],
      description: 'Concerned that their children are becoming listless due to a strict society lacking fun, Martian leaders travel to Earth and kidnap Santa Claus along with two human kids to bring joy and Christmas spirit back to Mars.',
      userDetails: {
        watchlist: false,
        alreadyWatched: true,
        watchingDate: '2019-12-25T20:00:00.000Z',
        favorite: true
      }
    }
  },
  {
    id: 5,
    comments: ['c10'],
    filmInfo: {
      title: 'The Dance of Life',
      alternativeTitle: 'Танец жизни',
      totalRating: 5,
      poster: 'images/posters/the-dance-of-life.jpg',
      ageRating: 13,
      director: 'John Cromwell',
      writers: ['Benjamin Glazer', 'Arthur Hopkins', 'George Manker Watters'],
      actors: ['Hal Skelly', 'Nancy Carroll', 'Dorothy Revier', 'Ricardo Cortez'],
      release: {
        date: '1929-08-16T00:00:00.000Z',
        realeseCountry: 'USA'
      },
      runTime: 115,
      genre: ['Drama', 'Musical'],
      description: 'A talented burlesque comic, Skid, marries a young dancer, Bonny, to save her from loneliness. As they perform together, Skid\'s sudden rise to Broadway stardom feeds his battle with alcoholism, threatening to tear their relationship apart.',
      userDetails: {
        watchlist: true,
        alreadyWatched: false,
        watchingDate: '2019-08-10T14:45:12.330Z',
        favorite: false
      }
    }
  },
  {
    id: 6,
    comments: ['c11', 'c12', 'c13', 'c14', 'c15'],
    filmInfo: {
      title: 'The Man with the Golden Arm',
      alternativeTitle: 'Человек с золотой рукой',
      totalRating: 8.7,
      poster: 'images/posters/the-man-with-the-golden-arm.jpg',
      ageRating: 16,
      director: 'Otto Preminger',
      writers: ['Walter Newman', 'Lewis Meltzer', 'Ben Hecht', 'Nelson Algren'],
      actors: ['Frank Sinatra', 'Eleanor Parker', 'Kim Novak', 'Arnold Stang'],
      release: {
        date: '1955-12-14T00:00:00.000Z',
        realeseCountry: 'USA'
      },
      runTime: 119,
      genre: ['Drama', 'Crime', 'Romance'],
      description: 'An expert card dealer and recovering heroin addict gets out of prison with dreams of becoming a jazz drummer. Back in the gritty streets, he struggles to stay clean while facing immense pressure from his manipulative wife and old criminal associates.',
      userDetails: {
        watchlist: false,
        alreadyWatched: true,
        watchingDate: '2019-04-12T16:54:32.554Z',
        favorite: false
      }
    }
  }
];

const comments = [
  {
    id: 'c1',
    author: 'Ilya O\'Reilly',
    comment: 'A film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: 'smile'
  },
  {
    id: 'c2',
    author: 'John Doe',
    comment: 'Interesting cinematography, but the pacing felt a bit too slow in the second act.',
    date: '2019-06-15T12:22:00.000Z',
    emotion: 'sleeping'
  },
  {
    id: 'c3',
    author: 'Jane Smith',
    comment: 'Absolutely brilliant acting by James Stewart! A timeless classic.',
    date: '2019-07-20T08:45:10.112Z',
    emotion: 'smile'
  },
  {
    id: 'c4',
    author: 'AnimationFan',
    comment: 'The animation quality for 1936 is mind-blowing. Love the music transitions!',
    date: '2019-11-02T14:30:22.000Z',
    emotion: 'smile'
  },
  {
    id: 'c5',
    author: 'ClassicMovieBuff',
    comment: 'Popeye\'s spinach scene never gets old. Classic Fleischer studios magic.',
    date: '2020-01-10T19:15:00.500Z',
    emotion: 'smile'
  },
  {
    id: 'c6',
    author: 'SciFiGeek',
    comment: 'This is so bad it\'s actually good. Pure campy 60s fun!',
    date: '2019-12-26T02:11:45.000Z',
    emotion: 'smile'
  },
  {
    id: 'c7',
    author: 'Grinch12',
    comment: 'What did I just watch? The Martian costumes look terrible, couldn\'t finish it.',
    date: '2019-12-28T22:04:15.821Z',
    emotion: 'puke'
  },
  {
    id: 'c8',
    author: 'MovieCritic99',
    comment: 'An absolute disaster of a script. Highly recommended for a bad movie night with friends.',
    date: '2020-01-03T11:50:00.000Z',
    emotion: 'angry'
  },
  {
    id: 'c9',
    author: 'NostalgiaLover',
    comment: 'Used to watch this every Christmas as a child. It has a weird charm.',
    date: '2020-01-05T15:33:12.000Z',
    emotion: 'sleeping'
  },
  {
    id: 'c10',
    author: 'DramaQueen',
    comment: 'Nancy Carroll is spectacular here. A deeply moving pre-code melodrama.',
    date: '2019-09-14T10:05:44.201Z',
    emotion: 'smile'
  },
  {
    id: 'c11',
    author: 'FrankSFan',
    comment: 'Sinatra\'s finest dramatic performance. The withdrawal scene is harrowing.',
    date: '2019-05-15T18:24:00.000Z',
    emotion: 'smile'
  },
  {
    id: 'c12',
    author: 'JazzMan',
    comment: 'The Elmer Bernstein jazz score is legendary. It drives the whole movie.',
    date: '2019-06-02T21:11:32.115Z',
    emotion: 'smile'
  },
  {
    id: 'c13',
    author: 'HistoryBuff',
    comment: 'Very controversial for its time due to the drug addiction theme. Holds up well.',
    date: '2019-06-20T09:40:00.000Z',
    emotion: 'sleeping'
  },
  {
    id: 'c14',
    author: 'Cinephile_Rex',
    comment: 'The portrayal of the toxic relationship with his wife made me so mad.',
    date: '2019-07-01T13:12:45.600Z',
    emotion: 'angry'
  },
  {
    id: 'c15',
    author: 'GritAndGlory',
    comment: 'Grim, realistic, and masterfully directed by Preminger.',
    date: '2019-07-14T16:55:02.000Z',
    emotion: 'smile'
  }
];

const USER_STATUS_CONFIGS = [
  { status: 'Movie Buff', min: 21, max: Infinity },
  { status: 'Fan', min: 11, max: 20},
  { status: 'Novice', min: 1, max: 10},
  { status: '', min: 0, max: 0}
];

const FilterType = {
  ALL: 'all',
  WATHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITE: 'favorite',
};

export { moviesData, comments, USER_STATUS_CONFIGS, FilterType };
