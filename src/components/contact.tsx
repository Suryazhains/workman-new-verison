import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Real data pulled from your LandingPageThree code
  const contactInfo = {
    phone1: "+91 98403 27575",
    phone2: "+91 44 4238 5222",
    phone3: "+91 97908 09675",
    email: "workmansign@hotmail.com",
    address: "No16, 2nd Main Rd, Pallavan Nagar, Maduravoyal, Chennai, Tamil Nadu 600095, India",
    quote: "Our range of services is designed to cover all your branding and signage needs, no matter the scale."
  };

  // Connected Form Submission Logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitted(false);
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbz7QGTDDDOkSasd9GM8Y2KzgWqulEwcWUPhLe9xhiatuQR95GyuFobhTGRapE9l7fo-XA/exec",
        {
          method: "POST",
          body: formData,
          mode: "no-cors", 
        }
      );

      setSubmitted(true);
      formElement.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was a network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#959064] flex items-center justify-center p-6 md:p-12 font-sans m-0">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Section: Content & Form */}
        <div className="flex flex-col text-white">
          {/* Title font updated to DM Sans and uppercase */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide font-['DM_Sans'] uppercase">
            Contact Us
          </h1>
          <p className="text-white/90 mb-10 max-w-md text-sm md:text-base leading-relaxed">
            {contactInfo.quote}
          </p>

          <form className="space-y-5 flex flex-col mb-12" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Name *" 
              className="w-full bg-white/10 placeholder-white/70 text-white px-5 py-4 rounded outline-none focus:ring-2 focus:ring-white/50 transition-all border border-transparent"
              required
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone number *" 
              maxLength={10}
              pattern="[0-9]{10}"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
              }}
              className="w-full bg-white/10 placeholder-white/70 text-white px-5 py-4 rounded outline-none focus:ring-2 focus:ring-white/50 transition-all border border-transparent"
              required
            />
            <textarea 
              name="message"
              placeholder="Message *" 
              rows={4}
              className="w-full bg-white/10 placeholder-white/70 text-white px-5 py-4 rounded outline-none focus:ring-2 focus:ring-white/50 transition-all border border-transparent resize-none"
              required
            />
            
            {submitted && (
              <div className="flex items-center gap-2 text-[#bdebb5] text-sm font-medium">
                <CheckCircle size={16} />
                <span>Submitted successfully!</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-white text-[#959064] font-bold tracking-widest text-sm px-5 py-4 rounded mt-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              {isSubmitting ? 'SENDING...' : 'SEND'}
            </button>
          </form>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 text-sm">
            
            {/* Clickable Phones */}
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-0.5 opacity-90 shrink-0" />
              <div className="flex flex-col gap-1.5">
                <p className="font-bold tracking-widest mb-1 text-xs">PHONE</p>
                <a href={`tel:${contactInfo.phone1.replace(/\s/g, '')}`} className="opacity-90 hover:text-white hover:underline transition-all">{contactInfo.phone1}</a>
                <a href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`} className="opacity-90 hover:text-white hover:underline transition-all">{contactInfo.phone2}</a>
                <a href={`tel:${contactInfo.phone3.replace(/\s/g, '')}`} className="opacity-90 hover:text-white hover:underline transition-all">{contactInfo.phone3}</a>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {/* Clickable Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 opacity-90 shrink-0" />
                <div>
                  <p className="font-bold tracking-widest mb-1 text-xs">EMAIL</p>
                  <a href={`mailto:${contactInfo.email}`} className="opacity-90 hover:text-white hover:underline transition-all break-all">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Address section added from your real data */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 opacity-90 shrink-0" />
                <div>
                  <p className="font-bold tracking-widest mb-1 text-xs">ADDRESS</p>
                  <p className="opacity-90 leading-relaxed pr-4">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Section: Real Map */}
        <div className="h-[500px] lg:h-[650px] w-full rounded-lg overflow-hidden shadow-xl lg:shadow-none">
          <iframe
            title="The Workman Advertising Location"
            src="https://www.google.com/maps?q=No16,2nd+Main+Rd,Pallavan+Nagar,Maduravoyal,Chennai,Tamil+Nadu+600095&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default ContactPage;