/**
 * PawLife Netlify & Static Deployment Mock Data Engine (netlify_mock.js)
 * Enables a fully interactive client-side live demo on Netlify without requiring a Java backend server.
 * Author: Sanvidu Nethula
 */

(function () {
    const isNetlifyOrStatic = 
        window.location.hostname.includes('netlify.app') || 
        window.location.hostname.includes('github.io') ||
        window.location.protocol === 'file:' ||
        (window.location.port !== '3000' && window.location.port !== '8080');

    // Default Seed Dataset
    const DEMO_DB = {
        users: [
            { user_id: 1, first_name: "Sanvidu", last_name: "Nethula", email: "admin@pawlife.lk", role: "Admin", phone_number: "+94 77 123 4567", status: "Active" },
            { user_id: 2, first_name: "Kasun", last_name: "De Silva", email: "vet@pawlife.lk", role: "Veterinary Officer", phone_number: "+94 77 101 7090", status: "Active" },
            { user_id: 3, first_name: "Ravindu", last_name: "Perera", email: "reception@pawlife.lk", role: "Appointments Manager", phone_number: "+94 76 102 5210", status: "Active" },
            { user_id: 4, first_name: "Harsha", last_name: "Fernando", email: "inventory@pawlife.lk", role: "Inventory Manager", phone_number: "+94 75 103 6070", status: "Active" },
            { user_id: 5, first_name: "Umesh", last_name: "Silva", email: "manager@pawlife.lk", role: "Centre Manager", phone_number: "+94 70 101 5340", status: "Active" },
            { user_id: 6, first_name: "Thanuki", last_name: "Bandara", email: "groomer@pawlife.lk", role: "Grooming Staff", phone_number: "+94 78 103 4080", status: "Active" }
        ],
        roles: [
            { role_name: "Admin", module_name: "System Admin", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Admin", module_name: "Appointments", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Admin", module_name: "Pet EHR", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Admin", module_name: "Smart Inventory", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Admin", module_name: "Grooming", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Admin", module_name: "Operations Hub", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Centre Manager", module_name: "System Admin", can_view: 1, can_edit: 0, can_delete: 0, can_export: 1 },
            { role_name: "Centre Manager", module_name: "Appointments", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Centre Manager", module_name: "Operations Hub", can_view: 1, can_edit: 1, can_delete: 0, can_export: 1 },
            { role_name: "Veterinary Officer", module_name: "Pet EHR", can_view: 1, can_edit: 1, can_delete: 0, can_export: 1 },
            { role_name: "Veterinary Officer", module_name: "Appointments", can_view: 1, can_edit: 0, can_delete: 0, can_export: 0 },
            { role_name: "Appointments Manager", module_name: "Appointments", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Inventory Manager", module_name: "Smart Inventory", can_view: 1, can_edit: 1, can_delete: 1, can_export: 1 },
            { role_name: "Grooming Staff", module_name: "Grooming", can_view: 1, can_edit: 1, can_delete: 0, can_export: 0 }
        ],
        pets: [
            { pet_id: 1, pet_name: "Buddy", species: "Dog", breed: "Golden Retriever", gender: "Male", date_of_birth: "2021-04-12", microchip_no: "MC-195765", owner_name: "Tharushi Silva", phone_number: "+94 72 345 6789", medical_notes: "Healthy active dog, prone to mild ear moisture.", allergies: "None known" },
            { pet_id: 2, pet_name: "Luna", species: "Cat", breed: "Persian", gender: "Female", date_of_birth: "2022-08-19", microchip_no: "MC-789012", owner_name: "Kamal Perera", phone_number: "+94 76 543 2189", medical_notes: "Regular coat maintenance needed.", allergies: "Fish protein allergy" },
            { pet_id: 3, pet_name: "Milo", species: "Dog", breed: "Beagle", gender: "Male", date_of_birth: "2020-11-05", microchip_no: "MC-345678", owner_name: "Nethmi Alwis", phone_number: "+94 71 890 1234", medical_notes: "Seasonal skin dermatitis.", allergies: "Dust mite hypersensitivity" },
            { pet_id: 4, pet_name: "Bella", species: "Cat", breed: "Siamese", gender: "Female", date_of_birth: "2023-01-22", microchip_no: "MC-901234", owner_name: "Dinesh Mendis", phone_number: "+94 78 234 5678", medical_notes: "Annual booster vaccination up to date.", allergies: "None" }
        ],
        appointments: [
            { appointment_id: 1, pet_name: "Buddy", customer_name: "Tharushi Silva", service_type: "Full Grooming", booking_date: "2026-11-16", time_slot: "10:00 - 11:00 AM", status: "Confirmed", notes: "Prefers scissor styling" },
            { appointment_id: 2, pet_name: "Luna", customer_name: "Kamal Perera", service_type: "Clinical Checkup", booking_date: "2026-11-16", time_slot: "11:30 - 12:30 PM", status: "Confirmed", notes: "Routine health checkup" },
            { appointment_id: 3, pet_name: "Milo", customer_name: "Nethmi Alwis", service_type: "Vaccination", booking_date: "2026-11-17", time_slot: "02:00 - 03:00 PM", status: "Booked", notes: "Annual DHPP booster" },
            { appointment_id: 4, pet_name: "Bella", customer_name: "Dinesh Mendis", service_type: "Dental Scaling", booking_date: "2026-11-17", time_slot: "03:30 - 04:30 PM", status: "Booked", notes: "Tartar cleaning" }
        ],
        supplies: [
            { supply_id: 1, supply_name: "DHPP Canine Vaccine", category: "Vaccines", quantity: 18, unit: "Vials", min_threshold: 15, unit_price: 3200.00, batch_number: "VAC-2026-08", expiry_date: "2027-08-30" },
            { supply_id: 2, supply_name: "Rabies Multi-Dose Vaccine", category: "Vaccines", quantity: 6, unit: "Vials", min_threshold: 10, unit_price: 2400.00, batch_number: "RAB-2026-04", expiry_date: "2027-04-15" },
            { supply_id: 3, supply_name: "Amoxicillin Clavulanate 250mg", category: "Antibiotics", quantity: 45, unit: "Boxes", min_threshold: 20, unit_price: 1850.00, batch_number: "AMX-2026-11", expiry_date: "2027-11-20" },
            { supply_id: 4, supply_name: "Meloxicam Anti-Inflammatory Oral", category: "Pain Relief", quantity: 12, unit: "Bottles", min_threshold: 10, unit_price: 2900.00, batch_number: "MLX-2026-09", expiry_date: "2027-09-10" },
            { supply_id: 5, supply_name: "Oatmeal Soothing Pet Shampoo", category: "Grooming", quantity: 28, unit: "Bottles", min_threshold: 12, unit_price: 2150.00, batch_number: "SHP-2026-02", expiry_date: "2028-02-28" },
            { supply_id: 6, supply_name: "Cohesive Flexible Bandages 4-inch", category: "First Aid", quantity: 50, unit: "Rolls", min_threshold: 25, unit_price: 450.00, batch_number: "BND-2026-01", expiry_date: "2029-01-01" }
        ],
        grooming_sessions: [
            { session_id: 1, pet_name: "Buddy", pet_id: 1, package_type: "Full Salon Spa", progress_status: "Styling", observations: "Coat brushed, nail trimmed, styling ears.", owner_name: "Tharushi Silva", phone_number: "+94 72 345 6789" },
            { session_id: 2, pet_name: "Luna", pet_id: 2, package_type: "Bath & Blowdry", progress_status: "Bathing", observations: "Relaxed in hydro-bath.", owner_name: "Kamal Perera", phone_number: "+94 76 543 2189" },
            { session_id: 3, pet_name: "Milo", pet_id: 3, package_type: "Hygiene Trim", progress_status: "Checked-in", observations: "Arrived on schedule.", owner_name: "Nethmi Alwis", phone_number: "+94 71 890 1234" },
            { session_id: 4, pet_name: "Bella", pet_id: 4, package_type: "Full Salon Spa", progress_status: "Ready for Pick-up", observations: "Completed grooming session. Owner alerted.", owner_name: "Dinesh Mendis", phone_number: "+94 78 234 5678" }
        ],
        shifts: [
            { shift_id: 1, staff_name: "Kasun De Silva", staff_role: "Veterinary Officer", shift_date: "2026-11-16", shift_type: "Morning", hours: "08:00 - 14:00", status: "Completed" },
            { shift_id: 2, staff_name: "Ravindu Perera", staff_role: "Appointments Manager", shift_date: "2026-11-16", shift_type: "Full Day", hours: "08:00 - 17:00", status: "Scheduled" },
            { shift_id: 3, staff_name: "Harsha Fernando", staff_role: "Inventory Manager", shift_date: "2026-11-16", shift_type: "Morning", hours: "08:30 - 16:30", status: "Scheduled" },
            { shift_id: 4, staff_name: "Thanuki Bandara", staff_role: "Grooming Staff", shift_date: "2026-11-16", shift_type: "Full Day", hours: "09:00 - 17:00", status: "Scheduled" }
        ],
        audit_logs: [
            { log_id: 1, user_name: "Sanvidu Nethula", action: "SYSTEM_ACCESS", module_name: "System Administration", details: "Admin session authenticated successfully.", timestamp: "2026-11-16 08:00:00" },
            { log_id: 2, user_name: "Harsha Fernando", action: "STOCK_DEDUCTION", module_name: "Smart Inventory", details: "Deducted 2 units of Oatmeal Shampoo for Salon #1.", timestamp: "2026-11-16 09:30:00" },
            { log_id: 3, user_name: "Thanuki Bandara", action: "GROOMING_TRANSITION", module_name: "Grooming Workflow", details: "Moved Buddy to Styling station.", timestamp: "2026-11-16 10:15:00" }
        ],
        notifications: [
            { notification_id: 1, message: "Low Stock Alert: Rabies Vaccine balance dropped to 6 vials (Below 10 minimum)", notification_type: "Inventory Alert", created_at: "Just now" },
            { notification_id: 2, message: "Appointment Confirmed: Buddy booked for Full Grooming at 10:00 AM", notification_type: "Booking Alert", created_at: "1 hour ago" },
            { notification_id: 3, message: "Ready for Pick-up: Bella grooming session is complete and ready for collection.", notification_type: "Grooming Alert", created_at: "2 hours ago" }
        ]
    };

    // Helper: mock response creator
    function mockResponse(data, status = 200) {
        return new Response(JSON.stringify(data), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Interceptor function
    async function handleMockApi(url, options = {}) {
        const u = url.toLowerCase();
        const method = (options.method || 'GET').toUpperCase();
        let body = {};
        if (options.body && typeof options.body === 'string') {
            try { body = JSON.parse(options.body); } catch(e) {}
        }

        console.log(`🐾 [PawLife Mock API] ${method} ${url}`, body);

        // 1. Staff Login
        if (u.includes('/api/admin/login')) {
            const username = (body.username || 'admin').toLowerCase();
            const matchedUser = DEMO_DB.users.find(u => 
                u.email.toLowerCase().includes(username) || 
                u.first_name.toLowerCase().includes(username) ||
                username.includes('admin') || username.includes('sanvidu')
            ) || DEMO_DB.users[0];

            return mockResponse({
                success: true,
                user: matchedUser
            });
        }

        // 2. Customer Login
        if (u.includes('/api/customer/login')) {
            return mockResponse({
                success: true,
                user: { owner_id: 1, user_id: 101, first_name: "Tharushi", last_name: "Silva", email: body.email || "customer@pawlife.lk", phone_number: "+94 72 345 6789", role: "Pet Owner" }
            });
        }

        // 3. Search Pets & EHR
        if (u.includes('/api/customer/search-pets') || u.includes('/api/pets/search') || u.includes('/api/pets')) {
            return mockResponse({ success: true, pets: DEMO_DB.pets });
        }

        // 4. Roles & Permissions
        if (u.includes('/api/admin/roles')) {
            return mockResponse({ success: true, permissions: DEMO_DB.roles });
        }

        // 5. Staff Users
        if (u.includes('/api/admin/users')) {
            return mockResponse({ success: true, users: DEMO_DB.users });
        }

        // 6. Audit Logs
        if (u.includes('/api/admin/audit-logs')) {
            return mockResponse({ success: true, logs: DEMO_DB.audit_logs });
        }

        // 7. BI Analytics
        if (u.includes('/api/admin/bi-analytics')) {
            return mockResponse({
                success: true,
                lead_engineer: "Sanvidu Nethula",
                chart_url: "/img/bi_revenue_analytics.png",
                total_revenue: 142500.00,
                growth_rate: "+12.5%",
                projected_next_month: 160312.50,
                revenue_by_service: [
                    { ServiceType: "Clinical Care", TotalRevenue: 54000, AppointmentCount: 18, AvgRating: 4.9 },
                    { ServiceType: "Full Grooming", TotalRevenue: 48000, AppointmentCount: 16, AvgRating: 4.8 },
                    { ServiceType: "Vaccinations", TotalRevenue: 24500, AppointmentCount: 12, AvgRating: 4.9 },
                    { ServiceType: "Dental Care", TotalRevenue: 16000, AppointmentCount: 4, AvgRating: 4.7 }
                ]
            });
        }

        // 8. Appointments
        if (u.includes('/api/appointments/book')) {
            const newId = DEMO_DB.appointments.length + 1;
            DEMO_DB.appointments.push({
                appointment_id: newId,
                pet_name: body.pet_name || "Buddy",
                customer_name: body.customer_name || "Tharushi Silva",
                service_type: body.service_type || "Clinical Checkup",
                booking_date: body.booking_date || new Date().toISOString().split('T')[0],
                time_slot: body.time_slot || "10:00 - 11:00 AM",
                status: "Booked",
                notes: body.notes || "Client booking"
            });
            return mockResponse({ success: true, appointment_id: newId });
        }

        if (u.includes('/api/appointments')) {
            return mockResponse({ success: true, appointments: DEMO_DB.appointments });
        }

        // 9. Smart Inventory
        if (u.includes('/api/inventory/deduct')) {
            const supplyId = body.supply_id || 1;
            const item = DEMO_DB.supplies.find(s => s.supply_id === supplyId);
            if (item) {
                item.quantity = Math.max(0, item.quantity - (body.quantity || 1));
            }
            return mockResponse({ success: true, remaining: item ? item.quantity : 10 });
        }

        if (u.includes('/api/inventory/receive')) {
            return mockResponse({ success: true, message: "Stock received successfully" });
        }

        if (u.includes('/api/inventory')) {
            return mockResponse({ success: true, supplies: DEMO_DB.supplies });
        }

        // 10. Grooming Sessions
        if (u.includes('/api/grooming/sessions')) {
            return mockResponse({ success: true, sessions: DEMO_DB.grooming_sessions });
        }

        if (u.includes('/api/grooming/checkin')) {
            return mockResponse({ success: true, session_id: 99, status: "Checked-in" });
        }

        // 11. Operational Centre Hub
        if (u.includes('/api/operations/kpis') || u.includes('/api/dashboard/kpis')) {
            return mockResponse({
                success: true,
                kpis: {
                    today_appointments: DEMO_DB.appointments.length,
                    active_grooming: DEMO_DB.grooming_sessions.length,
                    low_stock_items: DEMO_DB.supplies.filter(s => s.quantity <= s.min_threshold).length,
                    total_revenue: 142500.00
                }
            });
        }

        if (u.includes('/api/operations/alerts') || u.includes('/api/alerts')) {
            return mockResponse({
                success: true,
                low_stock_alerts: DEMO_DB.supplies.filter(s => s.quantity <= s.min_threshold),
                overdue_vaccinations: [
                    { pet_name: "Luna", vaccine_name: "Rabies Booster", owner_name: "Kamal Perera", phone_number: "+94 76 543 2189", next_due_date: "2026-10-15" }
                ]
            });
        }

        if (u.includes('/api/operations/shifts') || u.includes('/api/shifts')) {
            return mockResponse({ success: true, shifts: DEMO_DB.shifts });
        }

        // 12. In-App Notifications
        if (u.includes('/api/notifications')) {
            return mockResponse({ success: true, notifications: DEMO_DB.notifications });
        }

        // 13. Customer Reviews
        if (u.includes('/api/reviews') || u.includes('/api/admin/reviews')) {
            return mockResponse({
                success: true,
                reviews: [
                    { review_id: 1, customer_name: "Tharushi Silva", pet_name: "Buddy", rating: 5, comment: "Outstanding veterinary care and loving staff!", created_at: "2026-11-10" },
                    { review_id: 2, customer_name: "Kamal Perera", pet_name: "Luna", rating: 5, comment: "The grooming salon did a fantastic job with my Persian cat.", created_at: "2026-11-12" },
                    { review_id: 3, customer_name: "Nethmi Alwis", pet_name: "Milo", rating: 4, comment: "Quick appointment booking and modern clinic.", created_at: "2026-11-14" }
                ]
            });
        }

        // Generic success fallback
        return mockResponse({ success: true, message: "OK (PawLife Netlify Live Mock)" });
    }

    // Intercept window.fetch
    const originalFetch = window.fetch;
    window.fetch = async function (resource, options) {
        const url = typeof resource === 'string' ? resource : (resource ? resource.url : '');
        
        // If not an internal /api/ call, pass through to browser
        if (!url || !url.startsWith('/api/')) {
            return originalFetch.apply(this, arguments);
        }

        // If explicitly deployed on Netlify or static file protocol, serve mock immediately
        if (isNetlifyOrStatic) {
            return handleMockApi(url, options);
        }

        // If local development, try real Spring Boot server first; fallback to mock on failure
        try {
            const res = await originalFetch.apply(this, arguments);
            if (res.status === 404 || res.status === 502 || res.status === 503) {
                console.warn(`[PawLife] Server returned ${res.status} for ${url}, falling back to live demo mock.`);
                return handleMockApi(url, options);
            }
            return res;
        } catch (err) {
            console.warn(`[PawLife] Backend server not reachable (${err.message}), falling back to live demo mock.`);
            return handleMockApi(url, options);
        }
    };

    console.log("🐾 PawLife Netlify Demo Engine loaded: Live interactive mode enabled!");
})();
