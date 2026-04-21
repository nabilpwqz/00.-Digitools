import { useState, useEffect } from 'react';

const productsData = [
  { id: 1, name: "AI Writing Pro", description: "Generate high-quality content, blogs, and marketing copy in seconds with advanced AI.", price: 29, period: "Mo", tag: "Best Seller", tagType: "warning", features: ["Unlimited AI generations", "50+ writing templates", "Grammar checker"], icon: "fa-solid fa-robot" },
  { id: 2, name: "Design Templates Pack", description: "2000+ premium templates for social media, presentations, and marketing materials.", price: 49, period: "One-Time", tag: "Popular", tagType: "secondary", features: ["2000+ templates", "Monthly updates", "Commercial license"], icon: "fa-solid fa-palette" },
  { id: 3, name: "Premium Stock Assets", description: "Access millions of royalty-free photos, videos, and graphics for your projects.", price: 19, period: "Mo", tag: "New", tagType: "accent", features: ["10M+ assets", "Commercial use", "No attribution"], icon: "fa-solid fa-images" },
  { id: 4, name: "Automation Toolkit", description: "Automate repetitive tasks and streamline your workflow with powerful tools.", price: 79, period: "Mo", tag: "Popular", tagType: "secondary", features: ["50+ automations", "API access", "Custom workflows"], icon: "fa-solid fa-cogs" },
  { id: 5, name: "Resume Builder Pro", description: "Create professional resumes and cover letters that land interviews.", price: 15, period: "One-Time", tag: "New", tagType: "accent", features: ["100+ templates", "ATS optimization", "Export to PDF"], icon: "fa-solid fa-file-alt" },
  { id: 6, name: "Social Media Content Kit", description: "Complete toolkit for creating engaging social media content across all platforms.", price: 39, period: "Mo", tag: "Best Seller", tagType: "warning", features: ["5000+ assets", "Scheduler included", "Analytics dashboard"], icon: "fa-solid fa-share-alt" }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState('products');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const colors = { success: 'bg-slate-900', info: 'bg-indigo-600', error: 'bg-rose-600' };
    const icon = type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle';

    const toastHTML = `
      <div class="toast flex items-center gap-3 ${colors[type]} px-6 py-4 rounded-2xl shadow-2xl text-white min-w-[320px] border border-white/10">
        <i class="fa-solid ${icon} text-xl text-indigo-400"></i>
        <p class="flex-1 text-sm font-medium">${message}</p>
        <button onclick="this.closest('.toast').remove()" class="text-white/50 hover:text-white transition-colors">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', toastHTML);

    const newToast = container.lastElementChild;
    setTimeout(() => {
      if (newToast) {
        newToast.style.transition = 'all 0.3s ease';
        newToast.style.opacity = '0';
        newToast.style.transform = 'translateY(20px)';
        setTimeout(() => newToast.remove(), 300);
      }
    }, 4200);
  };

  const addToCart = (id) => {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    setCart(prev => [...prev, { ...product }]);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const removeFromCart = (index) => {
    const removed = cart[index];
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast(`${removed.name} removed`, 'info');
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    showToast(`Order placed! Total: $${total}`, 'success');
    setCart([]);
    setTimeout(() => setActiveSection('products'), 1200);
  };

  const fakeLogin = () => showToast('Login modal (demo)', 'info');
  const fakeGetStarted = () => showToast('Redirecting... (demo)', 'success');
  const fakeContactSales = () => showToast('Contacting sales... (demo)', 'success');
  const watchDemo = () => showToast('Playing demo... (demo)', 'info');

  const showSection = (section) => {
    setActiveSection(section);
  };

  const cartCount = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-12 py-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-indigo-600">DigiTools</span>
          </div>

          <div className="hidden lg:flex items-center gap-x-8 font-semibold text-sm text-slate-600">
            <a href="#" onClick={() => showSection('products')} className="hover:text-indigo-600 transition-colors">Products</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-3">
            <div onClick={() => showSection('cart')} className="cursor-pointer relative p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
              <i className="fa-solid fa-bag-shopping text-xl text-slate-700"></i>
              <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </div>
            <button onClick={fakeLogin} className="hidden sm:inline-flex btn btn-ghost text-sm font-bold px-5">Login</button>
            <button onClick={fakeGetStarted} className="btn bg-slate-900 hover:bg-black text-white border-none font-bold px-6 rounded-xl shadow-lg shadow-slate-200">Get Started</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden btn btn-ghost p-2">
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl z-50 px-6 py-8 border-t border-slate-50 animate-in slide-in-from-top">
            <div className="flex flex-col gap-6 text-base font-bold">
              <a href="#" onClick={() => { showSection('products'); setMobileMenuOpen(false); }} className="text-slate-900">Products</a>
              <a href="#" className="text-slate-500">Features</a>
              <a href="#" className="text-slate-500">Pricing</a>
              <a href="#" className="text-slate-500">Testimonials</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden bg-white px-6 pt-12 pb-24 lg:py-32">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full mb-8 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              AI-Powered Tools Now Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Supercharge Your <span className="text-indigo-600">Digital Workflow</span>
            </h1>
            <p className="mt-8 text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Access premium AI tools, design assets, and productivity software in one place. Start creating faster today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center lg:justify-start">
              <button onClick={() => showSection('products')} className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100">
                Explore Products
              </button>
              <button onClick={watchDemo} className="btn btn-outline border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-14 px-10 rounded-2xl text-lg font-bold">
                <i className="fa-solid fa-play mr-2 text-indigo-500"></i> Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-slate-100 rounded-[3rem] -z-10 blur-2xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
              alt="Digital interface"
              className="w-full rounded-[2.5rem] shadow-2xl border-[12px] border-white"
            />
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-slate-900 py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="border-r-0 md:border-r border-slate-800 last:border-none">
            <div className="text-4xl font-black text-indigo-400">50K+</div>
            <div className="text-slate-400 text-xs font-bold tracking-widest mt-2 uppercase">Active Users</div>
          </div>
          <div className="border-r-0 md:border-r border-slate-800 last:border-none">
            <div className="text-4xl font-black text-indigo-400">200+</div>
            <div className="text-slate-400 text-xs font-bold tracking-widest mt-2 uppercase">Premium Tools</div>
          </div>
          <div>
            <div className="text-4xl font-black text-indigo-400 flex items-center justify-center gap-2">4.9 <i className="fa-solid fa-star text-yellow-400 text-2xl"></i></div>
            <div className="text-slate-400 text-xs font-bold tracking-widest mt-2 uppercase">Rating</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Premium Digital Tools</h2>
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl mt-10">
            <button 
              onClick={() => showSection('products')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeSection === 'products' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Products
            </button>
            <button 
              onClick={() => showSection('cart')}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeSection === 'cart' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Cart <span className={`px-2 py-0.5 rounded-lg text-xs ${cartCount > 0 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{cartCount}</span>
            </button>
          </div>
        </div>

        {activeSection === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map(product => (
              <div key={product.id} className="group bg-white border border-slate-100 rounded-[2rem] p-8 transition-all hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${product.tagType === 'warning' ? 'bg-amber-50 text-amber-500' : product.tagType === 'secondary' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    <i className={product.icon}></i>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${product.tagType === 'warning' ? 'border-amber-200 text-amber-600' : product.tagType === 'secondary' ? 'border-indigo-200 text-indigo-600' : 'border-emerald-200 text-emerald-600'}`}>{product.tag}</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{product.name}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-2">{product.description}</p>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">${product.price}</span>
                  <span className="text-slate-400 text-sm font-bold">/{product.period}</span>
                </div>
                <ul className="mb-10 space-y-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                      <i className="fa-solid fa-circle-check text-indigo-500"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => addToCart(product.id)}
                  className="w-full h-14 rounded-2xl bg-slate-50 group-hover:bg-indigo-600 text-slate-900 group-hover:text-white font-bold transition-all border border-slate-100 group-hover:border-indigo-600 shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Section */}
        {activeSection === 'cart' && (
          <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-50">
            <h2 className="text-3xl font-black mb-10 text-slate-900">Your Cart</h2>
            <div className="space-y-4 min-h-[300px]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-300">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <i className="fa-solid fa-shopping-bag text-4xl"></i>
                  </div>
                  <p className="text-xl font-bold text-slate-400">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="w-14 h-14 bg-white flex items-center justify-center rounded-xl shadow-sm text-indigo-600 text-xl">
                      <i className={item.icon}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-indigo-600 font-black">${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="p-2 text-rose-400 hover:text-rose-600 transition-colors">
                      <i className="fa-solid fa-trash-can"></i> Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total:</span>
                  <span className="text-4xl font-black text-slate-900">${totalPrice}</span>
                </div>
                <button onClick={proceedToCheckout} className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all">
                  Proceed To Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3 Steps Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Get Started In 3 Steps</h2>
            <p className="text-slate-500 font-medium">Start using premium tools in minutes, not hours.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Create Account', desc: 'Sign up for seconds. No credit card required.', icon: 'fa-user-plus' },
              { num: '02', title: 'Choose Products', desc: 'Browse our catalog and select your tools.', icon: 'fa-layer-group' },
              { num: '03', title: 'Start Creating', desc: 'Download and start using your tools immediately.', icon: 'fa-rocket' }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-lg shadow-slate-200/50 mb-8 transition-transform group-hover:-translate-y-2">
                  <i className={`fa-solid ${step.icon} text-3xl text-indigo-600`}></i>
                  <div className="absolute -top-3 -right-3 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-black">{step.num}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 font-medium mb-20">Choose the plan that fits your needs.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {/* Starter */}
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 text-left">
              <div className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-4">Starter</div>
              <div className="text-5xl font-black text-slate-900 mb-2">$0</div>
              <div className="text-slate-400 text-xs font-bold uppercase mb-8">/Month</div>
              <ul className="space-y-4 mb-10">
                <li className="flex gap-3 text-sm font-semibold text-slate-600"><i className="fa-solid fa-check text-indigo-500"></i> Access to 10 free tools</li>
                <li className="flex gap-3 text-sm font-semibold text-slate-600"><i className="fa-solid fa-check text-indigo-500"></i> Community support</li>
              </ul>
              <button onClick={fakeGetStarted} className="w-full py-4 rounded-xl border-2 border-slate-100 font-black text-slate-900 hover:bg-slate-50 transition-colors">Get Started Free</button>
            </div>

            {/* Pro */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-12 text-left text-white shadow-2xl shadow-indigo-200 relative scale-110">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>
              <div className="opacity-80 font-black uppercase tracking-widest text-[10px] mb-4">Pro</div>
              <div className="text-6xl font-black mb-2">$29</div>
              <div className="opacity-80 text-xs font-bold uppercase mb-8">/Month</div>
              <ul className="space-y-4 mb-12">
                <li className="flex gap-3 text-sm font-bold"><i className="fa-solid fa-check text-indigo-300"></i> Access to all premium tools</li>
                <li className="flex gap-3 text-sm font-bold"><i className="fa-solid fa-check text-indigo-300"></i> Unlimited projects</li>
                <li className="flex gap-3 text-sm font-bold"><i className="fa-solid fa-check text-indigo-300"></i> Advanced analytics</li>
              </ul>
              <button onClick={fakeGetStarted} className="w-full py-5 rounded-2xl bg-white text-indigo-600 font-black text-lg hover:shadow-lg transition-all">Start Pro Trial</button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 text-left">
              <div className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-4">Enterprise</div>
              <div className="text-5xl font-black text-slate-900 mb-2">$99</div>
              <div className="text-slate-400 text-xs font-bold uppercase mb-8">/Month</div>
              <ul className="space-y-4 mb-10">
                <li className="flex gap-3 text-sm font-semibold text-slate-600"><i className="fa-solid fa-check text-indigo-500"></i> Team collaboration</li>
                <li className="flex gap-3 text-sm font-semibold text-slate-600"><i className="fa-solid fa-check text-indigo-500"></i> Dedicated support</li>
              </ul>
              <button onClick={fakeContactSales} className="w-full py-4 rounded-xl border-2 border-slate-100 font-black text-slate-900 hover:bg-slate-50 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">Ready To Transform Your Workflow?</h2>
          <p className="text-indigo-100 font-medium max-w-md mx-auto mb-12">Join thousands of professionals who are already using DigiTools to work smarter.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => showSection('products')} className="px-10 py-5 bg-white text-indigo-600 font-black rounded-2xl shadow-xl transition-transform hover:scale-105">Explore Products</button>
            <button onClick={fakeGetStarted} className="px-10 py-5 border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-colors">View Pricing</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <span className="text-2xl font-black tracking-tight text-indigo-400">DigiTools</span>
              <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                Premium digital tools for creators, professionals, and businesses. Work smarter with our powerful suite.
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Product</p>
              <div className="flex flex-col gap-4 text-sm font-bold text-slate-300">
                <a href="#" className="hover:text-indigo-400 transition-colors">Features</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Company</p>
              <div className="flex flex-col gap-4 text-sm font-bold text-slate-300">
                <a href="#" className="hover:text-indigo-400 transition-colors">About</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Resources</p>
              <div className="flex flex-col gap-4 text-sm font-bold text-slate-300">
                <a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © 2026 DigiTools • All rights reserved.
          </div>
        </div>
      </footer>

      <div id="toast-container" className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3"></div>
    </div>
  );
}