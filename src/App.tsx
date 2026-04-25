import React, { useEffect, useState } from 'react';
import { MessageCircle, Star, ShieldCheck, Leaf, Truck, Sun, MapPin, Instagram, Heart, Calendar, Clock, Map, X, Check, Smartphone, Package, Ban, Home } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import CustomCursor from './components/CustomCursor';

const TornPaperEdge = ({ topColor, bottomColor }: { topColor: string, bottomColor: string }) => (
  <div className="w-full h-8 md:h-12 relative" style={{ backgroundColor: topColor }}>
    <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,100 100,100 100,50 98,65 96,40 94,70 92,45 90,60 88,35 86,75 84,40 82,65 80,45 78,70 76,35 74,60 72,40 70,75 68,45 66,65 64,35 62,70 60,40 58,60 56,45 54,75 52,35 50,65 48,40 46,70 44,45 42,60 40,35 38,75 36,40 34,65 32,45 30,70 28,35 26,60 24,40 22,75 20,45 18,65 16,35 14,70 12,40 10,60 8,45 6,75 4,35 2,65 0,50" fill={bottomColor} />
    </svg>
  </div>
);

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const reviews = [
  { id: 1, name: "Rahul D.", time: "10:42 AM", rating: 5, text: "Absolutely the best Alphonso mangoes I've had in Mumbai. The aroma filled my entire house as soon as I opened the box! 🥭✨" },
  { id: 2, name: "Priya S.", time: "02:15 PM", rating: 5, text: "Perfectly ripened and incredibly sweet. You can really tell these are authentic Ratnagiri Hapus. Will definitely order again. 😍" },
  { id: 3, name: "Amit K.", time: "09:30 AM", rating: 4, text: "Great packaging and fast delivery. The mangoes were spotless and tasted divine. Highly recommended for gifting! 🎁" },
  { id: 4, name: "Neha M.", time: "04:20 PM", rating: 5, text: "I've been looking for chemical-free mangoes for my kids, and King of Fruits delivered exactly that. Pure sweetness! 💛" },
  { id: 5, name: "Vikram T.", time: "11:05 AM", rating: 5, text: "Just received my second box this season. The quality is consistently top-notch. Keep it up! 👏" },
  { id: 6, name: "Sneha R.", time: "06:50 PM", rating: 5, text: "My family loved them! The size of the mangoes was impressive and not a single bad piece. 🥭💯" },
  { id: 7, name: "Karan P.", time: "01:10 PM", rating: 5, text: "The premium gift box was beautifully packed. Made for a perfect anniversary gift for my parents. They were thrilled!" },
  { id: 8, name: "Anjali V.", time: "08:45 AM", rating: 4, text: "Very juicy and flavorful. Delivery was a bit delayed due to rain, but the fruit quality made up for it. 😋" }
];

const row1 = [...reviews.slice(0, 4), ...reviews.slice(0, 4)];
const row2 = [...reviews.slice(4, 8), ...reviews.slice(4, 8)];

const FloatingParticles = () => {
  const particles = React.useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      isLeaf: Math.random() > 0.7,
      xOffset: Math.random() * 100 - 50
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            y: "-10vh", 
            x: p.xOffset,
            opacity: [0, 0.6, 0],
            rotate: 360
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute rounded-full ${p.isLeaf ? 'bg-green-500/20 blur-[2px]' : 'bg-white/30 blur-[4px]'}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
          }}
        />
      ))}
    </div>
  );
};

const HeroMango = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative flex justify-center items-center mt-8 md:mt-0 w-full h-full min-h-[300px] md:min-h-[400px]"
    >
      <motion.img 
        src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Mango%20King.png" 
        alt="Premium Ratnagiri Alphonso Mango - King of Fruits" 
        className="w-full max-w-[280px] sm:max-w-md lg:max-w-lg drop-shadow-2xl object-contain cursor-grab active:cursor-grabbing relative z-10" 
        style={{ rotateX, rotateY }}
        animate={{ y: [0, -15, 0] }}
        transition={{ 
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
      />
    </motion.div>
  );
};

const UnboxingCard = () => {
  return (
    <FadeIn delay={0.3}>
      <div className="bg-[#FAF4E1] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center clay-card-strong hover:-translate-y-2 transition-transform duration-300 group h-full relative">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Peti%20.png" 
          alt="Small Size Mangoes" 
          className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-xl mb-6 md:mb-8" 
          loading="lazy"
        />
        <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 text-brand-brown">Small Size</h3>
        <p className="text-xs text-brand-orange mb-4 uppercase tracking-wider font-bold">1 Dozen • 160+ grams per fruit</p>
        <p className="text-sm text-brand-brown/70 mb-6 flex-grow">Sweet and flavorful small-sized mangoes, beautifully packaged and perfect for everyday enjoyment.</p>
        <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-auto pt-4 border-t border-black/5 gap-4 sm:gap-0">
          <span className="text-2xl font-bold text-brand-brown">₹600</span>
          <a href="https://wa.me/918655115473?text=Hello!%20I%20would%20like%20to%20order%20the%20Small%20Size%20Mangoes%20(1%20Dozen)%20for%20%E2%82%B9600." target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-brand-yellow text-brand-brown px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-orange hover:text-white clay-btn-primary text-center">
            Order Now
          </a>
        </div>
      </div>
    </FadeIn>
  );
};

const DeliveryZones = () => {
  const zones = [
    {
      id: "south-bombay",
      name: "South Bombay",
      timeline: "Next Day Delivery",
      description: "Colaba, Fort, Marine Drive, Malabar Hill, Worli",
      icon: <MapPin className="text-brand-orange" size={24} />,
      color: "bg-orange-100",
      delay: 0.1
    },
    {
      id: "western-suburbs",
      name: "Western Suburbs",
      timeline: "Same Day Delivery",
      description: "Bandra, Andheri, Goregaon, Malad, Borivali",
      icon: <Truck className="text-brand-yellow" size={24} />,
      color: "bg-yellow-100",
      delay: 0.2
    },
    {
      id: "central-suburbs",
      name: "Central Suburbs",
      timeline: "2 Days Delivery",
      description: "Dadar, Sion, Kurla, Ghatkopar, Mulund",
      icon: <Clock className="text-brand-green" size={24} />,
      color: "bg-green-100",
      delay: 0.3
    },
    {
      id: "thane-navi-mumbai",
      name: "Thane & Navi Mumbai",
      timeline: "WeFast - Next Day",
      description: "Thane West, Vashi, Nerul, Belapur, Kharghar",
      icon: <Calendar className="text-pink-500" size={24} />,
      color: "bg-pink-100",
      delay: 0.4
    }
  ];

  return (
    <section id="delivery-zones" className="bg-brand-cream py-16 md:py-24 w-full relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-brand-orange/10 px-4 py-2 rounded-full text-brand-orange font-bold text-sm tracking-wider uppercase">
            <Map className="text-brand-orange" size={18} />
            <span>Mumbai Delivery Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">When will my Peti arrive?</h2>
          <p className="text-brand-brown/70 max-w-2xl mx-auto text-lg">
            Mumbai is vast, but our delivery network is precise. Find your zone below to know exactly when to expect your farm-fresh Alphonso mangoes.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {zones.map((zone) => (
            <FadeIn key={zone.id} delay={zone.delay} className="h-full">
              <motion.div 
                className="bg-white p-8 rounded-3xl clay-card h-full flex flex-col relative overflow-hidden group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-14 h-14 rounded-2xl ${zone.color} flex items-center justify-center mb-6 shadow-inner relative z-10`}>
                  {zone.icon}
                </div>
                
                <h3 className="text-xl font-bold text-brand-brown mb-2 relative z-10">{zone.name}</h3>
                <div className="inline-block bg-brand-beige text-brand-brown font-bold text-sm px-3 py-1 rounded-full mb-4 w-fit border border-brand-brown/10 relative z-10">
                  {zone.timeline}
                </div>
                
                <p className="text-brand-brown/60 text-sm leading-relaxed mt-auto pt-4 border-t border-brand-brown/5 relative z-10">
                  <span className="font-semibold text-brand-brown/80 block mb-1">Includes:</span>
                  {zone.description}
                </p>

                {/* Decorative background element */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full ${zone.color} opacity-20 group-hover:scale-150 transition-transform duration-500 ease-out pointer-events-none`}></div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.5} className="mt-12 text-center">
           <p className="text-brand-brown/60 text-sm italic">
             * Delivery timelines are subject to weather conditions and harvest schedules. We'll always keep you updated via WhatsApp!
           </p>
        </FadeIn>
      </div>
    </section>
  );
};

const LocationMap = () => {
  return (
    <section className="bg-brand-beige py-16 md:py-24 w-full relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4 text-brand-orange">
            <MapPin size={28} />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown">Visit Our Store</h2>
          </div>
          <p className="text-brand-brown/70 max-w-2xl mx-auto">
            Come visit us at our Jogeshwari location to pick up your fresh, premium Ratnagiri Alphonso mangoes in person.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 relative z-10">
            <iframe 
              src="https://maps.google.com/maps?q=King%20of%20Fruits%2C%20Gala%20number%2020%2C%20Arb%20Heights%2C%20Jogeshwari%20West%2C%20Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="King of Fruits Jogeshwari Location"
            ></iframe>
          </div>
          <div className="flex justify-center mt-8">
            <motion.a 
              href="https://www.google.com/maps/dir/19.1410408,72.8397314/King+of+Fruits,+Gala+number+20,+Arb+Heights,+Hill+Park,+Road,+off+Swami+Vivekanand+Road,+Shastri+Nagar,+Jogeshwari+West,+Mumbai,+Maharashtra+400102,+India/@19.1383793,72.8419841,15z/data=!3m1!4b1!4m19!1m8!3m7!1s0x3be7b741063d2105:0xdb60bf2c84f4d8ec!2sKing+of+Fruits!8m2!3d19.1383793!4d72.8419841!15sChlLaW5nIG9mIGZydWl0cyBqb2dlc2h3YXJpkgERZnJ1aXRzX3dob2xlc2FsZXLgAQA!16s%2Fg%2F11z42dd381!4m9!1m1!4e1!1m5!1m1!1s0x3be7b741063d2105:0xdb60bf2c84f4d8ec!2m2!1d72.8419841!2d19.1383793!3e9?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full font-bold clay-btn hover:bg-brand-brown transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin size={20} />
              Get Directions
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const InstagramFeed = () => {
  const posts = [
    { id: 1, video: "https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Video.mp4", likes: 342, comments: 28 },
    { id: 2, video: "https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Video%20%20(2).mp4", likes: 512, comments: 45 },
    { id: 3, video: "https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Video%20%20(1).mp4", likes: 289, comments: 15 },
  ];

  return (
    <section className="bg-brand-cream py-16 md:py-24 w-full relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            <Instagram className="text-pink-500" size={28} />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown">Follow Our Journey</h2>
          </div>
          <p className="text-brand-brown/70 max-w-2xl mx-auto">
            From our Ratnagiri orchards to your table. Tag us <a href="https://www.instagram.com/kingoffruitsss/" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-orange hover:underline">@kingoffruitsss</a> to be featured!
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.1}>
              <motion.a 
                href="https://www.instagram.com/kingoffruitsss/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/5] md:aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden clay-card cursor-pointer block"
                whileHover={{ y: -5 }}
              >
                <video 
                  src={post.video} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Heart size={20} className="fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <MessageCircle size={20} className="fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.4} className="mt-12 text-center">
          <motion.a 
            href="https://www.instagram.com/kingoffruitsss/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand-brown px-8 py-4 rounded-full font-bold clay-btn hover:text-brand-orange transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={20} />
            View on Instagram
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
};

const ReplacementModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
            >
              <X size={16} />
            </button>

            {/* Content Container */}
            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="mb-6 sm:mb-10">
                <p className="text-amber-500/80 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-2 sm:mb-3">The Guarantee</p>
                <h3 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
                  Our Replacement<br/>Promise.
                </h3>
                <p className="mt-2 sm:mt-4 text-white/50 text-xs sm:text-base font-light">
                  No questions. No stress. Just premium mangoes.
                </p>
              </div>

              {/* Body / Steps */}
              <div className="space-y-6 sm:space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-[1.2rem] sm:left-[1.35rem] top-6 bottom-6 sm:top-8 sm:bottom-8 w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent"></div>

                {/* Item 1 */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex gap-4 sm:gap-6 items-start relative z-10">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#111] border border-white/10 text-amber-500/80 shadow-inner">
                    <ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div className="pt-0.5 sm:pt-1">
                    <h4 className="text-sm sm:text-base font-medium text-white tracking-wide">Got a foul mango? We replace it. Free.</h4>
                    <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-white/40 leading-relaxed font-light">No charges, no hassle — unlike any other seller.</p>
                  </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex gap-4 sm:gap-6 items-start relative z-10">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#111] border border-white/10 text-amber-500/80 shadow-inner">
                    <Smartphone size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div className="pt-0.5 sm:pt-1">
                    <h4 className="text-sm sm:text-base font-medium text-white tracking-wide">Just send us a photo on WhatsApp</h4>
                    <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-white/40 leading-relaxed font-light">Show us the bad mango — that's literally all it takes.</p>
                  </div>
                </motion.div>

                {/* Item 3 */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex gap-4 sm:gap-6 items-start relative z-10">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#111] border border-white/10 text-amber-500/80 shadow-inner">
                    <Package size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div className="pt-0.5 sm:pt-1">
                    <h4 className="text-sm sm:text-base font-medium text-white tracking-wide">Same quantity added to next order</h4>
                    <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-white/40 leading-relaxed font-light">Even if it's just 1 mango out of a dozen — we've got you covered.</p>
                  </div>
                </motion.div>
              </div>

              {/* Footer Banner */}
              <div className="mt-8 pt-4 sm:mt-12 sm:pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/30">
                  <Ban size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="text-[9px] sm:text-xs uppercase tracking-widest font-medium">Zero terms & conditions</span>
                </div>
                <span className="text-amber-500/80 text-[9px] sm:text-xs uppercase tracking-widest font-medium">We mean it</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const StoryBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-500 hover:scale-110 transition-transform duration-300 shadow-xl group"
        >
          <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-black relative">
            <video 
              src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Story.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-yellow transition-colors z-50"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Story.mp4"
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const [isReplacementModalOpen, setIsReplacementModalOpen] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-cream selection:bg-brand-orange selection:text-white">
      <ReplacementModal isOpen={isReplacementModalOpen} onClose={() => setIsReplacementModalOpen(false)} />
      <CustomCursor />
      <StoryBubble />
      
      {/* Floating Glassmorphism Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 z-50 max-w-7xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full flex items-center justify-between px-4 md:px-8 py-2 w-full clay-pill">
          <div className="flex items-center cursor-pointer">
            <motion.img 
              src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Logo%20on%20White.png" 
              alt="King of Fruits Logo" 
              className="h-[48px] w-auto object-contain"
              referrerPolicy="no-referrer"
              initial={{ filter: "drop-shadow(0px 0px 0px rgba(249,115,22,0))" }}
              animate={{ 
                filter: [
                  "drop-shadow(0px 0px 0px rgba(249,115,22,0))", 
                  "drop-shadow(0px 0px 20px rgba(249,115,22,0.8))", 
                  "drop-shadow(0px 0px 0px rgba(249,115,22,0))"
                ] 
              }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                filter: "drop-shadow(0px 0px 12px rgba(249,115,22,0.6))",
                transition: { duration: 0.3 }
              }}
            />
          </div>
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/20 shadow-inner">
            {[
              { name: 'Explore', href: '#explore' },
              { name: 'Farm to doorstep', href: '#farm-to-doorstep' },
              { name: 'Selections', href: '#selections' },
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="px-4 py-1.5 rounded-full text-sm font-bold text-brand-brown/80 hover:text-brand-orange hover:bg-white/80 transition-all duration-300 hover:shadow-sm"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setIsReplacementModalOpen(true)}
              className="px-4 py-1.5 rounded-full text-sm font-bold text-brand-brown/80 hover:text-brand-orange hover:bg-white/80 transition-all duration-300 hover:shadow-sm"
            >
              Replacements
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <motion.a 
              href="https://wa.me/918655115473"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-4 py-2 md:px-5 md:py-2 rounded-full font-semibold hover:bg-[#20bd5a] clay-btn-primary flex items-center gap-2 text-sm md:text-base"
            >
              <MessageCircle size={20} className="md:w-5 md:h-5 w-4 h-4" />
              <span className="hidden sm:inline">Order on WhatsApp</span>
              <span className="sm:hidden">Order</span>
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main 
        className="pt-32 md:pt-40 pb-16 md:pb-24 relative w-full overflow-hidden min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Clay%20bg.png")' }}
      >
        <h1 className="sr-only">King of Fruits Mumbai - Premium Organic Alphonso Mangoes</h1>
        <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center justify-center w-full h-full z-10">
          <div className="text-center mb-8 md:mb-12 flex flex-col items-center justify-center w-full">
            <motion.h2 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1, 
                  transition: { staggerChildren: 0.2, delayChildren: 0.2 } 
                }
              }}
              className="text-[9px] sm:text-[10px] md:text-xs font-sans font-black tracking-[0.4em] md:tracking-[0.6em] uppercase flex flex-wrap items-center justify-center gap-3 md:gap-5"
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
                className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl rounded-full px-5 py-2.5 flex items-center justify-center text-[#2A2A2A]"
              >
                <span className="ml-[0.4em] md:ml-[0.6em]">Authentic</span>
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
                className="text-[#FDCB44] text-sm md:text-base leading-none drop-shadow-md"
              >
                .
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
                className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl rounded-full px-5 py-2.5 flex items-center justify-center text-[#2A2A2A]"
              >
                <span className="ml-[0.4em] md:ml-[0.6em]">Alphonso</span>
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
                className="text-[#FDCB44] text-sm md:text-base leading-none drop-shadow-md"
              >
                .
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
                className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl rounded-full px-5 py-2.5 flex items-center justify-center text-[#2A2A2A]"
              >
                <span className="ml-[0.4em] md:ml-[0.6em]">Mango</span>
              </motion.span>
            </motion.h2>
          </div>
          <FadeIn delay={1.2} className="relative w-full max-w-2xl mx-auto flex justify-center items-center">
            <HeroMango />
          </FadeIn>
        </div>
        
        {/* Seamless gradient fade into the next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-transparent to-brand-cream z-10 pointer-events-none"></div>
      </main>

      {/* Section 2: Explore Ratnagiri */}
      <section id="explore" className="bg-brand-cream py-16 md:py-24 w-full overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left: Interactive Image */}
          <FadeIn className="relative flex justify-center items-center order-2 md:order-1">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10"
            >
              <img 
                src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Ratnagiri.png" 
                alt="Explore Ratnagiri" 
                className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl" 
                loading="lazy"
              />
            </motion.div>
            
            {/* Floating decorative elements */}
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-2 md:-right-4 bg-white p-4 rounded-2xl shadow-xl border border-brand-orange/20 clay-card z-20"
            >
              <p className="text-xs font-bold text-brand-brown uppercase tracking-wider">GI Tagged</p>
              <p className="text-brand-orange font-black text-sm md:text-lg">100% Authentic</p>
            </motion.div>
          </FadeIn>

          {/* Right: Text Explanations */}
          <div className="order-1 md:order-2">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-brand-brown">
                Explore <span className="text-brand-orange">Ratnagiri</span>
              </h2>
              <p className="text-brand-brown/80 leading-relaxed text-base md:text-lg mb-8">
                The unique coastal climate and laterite soil of Ratnagiri give our Alphonso mangoes their world-renowned taste, mesmerizing aroma, and vibrant saffron color.
              </p>
            </FadeIn>
            
            <div className="space-y-4 md:space-y-6">
              <FadeIn delay={0.1}>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="bg-white/60 backdrop-blur-sm p-5 md:p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  <h3 className="text-lg md:text-xl font-bold text-brand-brown mb-2 flex items-center gap-3">
                    <span className="bg-brand-yellow text-brand-orange p-2 rounded-full shadow-sm"><Sun size={20} /></span>
                    The Perfect Climate
                  </h3>
                  <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base ml-11">
                    Nestled on the Konkan coast, Ratnagiri's unique blend of volcanic laterite soil and humid sea breeze creates the perfect environment for the world's finest Alphonso mangoes.
                  </p>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="bg-white/60 backdrop-blur-sm p-5 md:p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  <h3 className="text-lg md:text-xl font-bold text-brand-brown mb-2 flex items-center gap-3">
                    <span className="bg-brand-yellow text-brand-orange p-2 rounded-full shadow-sm"><MapPin size={20} /></span>
                    Generations of Farming
                  </h3>
                  <p className="text-brand-brown/70 leading-relaxed text-sm md:text-base ml-11">
                    Our partner orchards have been cultivating Hapus for generations. Every tree is nurtured with traditional wisdom combined with sustainable, chemical-free farming practices.
                  </p>
                </motion.div>
              </FadeIn>
            </div>
          </div>
          
        </div>
      </section>

      {/* Section 2.5: Farm to Doorstep */}
      <section id="farm-to-doorstep" className="bg-brand-cream pb-16 md:pb-24 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <FadeIn className="relative w-full bg-[#FAF4E1] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col items-center text-center clay-card-strong">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-brand-brown">Farm to Doorstep</h2>
            <p className="text-brand-brown/70 max-w-2xl mx-auto mb-12 text-base md:text-lg">
              We eliminate middlemen. Our mangoes are harvested at the exact right maturity from our partner farms in Ratnagiri, ensuring you get the freshest fruit directly in Mumbai.
            </p>
            
            <div className="relative w-full max-w-4xl mx-auto flex justify-center mt-4">
              <motion.img 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Doorstep.png" 
                alt="Farm to Doorstep Delivery" 
                className="w-full h-auto object-contain drop-shadow-2xl max-h-[450px]"
                loading="lazy"
              />
              
              {/* Talk Bubble 1 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute -top-4 md:top-[10%] right-2 md:right-[15%] lg:right-[20%] z-10"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="relative bg-white text-brand-brown font-bold text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl shadow-xl border-2 border-brand-orange/20 clay-card flex items-center gap-1.5 md:gap-2"
                >
                  <span className="text-brand-orange flex items-center"><Truck className="w-4 h-4 md:w-5 md:h-5" /></span>
                  24 hours delivery!
                  {/* Bubble tail */}
                  <div className="absolute -bottom-1.5 md:-bottom-2 left-6 md:left-8 w-3 h-3 md:w-4 md:h-4 bg-white border-b-2 border-r-2 border-brand-orange/20 transform rotate-45"></div>
                </motion.div>
              </motion.div>

              {/* Talk Bubble 2 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute top-[18%] md:top-[40%] left-2 md:left-[10%] z-10"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="relative bg-white text-brand-brown font-bold text-[11px] md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-xl border-2 border-green-500/20 clay-card flex items-center gap-1.5 md:gap-2"
                >
                  <span className="text-green-600 flex items-center"><Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" /></span>
                  Direct from Farm
                  {/* Bubble tail */}
                  <div className="absolute -bottom-1.5 md:-bottom-2 right-6 md:right-8 w-3 h-3 md:w-4 md:h-4 bg-white border-b-2 border-r-2 border-green-500/20 transform rotate-45"></div>
                </motion.div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Product Cards */}
      <section id="selections" className="bg-brand-cream pb-16 md:pb-24 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">Our Premium Selection</h2>
            <p className="text-brand-brown/70 max-w-2xl mx-auto">Handpicked, graded, and packed with extreme care. Choose the perfect box for your family or for gifting.</p>
          </FadeIn>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <FadeIn delay={0.1}>
              <div className="bg-[#FAF4E1] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center clay-card-strong hover:-translate-y-2 transition-transform duration-300 group h-full">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Mango%201%20.png" 
                  alt="King Size (Large) Mangoes" 
                  className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-xl mb-6 md:mb-8" 
                  loading="lazy"
                />
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 text-brand-brown">King Size (Large)</h3>
                <p className="text-xs text-brand-orange mb-4 uppercase tracking-wider font-bold">1 Dozen • 240+ grams per fruit</p>
                <p className="text-sm text-brand-brown/70 mb-6 flex-grow">The finest, largest, and most flawless king-sized mangoes, delivering an unmatched premium experience.</p>
                <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-auto pt-4 border-t border-black/5 gap-4 sm:gap-0">
                  <span className="text-2xl font-bold text-brand-brown">₹1,300</span>
                  <a href="https://wa.me/918655115473?text=Hello!%20I%20would%20like%20to%20order%20the%20King%20Size%20(Large)%20Mangoes%20(1%20Dozen)%20for%20%E2%82%B91,300." target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-brand-yellow text-brand-brown px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-orange hover:text-white clay-btn-primary text-center">
                    Order Now
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Card 2 */}
            <FadeIn delay={0.2}>
              <div className="bg-[#FAF4E1] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center clay-card-strong hover:-translate-y-2 transition-transform duration-300 group h-full relative">
                <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">Bestseller</div>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/mango%202%20.png" 
                  alt="Medium Size Mangoes" 
                  className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-xl mb-6 md:mb-8" 
                  loading="lazy"
                />
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 text-brand-brown">Medium Size</h3>
                <p className="text-xs text-brand-orange mb-4 uppercase tracking-wider font-bold">1 Dozen • 200+ grams per fruit</p>
                <p className="text-sm text-brand-brown/70 mb-6 flex-grow">Perfectly sized, incredibly sweet medium mangoes ideal for daily family consumption and desserts.</p>
                <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-auto pt-4 border-t border-black/5 gap-4 sm:gap-0">
                  <span className="text-2xl font-bold text-brand-brown">₹900</span>
                  <a href="https://wa.me/918655115473?text=Hello!%20I%20would%20like%20to%20order%20the%20Medium%20Size%20Mangoes%20(1%20Dozen)%20for%20%E2%82%B9900." target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-brand-yellow text-brand-brown px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-orange hover:text-white clay-btn-primary text-center">
                    Order Now
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Card 3 */}
            <UnboxingCard />
          </div>
        </div>
      </section>

      <TornPaperEdge topColor="var(--color-brand-cream)" bottomColor="var(--color-brand-beige)" />

      {/* Section 5: Natural Ripening */}
      <section id="sweetness" className="bg-brand-beige py-16 md:py-24 w-full overflow-hidden relative">
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-3 gap-12 items-center relative z-10">
          {/* Left: Features */}
          <FadeIn className="bg-[#EFE3C3] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] clay-card-strong order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-brand-brown">Our Promise</h2>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center clay-icon text-brand-orange shrink-0">
                  <Leaf size={20} />
                </div>
                <div>
                  <div className="font-bold text-base text-brand-brown">Naturally Ripened</div>
                  <div className="text-sm text-brand-brown/70">Traditional grass-bed method</div>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center clay-icon text-brand-orange shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="font-bold text-base text-brand-brown">Carbide Free</div>
                  <div className="text-sm text-brand-brown/70">Zero harmful chemicals used</div>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center clay-icon text-brand-orange shrink-0">
                  <Star size={20} />
                </div>
                <div>
                  <div className="font-bold text-base text-brand-brown">Handpicked</div>
                  <div className="text-sm text-brand-brown/70">Only the flawless fruits make it</div>
                </div>
              </li>
            </ul>
          </FadeIn>
          
          {/* Middle: Title & Button */}
          <FadeIn delay={0.2} className="text-center order-1 md:order-2">
            <p className="text-sm font-bold tracking-widest uppercase mb-4 text-brand-orange">100% Organic</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8 text-brand-brown">
              PURE<br/>SWEETNESS
            </h2>
            <motion.a 
              href="https://wa.me/918655115473"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#20bd5a] transition-colors clay-btn-primary"
            >
              <MessageCircle size={20} />
              Chat with Us
            </motion.a>
          </FadeIn>

          {/* Right: Image */}
          <FadeIn delay={0.3} className="relative h-64 md:h-[450px] order-3 flex items-center justify-center">
            <img src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Juice.png" alt="Mango Juice and Slices" className="w-full h-full object-contain drop-shadow-2xl" loading="lazy" />
          </FadeIn>
        </div>
      </section>

      {/* Delivery Zones Section */}
      <DeliveryZones />

      {/* Section 6: Reviews Carousel */}
      <section id="reviews" className="bg-brand-beige pb-16 md:pb-24 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">What Our Customers Say</h2>
            <p className="text-brand-brown/70 max-w-2xl mx-auto">Don't just take our word for it. Here's what mango lovers across Mumbai have to say.</p>
          </FadeIn>
          
          <div className="relative w-full flex flex-col gap-6 overflow-hidden py-4 -mx-4 px-4 md:mx-0 md:px-0">
            {/* Gradient Masks for smooth fade on edges */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-brand-beige to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-brand-beige to-transparent z-10 pointer-events-none"></div>

            {/* Row 1 */}
            <div className="flex w-max gap-6 animate-marquee">
              {row1.map((review, index) => (
                <div key={`${review.id}-${index}`} className="w-[300px] md:w-[380px] bg-[#E1F5CB] p-5 md:p-6 rounded-2xl rounded-tl-none clay-card shrink-0 relative">
                  {/* Chat bubble tail */}
                  <div className="absolute top-0 -left-3 w-4 h-4 bg-[#E1F5CB] [clip-path:polygon(100%_0,0_0,100%_100%)]"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-[#075E54] text-sm md:text-base">{review.name}</div>
                    <div className="flex gap-0.5 text-brand-yellow">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-brand-brown/90 text-sm md:text-base leading-relaxed mb-3">{review.text}</p>
                  <div className="flex justify-end items-center gap-1 text-[10px] md:text-xs text-brand-brown/50 font-medium">
                    <span>{review.time}</span>
                    <svg viewBox="0 0 16 15" width="16" height="15" className="text-[#53bdeb] fill-current"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex w-max gap-6 animate-marquee-reverse">
              {row2.map((review, index) => (
                <div key={`${review.id}-${index}`} className="w-[300px] md:w-[380px] bg-white p-5 md:p-6 rounded-2xl rounded-tr-none clay-card shrink-0 relative">
                  {/* Chat bubble tail */}
                  <div className="absolute top-0 -right-3 w-4 h-4 bg-white [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-[#075E54] text-sm md:text-base">{review.name}</div>
                    <div className="flex gap-0.5 text-brand-yellow">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-brand-brown/90 text-sm md:text-base leading-relaxed mb-3">{review.text}</p>
                  <div className="flex justify-end items-center gap-1 text-[10px] md:text-xs text-brand-brown/50 font-medium">
                    <span>{review.time}</span>
                    <svg viewBox="0 0 16 15" width="16" height="15" className="text-[#53bdeb] fill-current"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <LocationMap />

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* Clay Footer */}
      <footer className="bg-brand-beige pb-16 pt-8 w-full px-4 md:px-12 relative z-10">
        <motion.div 
          animate={{ 
            y: [0, -6, 0],
            rotateX: [0, 4, 0],
            rotateZ: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ transformPerspective: 1000 }}
          className="max-w-5xl mx-auto bg-[#FDFBF7] py-4 px-6 md:py-5 md:px-10 rounded-3xl md:rounded-full clay-pill flex flex-col sm:flex-row items-center justify-between text-brand-brown/80 text-sm font-medium gap-4"
        >
          <div className="flex items-center">
            <img 
              src="https://zpojmqmlenivqxqcsuwc.supabase.co/storage/v1/object/public/Stalite%20Media/KOF/Logo%20on%20White.png" 
              alt="King of Fruits Logo" 
              className="h-[80px] md:h-[100px] w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-1">
            <p className="text-brand-brown/80 text-sm">© {new Date().getFullYear()} King of Fruits. All rights reserved.</p>
            <button onClick={() => setIsReplacementModalOpen(true)} className="text-brand-orange text-sm font-bold hover:underline">
              Our Replacement Promise
            </button>
            <p className="text-brand-brown/60 text-xs md:text-sm">Premium Alphonso Mangoes • Ratnagiri to Mumbai</p>
          </div>
        </motion.div>
      </footer>

      {/* Mobile Replacements Bubble */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsReplacementModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#0a0a0a] text-white p-2.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-2.5 pr-4 backdrop-blur-md"
      >
        <div className="bg-[#111] rounded-full p-1.5 border border-white/10 text-amber-500/80 shadow-inner">
          <ShieldCheck size={16} strokeWidth={2} />
        </div>
        <span className="text-xs font-semibold tracking-wide text-white/90">Our Guarantee</span>
      </motion.button>
    </div>
  );
}
