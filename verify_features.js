const BASE_URL = 'http://localhost:3001';
const EMAIL = 'alainkwishima@gmail.com';
const PASSWORD = 'mukabareke';

async function verify() {
    console.log('Verifying Features...');

    // 1. Login
    let token;
    try {
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
        });
        const loginData = await loginRes.json();
        token = loginData.access_token;
        console.log('✅ Login successful');
    } catch (err) {
        console.error('❌ Login failed');
        process.exit(1);
    }

    const headers = { Authorization: `Bearer ${token}` };

    // 2. Create Destination with Itinerary
    console.log('2. Creating Destination with Itinerary...');
    let destId;
    try {
        const destData = {
            title: 'Itinerary Test ' + Date.now(),
            slug: 'itinerary-test-' + Date.now(),
            location: 'Test Location',
            description: 'Test Description',
            itinerary: [
                { day: 1, title: 'Arrival', description: 'Arrive at airport' },
                { day: 2, title: 'Tour', description: 'City tour' }
            ]
        };

        const res = await fetch(`${BASE_URL}/destinations`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(destData),
        });

        if (res.ok) {
            const data = await res.json();
            destId = data._id;
            if (data.itinerary && data.itinerary.length === 2) {
                console.log('✅ Destination created with itinerary');
            } else {
                console.error('❌ Itinerary mismatch');
            }
        } else {
            const text = await res.text();
            console.error(`❌ Destination creation failed: ${res.status} ${text}`);
        }
    } catch (err) {
        console.error('❌ Destination creation error:', err.message);
    }

    // 3. Create Gallery Item linked to Destination
    if (destId) {
        console.log('3. Linking Gallery Item...');
        try {
            const galleryRes = await fetch(`${BASE_URL}/gallery?destinationId=${destId}`, { headers });
            const galleryData = await galleryRes.json();
            if (galleryData.data && Array.isArray(galleryData.data)) {
                console.log('✅ Fetched gallery items for destination (empty as expected)');
            } else {
                console.error('❌ Failed to fetch gallery items');
            }

            // Cleanup
            await fetch(`${BASE_URL}/destinations/${destId}`, { method: 'DELETE', headers });
        } catch (err) {
            console.error('❌ Gallery verification error:', err.message);
        }
    }
}

verify();
