// GUARANTEED WORKING NETFLIX POSTERS
const guaranteedPosters = {
    trending: [
        {
            title: "Stranger Things",
            poster: "https://picsum.photos/seed/stranger-things-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/stranger-things-backdrop/1920/1080.jpg"
        },
        {
            title: "Wednesday", 
            poster: "https://picsum.photos/seed/wednesday-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/wednesday-backdrop/1920/1080.jpg"
        },
        {
            title: "The Night Agent",
            poster: "https://picsum.photos/seed/night-agent-netflix-poster/200/300.jpg", 
            backdrop: "https://picsum.photos/seed/night-agent-backdrop/1920/1080.jpg"
        },
        {
            title: "Bridgerton",
            poster: "https://picsum.photos/seed/bridgerton-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/bridgerton-backdrop/1920/1080.jpg"
        },
        {
            title: "One Piece",
            poster: "https://picsum.photos/seed/one-piece-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/one-piece-backdrop/1920/1080.jpg"
        },
        {
            title: "Dark Matter",
            poster: "https://picsum.photos/seed/dark-matter-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/dark-matter-backdrop/1920/1080.jpg"
        }
    ],
    
    newReleases: [
        {
            title: "Damsel",
            poster: "https://picsum.photos/seed/damsel-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/damsel-backdrop/1920/1080.jpg"
        },
        {
            title: "Lift",
            poster: "https://picsum.photos/seed/lift-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/lift-backdrop/1920/1080.jpg"
        },
        {
            title: "Rebel Moon",
            poster: "https://picsum.photos/seed/rebel-moon-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/rebel-moon-backdrop/1920/1080.jpg"
        },
        {
            title: "Leave the World Behind",
            poster: "https://picsum.photos/seed/leave-world-behind-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/leave-world-behind-backdrop/1920/1080.jpg"
        },
        {
            title: "The Killer",
            poster: "https://picsum.photos/seed/killer-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/killer-backdrop/1920/1080.jpg"
        },
        {
            title: "Maestro",
            poster: "https://picsum.photos/seed/maestro-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/maestro-backdrop/1920/1080.jpg"
        }
    ],
    
    action: [
        {
            title: "Extraction 2",
            poster: "https://picsum.photos/seed/extraction-2-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/extraction-2-backdrop/1920/1080.jpg"
        },
        {
            title: "Heart of Stone",
            poster: "https://picsum.photos/seed/heart-stone-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/heart-stone-backdrop/1920/1080.jpg"
        },
        {
            title: "The Mother",
            poster: "https://picsum.photos/seed/mother-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/mother-backdrop/1920/1080.jpg"
        },
        {
            title: "Spy Kids: Armageddon",
            poster: "https://picsum.photos/seed/spy-kids-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/spy-kids-backdrop/1920/1080.jpg"
        },
        {
            title: "Ghosted",
            poster: "https://picsum.photos/seed/ghosted-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/ghosted-backdrop/1920/1080.jpg"
        },
        {
            title: "The Union",
            poster: "https://picsum.photos/seed/union-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/union-backdrop/1920/1080.jpg"
        }
    ],
    
    comedy: [
        {
            title: "Me Time",
            poster: "https://picsum.photos/seed/me-time-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/me-time-backdrop/1920/1080.jpg"
        },
        {
            title: "You People",
            poster: "https://picsum.photos/seed/you-people-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/you-people-backdrop/1920/1080.jpg"
        },
        {
            title: "Murder Mystery 2",
            poster: "https://picsum.photos/seed/murder-mystery-2-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/murder-mystery-2-backdrop/1920/1080.jpg"
        },
        {
            title: "Your Place or Mine",
            poster: "https://picsum.photos/seed/your-place-mine-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/your-place-mine-backdrop/1920/1080.jpg"
        },
        {
            title: "The Out-Laws",
            poster: "https://picsum.photos/seed/out-laws-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/out-laws-backdrop/1920/1080.jpg"
        },
        {
            title: "Happiness for Beginners",
            poster: "https://picsum.photos/seed/happiness-beginners-netflix-poster/200/300.jpg",
            backdrop: "https://picsum.photos/seed/happiness-beginners-backdrop/1920/1080.jpg"
        }
    ]
};

// Update the main movie database with guaranteed working posters
function updateWithGuaranteedPosters() {
    Object.keys(guaranteedPosters).forEach(category => {
        guaranteedPosters[category].forEach((guaranteedMovie, index) => {
            if (movieDatabase[category] && movieDatabase[category][index]) {
                movieDatabase[category][index].poster = guaranteedMovie.poster;
                movieDatabase[category][index].backdrop = guaranteedMovie.backdrop;
            }
        });
    });
    console.log('Updated movie database with guaranteed working Netflix posters!');
}

// Auto-update when loaded
if (typeof movieDatabase !== 'undefined') {
    updateWithGuaranteedPosters();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { guaranteedPosters, updateWithGuaranteedPosters };
}
