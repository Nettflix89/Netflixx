// Netflix Movie Database
const movieDatabase = {
    trending: [
        {
            id: 1,
            title: "Stranger Things",
            poster: "stranger-things-poster.jpg" // Your real uploaded poster,
            backdrop: "https://picsum.photos/seed/stranger-things-backdrop/1920/1080.jpg",
            year: "2022",
            rating: "TV-14",
            duration: "4 Seasons",
            match: "96%",
            description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
            genre: "Sci-Fi",
            price: 15.49
        },
        {
            id: 2,
            title: "Wednesday",
            poster: "https://picsum.photos/seed/wednesday-netflix-official/300/450.jpg",
            backdrop: "https://picsum.photos/seed/wednesday-backdrop/1920/1080.jpg",
            year: "2022",
            rating: "TV-14",
            duration: "1 Season",
            match: "94%",
            description: "Wednesday Addams enrolls at Nevermore Academy and attempts to solve a local murder mystery.",
            genre: "Mystery",
            price: 15.49
        },
        {
            id: 3,
            title: "The Night Agent",
            poster: "https://picsum.photos/seed/night-agent-netflix-official/300/450.jpg",
            backdrop: "https://picsum.photos/seed/night-agent-backdrop/1920/1080.jpg",
            year: "2023",
            rating: "TV-MA",
            duration: "1 Season",
            match: "98%",
            description: "A low-level FBI agent works a phone that never rings until it does.",
            genre: "Thriller",
            price: 15.49
        },
        {
            id: 4,
            title: "Bridgerton",
            poster: "https://picsum.photos/seed/bridgerton-netflix-official/300/450.jpg",
            backdrop: "https://picsum.photos/seed/bridgerton-backdrop/1920/1080.jpg",
            year: "2020",
            rating: "TV-MA",
            duration: "3 Seasons",
            match: "91%",
            description: "The close-knit aristocratic families of London's high society navigate romance and scandal.",
            genre: "Romance",
            price: 15.49
        },
        {
            id: 5,
            title: "One Piece",
            poster: "https://picsum.photos/seed/one-piece-netflix-official/300/450.jpg",
            backdrop: "https://picsum.photos/seed/one-piece-backdrop/1920/1080.jpg",
            year: "2023",
            rating: "TV-14",
            duration: "1 Season",
            match: "93%",
            description: "Follows the adventures of Monkey D. Luffy and his pirate crew in search of treasure.",
            genre: "Adventure",
            price: 15.49
        },
        {
            id: 6,
            title: "Dark Matter",
            poster: "https://picsum.photos/seed/dark-matter-netflix-official/300/450.jpg",
            backdrop: "https://picsum.photos/seed/dark-matter-backdrop/1920/1080.jpg",
            year: "2024",
            rating: "TV-MA",
            duration: "1 Season",
            match: "95%",
            description: "The crew of a spaceship awaken with no memory of who they are or how they got on board.",
            genre: "Sci-Fi",
            price: 15.49
        }
    ],
    
    newReleases: [
        {
            id: 7,
            title: "Damsel",
            poster: "https://picsum.photos/seed/damsel-netflix-official/300/450.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/4K5L6M7N8O9P0Q1R2S3T4U5V6W7.jpg",
            year: "2024",
            rating: "PG-13",
            duration: "1h 50m",
            match: "87%",
            description: "A princess discovers her royal wedding is a trap and must fight for survival.",
            genre: "Fantasy",
            price: 22.99
        },
        {
            id: 8,
            title: "Lift",
            poster: "https://image.tmdb.org/t/p/w500/3D4E5F6G7H8I9J0K1L2M3N4O5P6.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1.jpg",
            year: "2024",
            rating: "PG-13",
            duration: "1h 46m",
            match: "82%",
            description: "An international heist crew races to steal gold from a passenger plane at 40,000 feet.",
            genre: "Action",
            price: 22.99
        },
        {
            id: 9,
            title: "Maestro",
            poster: "https://image.tmdb.org/t/p/w500/9A0B1C2D3E4F5G6H7I8J9K0L1M2.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8.jpg",
            year: "2023",
            rating: "R",
            duration: "2h 9m",
            match: "89%",
            description: "The lifelong relationship between composer Leonard Bernstein and his wife Felicia Montealegre.",
            genre: "Drama",
            price: 22.99
        },
        {
            id: 10,
            title: "Rebel Moon",
            poster: "https://image.tmdb.org/t/p/w500/2C3D4E5F6G7H8I9J0K1L2M3N4O5.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0.jpg",
            year: "2023",
            rating: "R",
            duration: "2h 14m",
            match: "85%",
            description: "A young woman seeks warriors from neighboring planets to fight a tyrannical empire.",
            genre: "Sci-Fi",
            price: 22.99
        },
        {
            id: 11,
            title: "Leave the World Behind",
            poster: "https://image.tmdb.org/t/p/w500/6B7C8D9E0F1G2H3I4J5K6L7M8N9.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4.jpg",
            year: "2023",
            rating: "R",
            duration: "2h 21m",
            match: "88%",
            description: "A family vacation turns into a crisis when the world collapses around them.",
            genre: "Thriller",
            price: 22.99
        },
        {
            id: 12,
            title: "The Killer",
            poster: "https://image.tmdb.org/t/p/w500/8A9B0C1D2E3F4G5H6I7J8K9L0M1.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6.jpg",
            year: "2023",
            rating: "R",
            duration: "1h 58m",
            match: "84%",
            description: "A hitman fights against his own employers after developing a conscience.",
            genre: "Action",
            price: 22.99
        }
    ],
    
    action: [
        {
            id: 13,
            title: "Extraction 2",
            poster: "https://picsum.photos/seed/extraction-2-netflix-official/300/450.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/9R0S1T2U3V4W5X6Y7Z8A9B0C1D2.jpg",
            year: "2023",
            rating: "R",
            duration: "2h 3m",
            match: "91%",
            description: "Tyler Rake returns for another deadly rescue mission in Bangladesh.",
            genre: "Action",
            price: 22.99
        },
        {
            id: 14,
            title: "Heart of Stone",
            poster: "https://image.tmdb.org/t/p/w500/1F2G3H4I5J6K7L8M9N0O1P2Q3R4.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/6S7T8U9V0W1X2Y3Z4A5B6C7D8E9.jpg",
            year: "2023",
            rating: "PG-13",
            duration: "2h 2m",
            match: "86%",
            description: "An intelligence operative must protect a mysterious artificial intelligence system.",
            genre: "Action",
            price: 22.99
        },
        {
            id: 15,
            title: "Spy Kids: Armageddon",
            poster: "https://image.tmdb.org/t/p/w500/4G5H6I7J8K9L0M1N2O3P4Q5R6S7.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/2T3U4V5W6X7Y8Z9A0B1C2D3E4F5.jpg",
            year: "2023",
            rating: "PG",
            duration: "1h 33m",
            match: "79%",
            description: "A new generation of Spy Kids must save the world from a time-traveling villain.",
            genre: "Family",
            price: 22.99
        },
        {
            id: 16,
            title: "The Mother",
            poster: "https://image.tmdb.org/t/p/w500/7H8I9J0K1L2M3N4O5P6Q7R8S9T0.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/5U6V7W8X9Y0Z1A2B3C4D5E6F7G8.jpg",
            year: "2023",
            rating: "R",
            duration: "1h 57m",
            match: "83%",
            description: "A deadly assassin comes out of hiding to protect the daughter she left behind.",
            genre: "Action",
            price: 22.99
        },
        {
            id: 17,
            title: "Ghosted",
            poster: "https://image.tmdb.org/t/p/w500/3I9J0K1L2M3N4O5P6Q7R8S9T0U1.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/8V9W0X1Y2Z3A4B5C6D7E8F9G0H1.jpg",
            year: "2023",
            rating: "PG-13",
            duration: "1h 56m",
            match: "78%",
            description: "A woman discovers her new boyfriend is a spy when he ghosts her.",
            genre: "Romantic Comedy",
            price: 22.99
        },
        {
            id: 18,
            title: "The Union",
            poster: "https://image.tmdb.org/t/p/w500/6K0L1M2N3O4P5Q6R7S8T9U0V1W2.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/1X2Y3Z4A5B6C7D8E9F0G1H2I3J4.jpg",
            year: "2024",
            rating: "PG-13",
            duration: "1h 42m",
            match: "81%",
            description: "A construction worker gets recruited by a secret spy organization.",
            genre: "Action",
            price: 22.99
        }
    ],
    
    comedy: [
        {
            id: 19,
            title: "Me Time",
            poster: "https://image.tmdb.org/t/p/w500/2L3M4N5O6P7Q8R9S0T1U2V3W4X5.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/7Y8Z9A0B1C2D3E4F5G6H7I8J9K0.jpg",
            year: "2022",
            rating: "R",
            duration: "1h 37m",
            match: "85%",
            description: "Two best friends take a wild weekend trip while their families are away.",
            genre: "Comedy",
            price: 15.49
        },
        {
            id: 20,
            title: "You People",
            poster: "https://image.tmdb.org/t/p/w500/9M4N5O6P7Q8R9S0T1U2V3W4X5Y6.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/4Z7A8B9C0D1E2F3G4H5I6J7K8L9.jpg",
            year: "2023",
            rating: "R",
            duration: "1h 39m",
            match: "82%",
            description: "A couple's relationship is tested when their families meet for the first time.",
            genre: "Romantic Comedy",
            price: 15.49
        },
        {
            id: 21,
            title: "Murder Mystery 2",
            poster: "https://image.tmdb.org/t/p/w500/5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/0A1B2C3D4E5F6G7H8I9J0K1L2M3.jpg",
            year: "2023",
            rating: "PG-13",
            duration: "1h 40m",
            match: "80%",
            description: "Nick and Audrey Spitz investigate murders on a private island.",
            genre: "Comedy",
            price: 15.49
        },
        {
            id: 22,
            title: "Your Place or Mine",
            poster: "https://image.tmdb.org/t/p/w500/8O7P8Q9R0S1T2U3V4W5X6Y7Z8A9.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/3B4C5D6E7F8G9H0I1J2K3L4M5N6.jpg",
            year: "2023",
            rating: "PG-13",
            duration: "1h 31m",
            match: "77%",
            description: "Long-distance couples swap homes and unexpectedly find love.",
            genre: "Romantic Comedy",
            price: 15.49
        },
        {
            id: 23,
            title: "The Out-Laws",
            poster: "https://image.tmdb.org/t/p/w500/1P8Q9R0S1T2U3V4W5X6Y7Z8A9B0.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/6C7D8E9F0G1H2I3J4K5L6M7N8O9.jpg",
            year: "2023",
            rating: "R",
            duration: "1h 35m",
            match: "76%",
            description: "A woman discovers her future in-laws are legendary bank robbers.",
            genre: "Comedy",
            price: 15.49
        },
        {
            id: 24,
            title: "Happiness for Beginners",
            poster: "https://image.tmdb.org/t/p/w500/4Q9R0S1T2U3V4W5X6Y7Z8A9B0C1.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/9D0E1F2G3H4I5J6K7L8M9N0O1P2.jpg",
            year: "2023",
            rating: "PG-13",
            duration: "1h 43m",
            match: "79%",
            description: "A woman attends a wilderness survival camp to restart her life.",
            genre: "Comedy",
            price: 15.49
        }
    ]
};

// Function to get movies by category
function getMoviesByCategory(category) {
    return movieDatabase[category] || [];
}

// Function to get movie by ID
function getMovieById(id) {
    for (const category in movieDatabase) {
        const movie = movieDatabase[category].find(m => m.id === id);
        if (movie) return movie;
    }
    return null;
}

// Function to get random hero movie
function getRandomHeroMovie() {
    const allMovies = [...movieDatabase.trending, ...movieDatabase.newReleases];
    return allMovies[Math.floor(Math.random() * allMovies.length)];
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { movieDatabase, getMoviesByCategory, getMovieById, getRandomHeroMovie };
}
