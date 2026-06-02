import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = {
    phone3: "+91 8883222286",
    phone1: "+91 44 4238 5222",
    phone2: "+91 97908 09675",
    phone4: "+91 9840327575",
    email: "workmansign@hotmail.com",
    address1: "No16, 2nd Main Rd, Pallavan Nagar, Maduravoyal, Chennai, Tamil Nadu 600095, India",
    address2: "82, Periyas pathiai, Choolaimedu, Chennai - 600094",
    address3: "No.21, 7th St, 3rd Cross St, Dhanalakshmi Nagar, Maduravoyal Chennai-600095",
    address4: "No.5B, Kanniyamman Koil St, Kachinakuppam, Sidco Industrial Estate, Korattur, Chennai - 600098.",
    quote: "Our range of services is designed to cover all your branding and signage needs, no matter the scale."
  };

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
    <div className="min-h-screen bg-[#959064] flex items-center justify-center p-4 pt-1 md:p-8 md:pt-1 font-sans m-0 overflow-hidden">
      
      {/* Bringing in the custom font style from your landing page for consistency */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        .font-dm-sans-extralight { 
            font-family: 'DM Sans', sans-serif !important; 
            font-weight: 200 !important;
        }
      `}} />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        
        {/* Left Section: Content & Form */}
        <div className="flex flex-col text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extralight mb-2 tracking-wide font-dm-sans"
          >
            Contact Us
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-white/90 mb-4 max-w-md text-sm md:text-base leading-relaxed"
          >
            {contactInfo.quote}
          </motion.p>

          <form className="space-y-3 flex flex-col mb-6" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Name *" 
              className="w-full bg-white/10 placeholder-white/70 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-white/50 transition-all border border-transparent text-sm"
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
              className="w-full bg-white/10 placeholder-white/70 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-white/50 transition-all border border-transparent text-sm"
              required
            />
            <textarea 
              name="message"
              placeholder="Message" 
              rows={3}
              className="w-full bg-white/10 placeholder-white/70 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-white/50 transition-all border border-transparent resize-none text-sm"
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
              className={`w-full bg-white text-[#959064] font-bold tracking-widest text-sm px-5 py-3 rounded mt-1 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              {isSubmitting ? 'SENDING...' : 'SEND'}
            </button>
          </form>

          {/* Contact Information Text with Animation - Updated to 3 Columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-5 text-[0.7rem] xl:text-[0.75rem]"
          >
            
            {/* Column 1: Phones & Email */}
            <div className="flex flex-col">
              {/* NEW: Connect Heading added above phone numbers */}
              <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                {"Contact Now".split(" ").map((word, index, array) => (
                  <React.Fragment key={`connect-${index}`}>
                    <motion.span
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {index < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </h4>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2"> 
                  <Phone className="w-4 h-4 opacity-90 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${contactInfo.phone1.replace(/\s/g, '')}`} className="opacity-90 hover:text-white hover:underline transition-all">{contactInfo.phone1}</a>
                    <a href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`} className="opacity-90 hover:text-white hover:underline transition-all">{contactInfo.phone2}</a>
                    <a href={`tel:${contactInfo.phone3.replace(/\s/g, '')}`} className="opacity-90 hover:text-white hover:underline transition-all">{contactInfo.phone3}</a>
                    <a href={`tel:${contactInfo.phone4.replace(/\s/g, '')}`} className="opacity-90 hover:text-white hover:underline transition-all">{contactInfo.phone4}</a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 opacity-90 shrink-0 mt-0.5" />
                  <a href={`mailto:${contactInfo.email}`} className="opacity-90 hover:text-white hover:underline transition-all break-all">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Located at (Center) */}
            <div className="flex flex-col">
              <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                {"Located at".split(" ").map((word, index, array) => (
                  <React.Fragment key={`address-${index}`}>
                    <motion.span
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {index < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </h4>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 opacity-90 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="opacity-90 leading-relaxed pr-2">
                      {contactInfo.address1}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 3: Works (Right) */}
            <div className="flex flex-col">
              <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                {"Works".split(" ").map((word, index, array) => (
                  <React.Fragment key={`works-${index}`}>
                    <motion.span
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {index < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </h4>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 opacity-90 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-6">
                  
                  {/* Maduravoyal Unit */}
                  <div>
                    <p className="opacity-90 leading-relaxed pr-2">
                      {contactInfo.address3}
                    </p>
                  </div>

                  {/* Korattur Unit */}
                  <div>
                    <p className="opacity-90 leading-relaxed pr-2">
                      {contactInfo.address4}
                    </p>
                  </div>

                  {/* Choolaimedu Unit */}
                  <div>
                    <p className="opacity-90 leading-relaxed pr-2">
                      {contactInfo.address2}
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Right Section: Real Map */}
        <div className="h-[300px] lg:h-[500px] w-full rounded-lg overflow-hidden shadow-xl lg:shadow-none  lg:mt-0">
          <iframe
            title="The Workman Advertising Location"
            src="https://maps.google.com/maps?q=The%20Workman%20Advertising,%20Maduravoyal,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default ContactPage;