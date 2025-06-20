const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        price: 1500,
        location: "Malibu",
        country: "United States",
    },
    {
        title: "Sunset Beach Villa",
        description: "Luxurious villa with panoramic ocean views. Perfect for a family retreat.",
        image: {
            filename: "listingimage",
            url: "https://c4.wallpaperflare.com/wallpaper/705/554/398/nature-sky-reflection-water-wallpaper-preview.jpg",
        },
        price: 1800,
        location: "Maui",
        country: "United States",
    },
    {
        title: "Seaside Haven",
        description: "Modern cottage with private beach access and stunning sunset views.",
        image: {
            filename: "listingimage",
            url: "https://i.pinimg.com/736x/33/ff/bb/33ffbb36051d275bc13cceeefd3f8af9.jpg",
        },
        price: 1700,
        location: "Key West",
        country: "United States",
    },
    {
        title: "Oceanfront Oasis",
        description: "Relax in this spacious beach house with a private pool and direct ocean access.",
        image: {
            filename: "listingimage",
            url: "https://c4.wallpaperflare.com/wallpaper/787/399/647/life-resort-travel-vacation-wallpaper-preview.jpg",
        },
        price: 1600,
        location: "Cape Cod",
        country: "United States",
    },
    {
        title: "Tropical Beach Bungalow",
        description: "Quaint bungalow surrounded by lush tropical gardens, steps from the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1473615695634-d284ec918736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        },
        price: 1550,
        location: "Oahu",
        country: "United States",
    },
    {
        title: "Beachside Retreat",
        description: "Charming beachside cottage with stunning ocean views and cozy interiors.",
        image: {
            filename: "listingimage",
            url: "https://content.r9cdn.net/rimg/himg/36/99/23/expediav2-373824-bc641f-859072.jpg?width=500&height=350&xhint=500&yhint=353&crop=true",
        },
        price: 1500,
        location: "Outer Banks",
        country: "United States",
    },
    {
        title: "Coastal Hideaway",
        description: "Private coastal hideaway with direct beach access and beautiful sunset views.",
        image: {
            filename: "listingimage",
            url: "https://www.thelostpassport.com/wp-content/uploads/2019/10/Away-Koh-Kood-2-1024x768.jpg",
        },
        price: 1650,
        location: "Laguna Beach",
        country: "United States",
    },
    {
        title: "Seaside Serenity",
        description: "Relax and unwind in this cozy beachfront cottage with breathtaking ocean views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1708119063168-4785d1359824?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZSUyMGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 1500,
        location: "Destin",
        country: "United States",
    },
    {
        title: "Ocean Breeze Cottage",
        description: "Charming cottage with modern amenities and a large deck overlooking the ocean.",
        image: {
            filename: "listingimage",
            url: "https://c4.wallpaperflare.com/wallpaper/282/810/421/ocean-summer-summertime-hotel-wallpaper-preview.jpg",
        },
        price: 1700,
        location: "Santa Barbara",
        country: "United States",
    },
    {
        title: "Beachcomber's Paradise",
        description: "Beautifully furnished beach house with a large patio and direct beach access.",
        image: {
            filename: "listingimage",
            url: "https://watermark.lovepik.com/photo/20211130/large/lovepik-resort-pool-picture_501254652.jpg",
        },
        price: 1600,
        location: "Myrtle Beach",
        country: "United States",
    },
    {
        title: "Oceanfront Hideaway",
        description: "Cozy hideaway with panoramic ocean views and private beach access.",
        image: {
            filename: "listingimage",
            url: "https://media1.thrillophilia.com/filestore/jklabyoqhjf3u1qsllo3wapxzkkc_1629799969_roshi_resort.png?w=400&dpr=2",
        },
        price: 1750,
        location: "Newport Beach",
        country: "United States",
    },
    {
        title: "Tropical Paradise Cottage",
        description: "Escape to this tropical paradise with lush gardens and easy beach access.",
        image: {
            filename: "listingimage",
            url: "https://assets.cntraveller.in/photos/619f8b239a807d705493303a/master/pass/anand-kashi-night.jpg",
        },
        price: 1650,
        location: "Kauai",
        country: "United States",
    },
    {
        title: "Beachfront Bliss",
        description: "Modern beachfront home with a spacious patio and stunning ocean views.",
        image: {
            filename: "listingimage",
            url: "https://c1.wallpaperflare.com/preview/557/860/903/maldives-coconut-tree-sea-resort.jpg",
        },
        price: 1800,
        location: "Malibu",
        country: "United States",
    },
    {
        title: "Seaside Cottage",
        description: "Cozy seaside cottage with beautiful coastal decor and easy beach access.",
        image: {
            filename: "listingimage",
            url: "https://w0.peakpx.com/wallpaper/30/751/HD-wallpaper-mauritius-tropical-island-mountain-landscape-palm-trees-luxury-hotel-swimming-pool.jpg",
        },
        price: 1550,
        location: "Hilton Head Island",
        country: "United States",
    },
    {
        title: "Ocean View Retreat",
        description: "Charming retreat with breathtaking ocean views and a cozy fireplace.",
        image: {
            filename: "listingimage",
            url: "https://images7.alphacoders.com/345/345182.jpg",
        },
        price: 1600,
        location: "Carmel-by-the-Sea",
        country: "United States",
    },
    {
        title: "Coastal Cottage",
        description: "Charming coastal cottage with beautiful ocean views and beach access.",
        image: {
            filename: "listingimage",
            url: "https://images5.alphacoders.com/541/541026.jpg",
        },
        price: 1700,
        location: "San Diego",
        country: "United States",
    },
    {
        title: "Beachside Bungalow",
        description: "Quaint bungalow with direct beach access and stunning sunset views.",
        image: {
            filename: "listingimage",
            url: "https://www.hdwallpapers.in/download/hawaii_hotel_mountain_palm_tree_pool_resort_with_reflection_hd_travel-1920x1080.jpg",
        },
        price: 1550,
        location: "South Padre Island",
        country: "United States",
    },
    {
        title: "Oceanfront Retreat",
        description: "Spacious retreat with a private beach and stunning ocean views.",
        image: {
            filename: "listingimage",
            url: "https://img.freepik.com/free-photo/light-garden-luxury-pool-nature_1203-4908.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722038400&semt=ais_user",
        },
        price: 1800,
        location: "Santa Cruz",
        country: "United States",
    },
    {
        title: "Tropical Escape",
        description: "Beautiful tropical escape with lush gardens and beach access.",
        image: {
            filename: "listingimage",
            url: "https://cdn.pixabay.com/photo/2018/01/29/05/14/luxury-3115234_640.jpg",
        },
        price: 1650,
        location: "Fort Lauderdale",
        country: "United States",
    },
    {
        title: "Luxury Resort in the Maldives",
        description: "Experience the ultimate luxury with this stunning resort in the Maldives.",
        image: {
            filename: "listingimage",
            url: "https://imageio.forbes.com/specials-images/imageserve/65280e381c5c81f747778687/Suite-exterior-at-Soneva-Jani-/0x0.jpg?crop=1350,899,x123,y0,safe&height=473&width=711&fit=bounds",
        },
        price: 4500,
        location: "Maldives",
        country: "Maldives",
    },
    {
        title: "Tropical Resort in Thailand",
        description: "Stay in a beautiful tropical resort surrounded by lush greenery and serene beaches.",
        image: {
            filename: "listingimage",
            url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/51/20/e5/ao-nang-phu-pi-maan-resort.jpg?w=1200&h=-1&s=1",
        },
        price: 2000,
        location: "Krabi",
        country: "Thailand",
    },
    {
        title: "Luxury Resort in Spain",
        description: "Enjoy a luxurious stay at this stunning resort in Costa Adeje, Spain.",
        image: {
            filename: "listingimage",
            url: "https://c4.wallpaperflare.com/wallpaper/132/777/256/vacation-costa-adeje-gran-hotel-best-hotels-of-2017-resort-wallpaper-preview.jpg",
        },
        price: 2500,
        location: "Costa Adeje",
        country: "Spain",
    },
    {
        title: "Tropical Resort in the Caribbean",
        description: "Relax at this beautiful tropical resort with stunning ocean views and luxury amenities.",
        image: {
            filename: "listingimage",
            url: "https://media.istockphoto.com/id/641448082/photo/beautiful-tropical-beach-front-hotel-resort-with-swimming-pool-sunshine.webp?b=1&s=170667a&w=0&k=20&c=66dpZvYuwIeXCufS_Q9PV0pBZiJKagF11s0ZlSB6DNQ=",
        },
        price: 2200,
        location: "Barbados",
        country: "Barbados",
    },
    {
        title: "Exclusive Resort in Italy",
        description: "Indulge in luxury at this exclusive resort with breathtaking views of the Italian coastline.",
        image: {
            filename: "listingimage",
            url: "https://w0.peakpx.com/wallpaper/42/372/HD-wallpaper-magnificent-resort-hotel-terrace-with-pool-resort-hotel-view-mountains-pool-lounges-terrace.jpg",
        },
        price: 2700,
        location: "Amalfi Coast",
        country: "Italy",
    },
    {
        title: "Serene Resort in Japan",
        description: "Experience tranquility at this serene resort nestled in the Japanese countryside.",
        image: {
            filename: "listingimage",
            url: "https://c4.wallpaperflare.com/wallpaper/693/473/71/resort-leisure-swimming-pool-resort-town-wallpaper-preview.jpg",
        },
        price: 2100,
        location: "Kyoto",
        country: "Japan",
    },
    {
        title: "Tropical Paradise in Australia",
        description: "Relax in a tropical paradise with stunning beaches and vibrant marine life.",
        image: {
            filename: "listingimage",
            url: "https://thewoodsresorts.com/uploads/media/nature-resort-in-wayanad-1-65783690ceebf.webp",
        },
        price: 2300,
        location: "Great Barrier Reef",
        country: "Australia",
    },
    {
        title: "Boutique Resort in France",
        description: "Enjoy the charm of a boutique resort with luxurious amenities and picturesque views in France.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1529316275402-0462fcc4abd6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D",
        },
        price: 2600,
        location: "Provence",
        country: "France",
    },
    {
        title: "Charming Resort in Portugal",
        description: "Experience charm and comfort at this beautiful resort with stunning views of Portugal’s coastline.",
        image: {
            filename: "listingimage",
            url: "https://w0.peakpx.com/wallpaper/392/364/HD-wallpaper-luxury-resort-resort-beach-beautiful-magic-sunset-pool-lights-luxury.jpg",
        },
        price: 2400,
        location: "Algarve",
        country: "Portugal",
    },
    {
        title: "Luxury Villa in Greece",
        description: "Stay in a luxury villa with panoramic views of the Aegean Sea and exquisite Greek architecture.",
        image: {
            filename: "listingimage",
            url: "https://img.freepik.com/premium-photo/sunset-tourism-landscape-luxurious-beach-resort-with-palm-sky-infinity-swimming-pool-reflection_663265-1457.jpg",
        },
        price: 2800,
        location: "Santorini",
        country: "Greece",
    },
    {
        title: "Exclusive Resort in South Africa",
        description: "Experience the beauty of South Africa at this exclusive resort with breathtaking views of the savannah.",
        image: {
            filename: "listingimage",
            url: "https://www.forestcanopy.in/upload_pic/banner/best-resorts-in-thekkady.webp",
        },
        price: 2900,
        location: "Kruger National Park",
        country: "South Africa",
    },
    {
        title: "Elegant Resort in Switzerland",
        description: "Relax at this elegant resort in Switzerland, surrounded by stunning alpine scenery and luxurious amenities.",
        image: {
            filename: "listingimage",
            url: "https://c4.wallpaperflare.com/wallpaper/476/84/39/moon-sunset-resort-palm-trees-wallpaper-preview.jpg",
        },
        price: 3000,
        location: "Zermatt",
        country: "Switzerland",
    },
    {
        title: "Secluded Resort in New Zealand",
        description: "Discover a secluded resort in New Zealand with stunning views and exclusive amenities.",
        image: {
            filename: "listingimage",
            url: "https://i0.wp.com/cdn.onekindesign.com/wp-content/uploads/2012/09/Le-Meridien-Resort-01-1-Kind-Design.jpg?ssl=1",
        },
        price: 3200,
        location: "Queenstown",
        country: "New Zealand",
    }
];

module.exports = { data: sampleListings };
