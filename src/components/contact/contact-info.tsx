// Removed unused Button import

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Contact Information
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
              <p className="text-gray-600">123 Travel Street, Adventure City, AC 12345</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Phone Numbers</h4>
              <p className="text-gray-600">Main: +1 (555) 123-4567</p>
              <p className="text-gray-600">Toll-Free: +1 (800) TRAVEL-1</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
              <p className="text-gray-600">info@AmiShalom.com</p>
              <p className="text-gray-600">bookings@AmiShalom.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "Palanquin Dark, sans-serif" }}
        >
          Quick Actions
        </h3>
        
        <div className="space-y-4">
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors duration-200">
            Book a Consultation
          </button>
          
          <button className="w-full border border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 rounded-lg transition-colors duration-200">
            Request a Quote
          </button>
          
          <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors duration-200">
            Download Brochure
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Follow us for travel inspiration:</p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              Facebook
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              Instagram
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}