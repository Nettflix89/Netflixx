// Working Netflix Movie Database - All posters use reliable URLs
const movieDatabase = {
    trending: [
        {
            id: 1,
            title: "Stranger Things",
            poster: "https://picsum.photos/seed/stranger-things-netflix-2024/300/450.jpg",
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
            poster: "https://picsum.photos/seed/wednesday-netflix-2024/300/450.jpg",
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
            poster: "https://picsum.photos/seed/night-agent-netflix-2024/300/450.jpg",
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
            poster: "https://picsum.photos/seed/bridgerton-netflix-2024/300/450.jpg",
            backdrop: "https://picsum.photos/seed/bridgerton-backdrop/1920/1080.jpg",
            year: "2020",
            rating: "TV-MA",
            duration: "3 Seasons",
            match: "92%",
            description: "The close-knit aristocratic families of Regency London navigate social season.",
            genre: "Romance",
            price: 15.49
        },
        {
            id: 5,
            title: "One Piece",
            poster: "https://picsum.photos/seed/one-piece-netflix-2024/300/450.jpg",
            backdrop: "https://picsum.photos/seed/one-piece-backdrop/1920/1080.jpg",
            year: "2023",
            rating: "TV-14",
            duration: "1 Season",
            match: "95%",
            description: "Follows adventures of Monkey D. Luffy and his pirate crew.",
            genre: "Adventure",
            price: 15.49
        },
        {
            id: 6,
            title: "Dark Matter",
            poster: "https://picsum.photos/seed/dark-matter-netflix-2024/300/450.jpg",
            backdrop: "https://picsum.photos/seed/dark-matter-backdrop/1920/1080.jpg",
            year: "2024",
            rating: "TV-MA",
            duration: "1 Season",
            match: "89%",
            description: "A spaceship crew awakens from stasis with no memory of who they are.",
            genre: "Sci-Fi",
            price: 15.49
        },
        {
            id: 7,
            title: "Damsel",
            poster: "https://picsum.photos/seed/damsel-netflix-2024/300/450.jpg",
            backdrop: "https://picsum.photos/seed/damsel-backdrop/1920/1080.jpg",
            year: "2024",
            rating: "PG-13",
            duration: "1h 50m",
            match: "87%",
            description: "A young woman discovers she's been offered as a sacrifice to a dragon.",
            genre: "Fantasy",
            price: 15.49
        },
        {
            id: 8,
            title: "Extraction 2",
            poster: "https://picsum.photos/seed/extraction-2-netflix-2024/300/450.jpg",
            backdrop: "https://picsum.photos/seed/extraction-2-backdrop/1920/1080.jpg",
            year: "2023",
            rating: "R",
            duration: "2h 3m",
            match: "91%",
            description: "Tyler Rake returns for another deadly rescue mission.",
            genre: "Action",
            price: 15.49
        }
    ],
    
    // Add more categories as needed
    newReleases: [],
    continueWatching: [],
    popularOnNetflix: []
};

// Export database
if (typeof module !== 'undefined' && module.exports) {
    module.exports = movieDatabase;
}
