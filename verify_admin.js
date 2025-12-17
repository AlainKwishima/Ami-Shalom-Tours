const BASE_URL = 'http://localhost:3001';
const EMAIL = 'alainkwishima@gmail.com';
const PASSWORD = 'mukabareke';

async function verify() {
    console.log('Verifying Admin Endpoints...');

    // 1. Login
    console.log('1. Logging in...');
    let token;
    try {
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
        });

        if (!loginRes.ok) {
            throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
        }

        const loginData = await loginRes.json();
        token = loginData.access_token;
        console.log('✅ Login successful');
    } catch (err) {
        console.error('❌ Login failed:', err.message);
        process.exit(1);
    }

    const headers = { Authorization: `Bearer ${token}` };

    // 2. Check Endpoints
    const endpoints = [
        { name: 'Admins', path: '/auth/users' }, // Note: AuthController maps this
        { name: 'Destinations', path: '/destinations' },
        { name: 'Services', path: '/services' },
        { name: 'Messages', path: '/contact' },
        { name: 'Bookings', path: '/bookings' },
    ];

    let allPassed = true;

    for (const ep of endpoints) {
        try {
            const res = await fetch(`${BASE_URL}${ep.path}`, { headers });
            if (res.ok) {
                console.log(`✅ ${ep.name} (${ep.path}): OK`);
            } else {
                console.error(`❌ ${ep.name} (${ep.path}): Failed ${res.status}`);
                allPassed = false;
            }
        } catch (err) {
            console.error(`❌ ${ep.name} (${ep.path}): Error ${err.message}`);
            allPassed = false;
        }
    }

    if (allPassed) {
        console.log('\n🎉 All admin endpoints are working correctly!');
    } else {
        console.log('\n⚠️ Some endpoints failed.');
        process.exit(1);
    }
}

verify();
