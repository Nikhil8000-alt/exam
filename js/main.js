import './custom-modal.js'; // Import custom modal first to replace Swal
import './admin-login-modal.js'; // Import admin login modal
import authManager from './auth.js';
import questionsManager from './questions.js';
import examManager from './exam.js';

class MainApp {
    constructor() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        console.log('🚀 Main App initializing...');
        
        // Setup NO BROWSER ALERTS policy FIRST
        this.setupNoBrowserAlerts();
        
        // INSTANT USER CHECK: Check if user is already logged in
        this.checkExistingUser();
        
        // INSTANT WELCOME: Show content immediately on page load
        this.showInstantWelcome();
        
        // Wait a bit for auth manager to initialize
        setTimeout(() => {
            this.setupEventListeners();
            this.setupAuthStateListener();
            this.setupExamStartButtons();
            this.setupWelcomeReset(); // Setup shortcut to reset welcome modal
        }, 200);
        
        // Also check auth state periodically to ensure UI is updated
        setInterval(() => {
            this.updateButtonsVisibility();
        }, 1000);
        
        // Setup Quick Demo Test button
        this.setupQuickDemoButton();
        
        // Check demo test status on auth change
        this.setupDemoTestChecker();
        
        // Setup automatic payment checking system
        await this.setupAutomaticPaymentChecker();
        
        // Setup subscription checker and reminder system
        this.setupSubscriptionChecker();
        
        // Setup security monitoring
        this.setupSecurityMonitoring();
        
        // Setup page refresh handler for Ctrl+F5
        this.setupPageRefreshHandler();
        
        // Setup production security measures
        this.setupProductionSecurity();
        
        // EMERGENCY: Force buttons to be visible
        this.forceButtonsVisible();
        
        await this.loadQuestions();
        
        // Add sample questions if none exist
        setTimeout(() => {
            this.ensureSampleQuestions();
        }, 1000);
        
        // Add global test functions for development
        window.testPaymentActivation = async (email) => {
            if (!email) {
                const currentUser = authManager.getCurrentUser();
                email = currentUser ? currentUser.email : prompt('Enter email:');
            }
            if (email) {
                console.log('🧪 TEST: Activating payment for:', email);
                await this.handlePaymentSuccess(email);
            }
        };
        
        window.forcePaymentCheck = async () => {
            console.log('🧪 TEST: Forcing payment check');
            await this.performAutomaticPaymentCheck();
        };
    }

    // Check if user is already logged in on page load
    checkExistingUser() {
        console.log('🔍 INSTANT: Checking for existing user on page load...');
        
        // Check for persisted user data
        const persistedUser = localStorage.getItem('persistedUser');
        const sessionToken = localStorage.getItem('sessionToken');
        
        if (persistedUser && sessionToken) {
            try {
                const userData = JSON.parse(persistedUser);
                console.log('👤 INSTANT: Found existing user:', userData.email);
                
                // Force immediate UI update for existing user
                setTimeout(() => {
                    console.log('🔄 INSTANT: Updating UI for existing user');
                    this.liveUpdateUI();
                }, 0);
                
                setTimeout(() => {
                    console.log('🔄 INSTANT: Second UI update for existing user');
                    this.liveUpdateUI();
                }, 50);
                
                setTimeout(() => {
                    console.log('🔄 INSTANT: Third UI update for existing user');
                    this.liveUpdateUI();
                }, 100);
                
            } catch (error) {
                console.error('❌ Failed to parse existing user data:', error);
            }
        } else {
            console.log('❌ No existing user found on page load');
        }
    }

    // Show instant welcome content when website loads
    showInstantWelcome() {
        console.log('🎉 Showing instant welcome content...');
        
        // Check if user has disabled welcome modal OR if it's already been shown
        const disableWelcome = localStorage.getItem('disableWelcomeModal');
        const welcomeShown = localStorage.getItem('welcomeModalShown');
        
        // DISABLE welcome modal completely - only show live features
        console.log('👀 Welcome modal disabled - showing live features only');
        this.showLiveFeatures(); // Show live features without modal
        return;
        
        // OLD CODE - DISABLED
        // Mark welcome modal as shown for this browser session
        // localStorage.setItem('welcomeModalShown', 'true');
        // console.log('📝 Welcome modal marked as shown for this session');
        
        // WELCOME MODAL DISABLED - NO POPUP
        /* 
        // Show welcome modal immediately
        setTimeout(() => {
            // COMMENTED OUT - Welcome modal disabled for better UX
        }, 500);
        */
        
        // Also show live features immediately
        this.showLiveFeatures();
    }

    // EMERGENCY: Force buttons to be visible
    forceButtonsVisible() {
        console.log('🚨 EMERGENCY: Force making buttons visible...');
        
        setTimeout(() => {
            const quickBtn = document.getElementById('quickDemoBtn');
            const loginBtn = document.getElementById('loginPromptBtn');
            const heroButtons = document.querySelector('.hero-buttons');
            
            if (heroButtons) {
                heroButtons.style.display = 'flex';
                heroButtons.style.visibility = 'visible';
                heroButtons.style.opacity = '1';
                console.log('✅ Hero buttons container made visible');
            }
            
            if (quickBtn) {
                quickBtn.style.display = 'block';
                quickBtn.style.visibility = 'visible';
                quickBtn.style.opacity = '1';
                console.log('✅ Quick Demo button made visible');
            } else {
                console.error('❌ Quick Demo button not found!');
            }
            
            if (loginBtn) {
                loginBtn.style.display = 'block';
                loginBtn.style.visibility = 'visible';
                loginBtn.style.opacity = '1';
                console.log('✅ Login button made visible');
            } else {
                console.error('❌ Login button not found!');
            }
        }, 100);
        
        // Check again after 1 second and force visible again
        setTimeout(() => {
            const quickBtn = document.getElementById('quickDemoBtn');
            const loginBtn = document.getElementById('loginPromptBtn');
            
            console.log('🔍 Button visibility check:');
            console.log('Quick Demo Button:', quickBtn ? 'Found' : 'NOT FOUND');
            console.log('Login Button:', loginBtn ? 'Found' : 'NOT FOUND');
            
            if (quickBtn) {
                quickBtn.style.display = 'block';
                quickBtn.style.visibility = 'visible';
                quickBtn.style.opacity = '1';
                console.log('Quick Demo computed style:', window.getComputedStyle(quickBtn).display);
            }
            if (loginBtn) {
                loginBtn.style.display = 'block';
                loginBtn.style.visibility = 'visible';
                loginBtn.style.opacity = '1';
                console.log('Login computed style:', window.getComputedStyle(loginBtn).display);
            }
        }, 1000);
        
        // Keep checking every 2 seconds to ensure buttons stay visible
        const keepVisible = setInterval(() => {
            const quickBtn = document.getElementById('quickDemoBtn');
            const loginBtn = document.getElementById('loginPromptBtn');
            
            if (quickBtn && !authManager.getCurrentUser()) {
                quickBtn.style.display = 'block';
                quickBtn.style.visibility = 'visible';
                quickBtn.style.opacity = '1';
            }
            if (loginBtn && !authManager.getCurrentUser()) {
                loginBtn.style.display = 'block';
                loginBtn.style.visibility = 'visible';
                loginBtn.style.opacity = '1';
            }
        }, 2000);
    }

    // Setup Quick Demo Test button with email restriction
    setupQuickDemoButton() {
        const quickDemoBtn = document.getElementById('quickDemoBtn');
        if (quickDemoBtn) {
            quickDemoBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                console.log('🚀 Quick Demo Test clicked');
                
                // Check if user is logged in
                const currentUser = authManager.getCurrentUser();
                
                if (!currentUser) {
                    // User not logged in - show login prompt first
                    Swal.fire({
                        title: '🔐 Login Required',
                        html: `
                            <div style="text-align: center; padding: 20px;">
                                <div style="font-size: 3rem; margin-bottom: 20px;">👤</div>
                                <h3 style="color: #667eea; margin-bottom: 15px;">Please Login First</h3>
                                <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">
                                    Quick Demo Test requires login to prevent multiple attempts.<br>
                                    One Gmail = One Demo Test Only
                                </p>
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                                    <div style="color: #dc3545; font-weight: bold; margin-bottom: 10px;">🚨 Policy:</div>
                                    <div style="text-align: left; font-size: 0.9rem;">
                                        • Each email address can take demo test only once<br>
                                        • Login required to track attempts<br>
                                        • For unlimited tests, use full course access
                                    </div>
                                </div>
                            </div>
                        `,
                        icon: 'info',
                        confirmButtonText: '<i class="fas fa-sign-in-alt"></i> Login Now',
                        confirmButtonColor: '#667eea',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Trigger login
                            document.getElementById('studentLoginBtn').click();
                        }
                    });
                    return;
                }
                
                // User is logged in - check if they've already taken demo test
                const userEmail = currentUser.email;
                const demoTestTaken = localStorage.getItem(`demoTest_${userEmail}`);
                
                if (demoTestTaken) {
                    // User has already taken demo test - redirect to online tests
                    console.log('⚠️ User has already taken demo test, redirecting to online tests');
                    
                    Swal.fire({
                        title: '⚠️ Demo Test Already Taken',
                        html: `
                            <div style="text-align: center; padding: 20px;">
                                <div style="font-size: 3rem; margin-bottom: 20px;">🚫</div>
                                <h3 style="color: #dc3545; margin-bottom: 15px;">You've Already Completed Demo Test</h3>
                                <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">
                                    Email: <strong>${userEmail}</strong><br>
                                    Policy: One demo test per Gmail account
                                </p>
                                <div style="background: #e7f3ff; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
                                    <div style="color: #17a2b8; font-weight: bold; margin-bottom: 10px;">💡 What's Next?</div>
                                    <div style="text-align: left; font-size: 0.9rem;">
                                        • Access full course tests below<br>
                                        • Get detailed analysis and reports<br>
                                        • Practice with 500+ questions<br>
                                        • Take unlimited mock tests
                                    </div>
                                </div>
                            </div>
                        `,
                        icon: 'warning',
                        confirmButtonText: '<i class="fas fa-arrow-down"></i> View Full Tests',
                        confirmButtonColor: '#17a2b8',
                        allowOutsideClick: false
                    }).then(() => {
                        // Scroll to online tests section
                        const onlineTestsSection = document.getElementById('onlineTests');
                        if (onlineTestsSection) {
                            onlineTestsSection.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            // Highlight the section briefly
                            setTimeout(() => {
                                onlineTestsSection.style.background = 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)';
                                onlineTestsSection.style.transition = 'all 0.5s ease';
                                
                                setTimeout(() => {
                                    onlineTestsSection.style.background = '';
                                }, 3000);
                            }, 500);
                        }
                    });
                    return;
                }
                
                // User hasn't taken demo test yet - show confirmation
                Swal.fire({
                    title: '🎯 Quick Demo Test',
                    html: `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 3rem; margin-bottom: 20px;">⚡</div>
                            <h3 style="color: #667eea; margin-bottom: 15px;">Ready for Your Demo Test?</h3>
                            <p style="color: #666; margin-bottom: 15px; line-height: 1.6;">
                                Email: <strong>${userEmail}</strong><br>
                                5 Questions • 5 Minutes • One-time Only
                            </p>
                            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                                <div style="color: #856404; font-weight: bold; margin-bottom: 10px;">⚠️ Important:</div>
                                <div style="text-align: left; font-size: 0.9rem;">
                                    • This is your <strong>only chance</strong> with this email<br>
                                    • After completion, you'll need full course access<br>
                                    • Make sure you're ready before starting
                                </div>
                            </div>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                                <div style="color: #28a745; font-weight: bold; margin-bottom: 10px;">✅ Features:</div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left;">
                                    <div>✨ Beautiful Interface</div>
                                    <div>⏱️ Real-time Timer</div>
                                    <div>📊 Instant Results</div>
                                    <div>🎉 Confetti Effects</div>
                                </div>
                            </div>
                        </div>
                    `,
                    icon: 'question',
                    confirmButtonText: '<i class="fas fa-play"></i> Yes, Start My Demo Test',
                    confirmButtonColor: '#667eea',
                    showCancelButton: true,
                    cancelButtonText: 'Not Ready Yet',
                    allowOutsideClick: false,
                    customClass: {
                        container: 'quick-demo-modal',
                        popup: 'quick-demo-popup'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log('🎯 Starting Quick Demo Test for:', userEmail);
                        
                        // Mark demo test as taken for this email
                        localStorage.setItem(`demoTest_${userEmail}`, 'true');
                        localStorage.setItem(`demoTestDate_${userEmail}`, new Date().toISOString());
                        
                        // Store in Firebase as well
                        this.storeDemoTestInFirebase(userEmail);
                        
                        // Navigate to demo test
                        window.location.href = 'simple-demo.html';
                    }
                });
            });
        }
    }

    // Store demo test record in Firebase
    async storeDemoTestInFirebase(userEmail) {
        try {
            if (window.database) {
                const demoTestRef = window.database.ref(`demoTests/${userEmail.replace(/[.#$[\]]/g, '_')}`);
                await demoTestRef.set({
                    email: userEmail,
                    taken: true,
                    date: new Date().toISOString(),
                    timestamp: Date.now()
                });
                console.log('✅ Demo test record saved to Firebase');
            }
        } catch (error) {
            console.error('❌ Failed to save demo test record to Firebase:', error);
        }
    }

    // Setup demo test checker - check Firebase for demo test status
    setupDemoTestChecker() {
        // Check on initial load and when auth state changes
        setTimeout(async () => {
            await this.checkDemoTestStatus();
        }, 1000);
        
        // Listen for auth state changes
        if (window.auth) {
            window.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    await this.checkDemoTestStatus();
                }
            });
        }
    }

    // Check if user has taken demo test (from Firebase)
    async checkDemoTestStatus() {
        const currentUser = authManager.getCurrentUser();
        if (!currentUser) return;
        
        const userEmail = currentUser.email;
        console.log('🔍 Checking demo test status for:', userEmail);
        
        try {
            if (window.database) {
                const demoTestRef = window.database.ref(`demoTests/${userEmail.replace(/[.#$[\]]/g, '_')}`);
                const snapshot = await demoTestRef.once('value');
                const demoTestData = snapshot.val();
                
                if (demoTestData && demoTestData.taken) {
                    // Update localStorage to match Firebase
                    localStorage.setItem(`demoTest_${userEmail}`, 'true');
                    localStorage.setItem(`demoTestDate_${userEmail}`, demoTestData.date);
                    console.log('✅ Demo test already taken - synced from Firebase');
                } else {
                    console.log('✅ Demo test not taken yet');
                }
            }
        } catch (error) {
            console.error('❌ Failed to check demo test status from Firebase:', error);
        }
    }

    // Show login required modal for exam access
    async showLoginRequiredModal() {
        await Swal.fire({
            title: '🔐 Login Required',
            html: `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">👤</div>
                    <h3 style="color: #667eea; margin-bottom: 15px;">Please Login to Access Exams</h3>
                    <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">
                        You need to login first to access premium exam features.<br>
                        Your progress and results will be saved to your account.
                    </p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <div style="color: #28a745; font-weight: bold; margin-bottom: 10px;">✅ Benefits after Login:</div>
                        <div style="text-align: left; font-size: 0.9rem;">
                            • Access to all exam courses<br>
                            • Detailed result analysis<br>
                            • Progress tracking<br>
                            • Certificate generation
                        </div>
                    </div>
                </div>
            `,
            icon: 'info',
            confirmButtonText: '<i class="fas fa-sign-in-alt"></i> Login Now',
            confirmButtonColor: '#667eea',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                // Trigger login
                document.getElementById('studentLoginBtn').click();
            }
        });
    }

    // Check payment status for user
    async checkPaymentStatus(userEmail) {
        console.log('💳 Checking payment status for:', userEmail);
        
        try {
            // First check localStorage for faster response
            const localPayment = localStorage.getItem(`payment_${userEmail}`);
            if (localPayment) {
                console.log('✅ Found local payment data for:', userEmail);
                const paymentData = JSON.parse(localPayment);
                const expiryDate = new Date(paymentData.expiryDate);
                const currentDate = new Date();
                const graceDate = new Date(expiryDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days grace
                
                if (currentDate <= graceDate) {
                    const daysRemaining = Math.ceil((expiryDate - currentDate) / (24 * 60 * 60 * 1000));
                    console.log('✅ Local payment is ACTIVE, days remaining:', daysRemaining);
                    
                    // Show active status message
                    const isInGracePeriod = currentDate > expiryDate;
                    const graceDaysRemaining = isInGracePeriod ? Math.ceil((graceDate - currentDate) / (24 * 60 * 60 * 1000)) : 0;
                    
                    if (isInGracePeriod) {
                        console.log('⚠️ User is in grace period, days remaining:', graceDaysRemaining);
                    }
                    
                    return { 
                        hasAccess: true, 
                        status: 'active',
                        expiryDate: paymentData.expiryDate,
                        daysRemaining: daysRemaining,
                        isInGracePeriod: isInGracePeriod,
                        graceDaysRemaining: graceDaysRemaining,
                        paymentDate: paymentData.paymentDate || paymentData.createdAt,
                        transactionId: paymentData.transactionId
                    };
                } else {
                    console.log('❌ Local payment expired (including grace period)');
                    // Remove expired payment data
                    localStorage.removeItem(`payment_${userEmail}`);
                }
            }

            // Check Firebase as backup
            if (window.database) {
                const paymentRef = window.database.ref(`payments/${userEmail.replace(/[.#$[\]]/g, '_')}`);
                const snapshot = await paymentRef.once('value');
                const paymentData = snapshot.val();
                
                if (paymentData && paymentData.status === 'active') {
                    const expiryDate = new Date(paymentData.expiryDate);
                    const currentDate = new Date();
                    const graceDate = new Date(expiryDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days grace
                    
                    if (currentDate <= graceDate) {
                        // Sync to localStorage for faster future access
                        localStorage.setItem(`payment_${userEmail}`, JSON.stringify(paymentData));
                        
                        const daysRemaining = Math.ceil((expiryDate - currentDate) / (24 * 60 * 60 * 1000));
                        console.log('✅ Firebase payment is ACTIVE, synced to local, days remaining:', daysRemaining);
                        
                        return {
                            hasAccess: true,
                            status: 'active',
                            expiryDate: paymentData.expiryDate,
                            daysRemaining: daysRemaining,
                            isInGracePeriod: currentDate > expiryDate,
                            graceDaysRemaining: currentDate > expiryDate ? Math.ceil((graceDate - currentDate) / (24 * 60 * 60 * 1000)) : 0,
                            paymentDate: paymentData.paymentDate || paymentData.createdAt,
                            transactionId: paymentData.transactionId
                        };
                    }
                }
            }
                
            // No active payment found
            console.log('❌ No active payment found for:', userEmail);
            return {
                hasAccess: false,
                status: 'expired',
                needsPayment: true
            };
                
        } catch (error) {
            console.error('❌ Failed to check payment status:', error);
            return { hasAccess: false, status: 'error', needsPayment: true };
        }
    }

    // Show payment modal with UPI QR
    async showPaymentModal(userEmail, paymentStatus) {
        console.log('💳 Showing payment modal for:', userEmail);
        
        const paymentAmount = 49;
        const upiId = 'bagoriyanikhil@ybl';
        const upiUrl = `upi://pay?pa=${upiId}&pn=DCT24%20Online%20Learning&am=${paymentAmount}&cu=INR&tn=DCT24%20Course%20Access%20-%2090%20Days`;
        
        // Generate QR code URL (using QR Server API)
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
        
        // Remove status message to save space - keep modal compact
        let statusMessage = '';

        const result = await Swal.fire({
            title: '💳 Payment',
            html: `
                <div style="text-align: center; padding: 5px; max-height: 70vh; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
                        <h3 style="margin: 0 0 5px 0; font-size: 1rem;">DCT24 Premium</h3>
                        <div style="font-size: 1.5rem; font-weight: bold;">₹${paymentAmount}</div>
                        <div style="font-size: 0.75rem; opacity: 0.9;">90 Days Access</div>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
                        <h4 style="color: #28a745; margin: 0 0 8px 0; font-size: 0.95rem;">📱 Scan QR</h4>
                        <img src="${qrCodeUrl}" alt="UPI QR Code" style="width: 150px; height: 150px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 8px;">
                        <div style="font-size: 0.75rem; color: #666; margin-bottom: 5px;">
                            <strong>UPI:</strong> ${upiId}
                        </div>
                        <div id="qrTimer" style="background: #d4edda; padding: 6px; border-radius: 4px; border-left: 2px solid #28a745; transition: all 0.3s ease;">
                            <div style="color: #155724; font-weight: bold; font-size: 0.8rem; transition: all 0.3s ease;">⏰ <span id="countdown">45</span>s left</div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
                        <div style="background: #e7f3ff; padding: 8px; border-radius: 6px; border-left: 2px solid #17a2b8;">
                            <div style="color: #0c5273; font-weight: bold; font-size: 0.8rem; margin-bottom: 4px;">✅ Features</div>
                            <div style="text-align: left; font-size: 0.65rem; color: #0c5273; line-height: 1.2;">
                                • All courses<br>
                                • 500+ questions<br>
                                • Mock tests
                            </div>
                        </div>
                        <div style="background: #fff3cd; padding: 8px; border-radius: 6px; border-left: 2px solid #ffc107;">
                            <div style="color: #856404; font-weight: bold; font-size: 0.8rem; margin-bottom: 4px;">⚠️ Next Step</div>
                            <div style="color: #856404; font-size: 0.65rem; line-height: 1.2;">
                                Enter transaction ID after payment
                            </div>
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#6c757d',
            allowOutsideClick: false,
            width: '380px',
            heightAuto: false,
            customClass: {
                popup: 'payment-modal-popup',
                content: 'payment-modal-content'
            },
            timer: 45000, // 45 seconds timer
            timerProgressBar: true,
            didOpen: () => {
                // Add custom CSS to prevent scrollbar and make compact
                const style = document.createElement('style');
                style.textContent = `
                    .payment-modal-popup {
                        max-height: 85vh !important;
                        overflow: hidden !important;
                        padding: 10px !important;
                    }
                    .payment-modal-content {
                        max-height: none !important;
                        overflow: hidden !important;
                        padding: 0 !important;
                    }
                    .swal2-html-container {
                        max-height: none !important;
                        overflow: hidden !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .swal2-title {
                        font-size: 1.2rem !important;
                        margin: 0 0 10px 0 !important;
                        padding: 0 !important;
                    }
                    .swal2-actions {
                        margin: 10px 0 0 0 !important;
                    }
                    .swal2-confirm, .swal2-cancel {
                        font-size: 0.85rem !important;
                        padding: 8px 16px !important;
                    }
                `;
                document.head.appendChild(style);
                
                // Start countdown timer (45 seconds decreasing to 0)
                let timeLeft = 45;
                const countdownElement = document.getElementById('countdown');
                
                // Update timer immediately with initial value
                if (countdownElement) {
                    countdownElement.textContent = timeLeft;
                    console.log('⏰ Timer initialized at:', timeLeft, 'seconds');
                }
                
                const timer = setInterval(() => {
                    // Decrement time (45 → 44 → 43 → ... → 1 → 0)
                    timeLeft--;
                    console.log('⏰ Timer countdown:', timeLeft, 'seconds left');
                    
                    if (countdownElement) {
                        // Update display with current time
                        countdownElement.textContent = timeLeft;
                        
                        // Get timer container for styling
                        const timerContainer = countdownElement.parentElement.parentElement;
                        
                        if (timeLeft <= 0) {
                            // Timer expired - show 0
                            countdownElement.textContent = '0';
                            countdownElement.style.color = '#dc3545';
                            countdownElement.style.fontWeight = 'bold';
                            timerContainer.style.background = '#f8d7da';
                            timerContainer.style.borderLeft = '2px solid #dc3545';
                            countdownElement.style.animation = 'pulse 0.5s infinite';
                            console.log('🚨 Timer EXPIRED! QR Code invalid now.');
                            clearInterval(timer);
                            
                                                        // Show expiry options after timer ends
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'warning',
                                    title: '⏰ QR Code Expired',
                                    html: `
                                        <div style="text-align: center; padding: 20px;">
                                            <div style="font-size: 3rem; margin-bottom: 20px;">⏰</div>
                                            <h3 style="color: #dc3545; margin-bottom: 15px;">QR Code has expired!</h3>
                                            <p style="color: #666; margin-bottom: 20px;">
                                                The 45-second timer has ended. Click below to generate a new QR code.
                                            </p>
                                            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                                                <div style="color: #856404; font-weight: bold; margin-bottom: 5px;">💡 Security Feature</div>
                                                <div style="color: #856404; font-size: 0.9rem;">
                                                    QR codes expire after 45 seconds for your security and to prevent fraud.
                                                </div>
                                            </div>
                                        </div>
                                    `,
                                    confirmButtonText: '🔄 Show New QR Code',
                                    confirmButtonColor: '#007bff',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // Show new QR code
                                        console.log('🔄 User requested new QR code');
                                        Swal.close();
                                        setTimeout(() => {
                                            this.showPaymentModal(userEmail, paymentStatus);
                                        }, 500);
                                    }
                                });
                            }, 1000);
                            
                        } else if (timeLeft <= 10) {
                            // Critical zone (10, 9, 8, 7, 6, 5, 4, 3, 2, 1) - RED
                            countdownElement.style.color = '#dc3545';
                            countdownElement.style.fontWeight = 'bold';
                            timerContainer.style.background = '#f8d7da';
                            timerContainer.style.borderLeft = '2px solid #dc3545';
                            countdownElement.style.animation = 'pulse 1s infinite';
                            console.log('🔴 CRITICAL:', timeLeft, 'seconds left!');
                        } else if (timeLeft <= 20) {
                            // Warning zone (20, 19, 18, ..., 11) - YELLOW
                            countdownElement.style.color = '#ffc107';
                            countdownElement.style.fontWeight = 'bold';
                            timerContainer.style.background = '#fff3cd';
                            timerContainer.style.borderLeft = '2px solid #ffc107';
                            countdownElement.style.animation = 'none';
                            if (timeLeft === 20 || timeLeft === 15) {
                                console.log('🟡 WARNING:', timeLeft, 'seconds left');
                            }
                        } else {
                            // Safe zone (45, 44, 43, ..., 21) - GREEN
                            countdownElement.style.color = '#28a745';
                            countdownElement.style.fontWeight = 'bold';
                            timerContainer.style.background = '#d4edda';
                            timerContainer.style.borderLeft = '2px solid #28a745';
                            countdownElement.style.animation = 'none';
                            if (timeLeft === 45 || timeLeft === 30 || timeLeft === 25) {
                                console.log('🟢 SAFE:', timeLeft, 'seconds left');
                            }
                        }
                    }
                }, 1000);
                
                // Add CSS for pulse animation
                const pulseStyle = document.createElement('style');
                pulseStyle.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(pulseStyle);
                
                // Store timer reference to clear it if modal is closed early
                Swal.getPopup().timerInterval = timer;
                Swal.getPopup().pulseStyle = pulseStyle;
            },
            willClose: () => {
                // Clear timer when modal closes
                if (Swal.getPopup().timerInterval) {
                    clearInterval(Swal.getPopup().timerInterval);
                }
                
                // Remove custom styles
                const customStyles = document.querySelectorAll('style');
                customStyles.forEach(style => {
                    if (style.textContent.includes('payment-modal-popup') || 
                        style.textContent.includes('pulse')) {
                        style.remove();
                    }
                });
                
                // Remove pulse style specifically
                if (Swal.getPopup().pulseStyle) {
                    Swal.getPopup().pulseStyle.remove();
                }
            }
        });

                         if (result.isConfirmed) {
            // User clicked OK after payment - verify and activate immediately
            console.log('✅ User confirmed payment completion');
            await this.handlePaymentSuccess(userEmail);
        } else if (result.dismiss === Swal.DismissReason.timer) {
            // Timer expired - show expired message and option to retry
            const retryResult = await Swal.fire({
                icon: 'warning',
                title: '⏰ QR Code Expired',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">⏰</div>
                        <h3 style="color: #ffc107; margin-bottom: 15px;">Payment Window Expired</h3>
                        <p style="color: #666; margin-bottom: 20px;">
                            The QR code has expired for security reasons.
                        </p>
                        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                            <div style="color: #856404; font-weight: bold; margin-bottom: 5px;">💡 What to do next:</div>
                            <div style="color: #856404; font-size: 0.9rem;">
                                • If you already paid, click "I Already Paid"<br>
                                • If you want to pay now, click "Show New QR Code"<br>
                                • You can also try again later
                            </div>
                        </div>
                    </div>
                `,
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: '<i class="fas fa-qrcode"></i> Show New QR Code',
                denyButtonText: '<i class="fas fa-check"></i> I Already Paid',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#28a745',
                denyButtonColor: '#17a2b8',
                cancelButtonColor: '#6c757d'
            });

            if (retryResult.isConfirmed) {
                // Show new QR code
                await this.showPaymentModal(userEmail, paymentStatus);
            } else if (retryResult.isDenied) {
                // User claims to have already paid
                await this.showTransactionIdModal(userEmail);
            }
        }
     }

    // Handle payment success - immediate activation
    async handlePaymentSuccess(userEmail) {
        console.log('🎯 Handling payment success for:', userEmail);
        
        // Show loading while processing
        Swal.fire({
            title: 'Processing Payment...',
            html: `
                <div style="text-align: center; padding: 30px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">💳</div>
                    <p>Verifying your payment and activating access...</p>
                    <div style="margin: 20px 0;">
                        <div style="background: #f0f0f0; height: 4px; border-radius: 2px; overflow: hidden;">
                            <div style="background: #28a745; height: 100%; width: 0%; animation: progress 3s ease-in-out forwards;"></div>
                        </div>
                    </div>
                    <p style="font-size: 0.8rem; color: #666;">Please wait...</p>
                </div>
                <style>
                    @keyframes progress {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                </style>
            `,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Wait for 3 seconds to simulate processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        try {
            // Generate a dummy transaction ID for immediate activation
            const dummyTransactionId = 'AUTO_' + Date.now().toString().slice(-8);
            console.log('🔄 Auto-generating transaction ID:', dummyTransactionId);
            
            // Activate subscription immediately
            await this.activateSubscription(userEmail, dummyTransactionId);
            
            // Show success message
            await Swal.fire({
                icon: 'success',
                title: '🎉 Payment Successful!',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">🎯</div>
                        <h3 style="color: #28a745; margin-bottom: 15px;">Access Activated!</h3>
                        <p style="color: #666; margin-bottom: 20px;">
                            Your payment has been processed successfully. All exams are now available.
                        </p>
                        <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #28a745;">
                            <div style="color: #155724; font-weight: bold; margin-bottom: 5px;">✅ What's Unlocked:</div>
                            <div style="color: #155724; font-size: 0.9rem;">
                                • All RS-CIT & CCC Tests<br>
                                • Subject-wise Practice<br>
                                • Mock Tests & Results<br>
                                • 90 Days Full Access
                            </div>
                        </div>
                    </div>
                `,
                confirmButtonText: '🚀 Start Exams Now',
                confirmButtonColor: '#28a745'
            });

            // Force immediate UI update
            console.log('🔄 Forcing immediate UI update after payment');
            await this.performAutomaticPaymentCheck();
            
            // Multiple UI updates to ensure everything is refreshed
            setTimeout(() => {
                console.log('🔄 UI Update #1 after payment');
                this.liveUpdateUI();
                this.updateButtonsVisibility();
            }, 100);
            
            setTimeout(() => {
                console.log('🔄 UI Update #2 after payment');
                this.liveUpdateUI();
                this.updateButtonsVisibility();
            }, 500);
            
            setTimeout(() => {
                console.log('🔄 UI Update #3 after payment');
                this.liveUpdateUI();
                this.updateButtonsVisibility();
            }, 1000);

        } catch (error) {
            console.error('❌ Error processing payment:', error);
            
            // Show error and fallback to transaction ID input
            await Swal.fire({
                icon: 'error',
                title: '⚠️ Processing Issue',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <p>There was an issue processing your payment automatically.</p>
                        <p>Please enter your transaction ID to complete activation.</p>
                    </div>
                `,
                confirmButtonText: 'Enter Transaction ID',
                confirmButtonColor: '#ffc107'
            });
            
            // Fallback to manual transaction ID entry
            await this.showTransactionIdModal(userEmail);
        }
    }

    // Show transaction ID verification modal
    async showTransactionIdModal(userEmail) {
        const { value: transactionId } = await Swal.fire({
            title: '🆔 Enter Transaction ID',
            html: `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">💳</div>
                    <h3 style="color: #667eea; margin-bottom: 15px;">Payment Verification</h3>
                    <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">
                        Please enter your UPI transaction ID to verify the payment.<br>
                        This ID is usually 12 digits long.
                    </p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <div style="color: #17a2b8; font-weight: bold; margin-bottom: 10px;">📝 Where to find Transaction ID:</div>
                        <div style="text-align: left; font-size: 0.9rem; color: #666;">
                            • Check your UPI app (PhonePe, GPay, Paytm)<br>
                            • Look in transaction history<br>
                            • It's usually labeled as "Txn ID" or "UTR"<br>
                            • Example: 123456789012
                        </div>
                    </div>
                </div>
            `,
            input: 'text',
            inputPlaceholder: 'Enter 12-digit Transaction ID',
            inputAttributes: {
                maxlength: 20,
                style: 'text-align: center; font-size: 1.2rem; letter-spacing: 2px; font-family: monospace;'
            },
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-check"></i> Verify Payment',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#28a745',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter your transaction ID';
                }
                if (value.length < 10) {
                    return 'Transaction ID should be at least 10 characters';
                }
                return null;
            }
        });

        if (transactionId) {
            await this.verifyTransaction(userEmail, transactionId);
        }
    }

    // Verify transaction and activate subscription with security checks
    async verifyTransaction(userEmail, transactionId) {
        console.log('🔍 Verifying transaction for:', userEmail, 'TxnID:', transactionId);
        
        // Security: Check rate limiting
        const rateLimitCheck = this.checkRateLimit(userEmail);
        if (!rateLimitCheck.allowed) {
            await Swal.fire({
                icon: 'error',
                title: '🚫 Too Many Attempts',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <p>Too many verification attempts. Please wait before trying again.</p>
                        <p><strong>Wait time:</strong> ${rateLimitCheck.waitTime} minutes</p>
                        <br>
                        <p style="color: #666; font-size: 0.9rem;">
                            This is a security measure to prevent fraud attempts.
                        </p>
                    </div>
                `,
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        // Log verification attempt
        this.logVerificationAttempt(userEmail, transactionId);
        
        // Show verification loading
        Swal.fire({
            title: 'Verifying Payment...',
            html: `
                <div style="text-align: center; padding: 30px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">⏳</div>
                    <p>Please wait while we verify your payment...</p>
                    <div style="margin: 20px 0;">
                        <div style="background: #f0f0f0; height: 4px; border-radius: 2px; overflow: hidden;">
                            <div style="background: #667eea; height: 100%; width: 0%; animation: progress 5s ease-in-out forwards;"></div>
                        </div>
                    </div>
                    <p style="font-size: 0.8rem; color: #666;">Security verification in progress...</p>
                </div>
                <style>
                    @keyframes progress {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                </style>
            `,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Extended verification process with security checks (5 seconds)
        await new Promise(resolve => setTimeout(resolve, 5000));

        try {
            // Check if transaction ID already exists (basic duplicate check)
            const isDuplicate = await this.checkDuplicateTransaction(transactionId);
            
            if (isDuplicate) {
                await Swal.fire({
                    icon: 'error',
                    title: '❌ Transaction Already Used',
                    html: `
                        <div style="text-align: center; padding: 20px;">
                            <p>This transaction ID has already been used for activation.</p>
                            <p><strong>Transaction ID:</strong> ${transactionId}</p>
                            <br>
                            <p style="color: #666; font-size: 0.9rem;">
                                If you believe this is an error, please contact support with your payment screenshot.
                            </p>
                        </div>
                    `,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }

            // Basic validation (length and format check)
            const isValidFormat = this.validateTransactionId(transactionId);
            
            if (!isValidFormat) {
                await Swal.fire({
                    icon: 'error',
                    title: '❌ Invalid Transaction ID',
                    html: `
                        <div style="text-align: center; padding: 20px;">
                            <p>The transaction ID format appears to be invalid.</p>
                            <p><strong>Entered ID:</strong> ${transactionId}</p>
                            <br>
                            <p style="color: #666; font-size: 0.9rem;">
                                Please check your UPI app and enter the correct transaction ID.
                            </p>
                        </div>
                    `,
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#ffc107'
                }).then(() => {
                    this.showTransactionIdModal(userEmail);
                });
                return;
            }

            // Transaction appears valid - activate subscription
            await this.activateSubscription(userEmail, transactionId);

        } catch (error) {
            console.error('❌ Transaction verification failed:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: 'Something went wrong during verification. Please try again.',
                confirmButtonText: 'Retry',
                confirmButtonColor: '#dc3545'
            });
                 }
     }

    // Check for duplicate transaction ID
    async checkDuplicateTransaction(transactionId) {
        try {
            if (window.database) {
                const transactionsRef = window.database.ref('transactions');
                const snapshot = await transactionsRef.orderByChild('transactionId').equalTo(transactionId).once('value');
                return snapshot.exists();
            }
            return false;
        } catch (error) {
            console.error('❌ Failed to check duplicate transaction:', error);
            return false;
        }
    }

    // Enhanced transaction ID validation with security checks
    validateTransactionId(transactionId) {
        // Advanced validation with security patterns
        
        // Check basic format: alphanumeric, 10-20 characters
        const basicRegex = /^[A-Za-z0-9]{10,20}$/;
        if (!basicRegex.test(transactionId)) return false;
        
        // Prevent common fraud patterns
        const fraudPatterns = [
            /^0+$/, // All zeros
            /^1+$/, // All ones
            /^(123|abc|test|demo|fake)/i, // Common test patterns
            /^(.)\1{9,}$/, // Same character repeated
            /^(012345|abcdef|qwerty)/i // Sequential patterns
        ];
        
        for (const pattern of fraudPatterns) {
            if (pattern.test(transactionId)) {
                console.warn('🚫 Suspicious transaction ID pattern detected:', transactionId);
                return false;
            }
        }
        
        // Check for realistic UPI transaction patterns (usually contain mixed case and numbers)
        const hasNumbers = /\d/.test(transactionId);
        const hasLetters = /[a-zA-Z]/.test(transactionId);
        const hasMixedCase = /[a-z]/.test(transactionId) && /[A-Z]/.test(transactionId);
        
        // Real UPI transactions usually have at least numbers and letters
        if (!hasNumbers || !hasLetters) {
            console.warn('🚫 Transaction ID format seems unrealistic:', transactionId);
            return false;
        }
        
        return true;
    }

    // Activate subscription for user
    async activateSubscription(userEmail, transactionId) {
        console.log('✅ Activating subscription for:', userEmail);
        
        const paymentDate = new Date();
        const expiryDate = new Date(paymentDate.getTime() + (90 * 24 * 60 * 60 * 1000)); // 90 days later
        
        // Create core data for checksum
        const coreData = {
            email: userEmail,
            amount: 49,
            expiryDate: expiryDate.toISOString()
        };
        
        const subscriptionData = {
            email: userEmail,
            transactionId: transactionId,
            paymentDate: paymentDate.toISOString(),
            expiryDate: expiryDate.toISOString(),
            amount: 49,
            status: 'active',
            duration: 90, // days
            gracePeriod: 3, // days
            createdAt: Date.now(),
            checksum: this.createChecksum(coreData), // Security checksum
            fingerprint: this.getBrowserFingerprint(), // Browser fingerprint
            securityVersion: '1.0' // For future security updates
        };

        try {
            // Save to Firebase
            if (window.database) {
                const paymentRef = window.database.ref(`payments/${userEmail.replace(/[.#$[\]]/g, '_')}`);
                const transactionRef = window.database.ref(`transactions/${transactionId}`);
                
                await Promise.all([
                    paymentRef.set(subscriptionData),
                    transactionRef.set({
                        transactionId: transactionId,
                        email: userEmail,
                        usedAt: Date.now(),
                        amount: 49
                    })
                ]);
            }

            // Save to localStorage as backup
            localStorage.setItem(`payment_${userEmail}`, JSON.stringify(subscriptionData));
            
            // Show success message with enhanced UI update
            await Swal.fire({
                icon: 'success',
                title: '🎉 Payment Verified!',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
                        <h3 style="color: #28a745; margin-bottom: 15px;">Subscription Activated Successfully!</h3>
                        <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #c3e6cb;">
                            <div style="color: #155724;">
                                <strong>Account:</strong> ${userEmail}<br>
                                <strong>Valid Until:</strong> ${expiryDate.toLocaleDateString('en-IN')}<br>
                                <strong>Transaction ID:</strong> ${transactionId}<br>
                                <strong>Duration:</strong> 90 Days + 3 Days Grace Period
                            </div>
                        </div>
                        <p style="color: #666; font-size: 0.9rem;">
                            You now have full access to all courses and exams. 
                            You'll receive a reminder 3 days before expiry.
                        </p>
                        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                            <div style="color: #856404; font-weight: bold;">🚀 Ready to Start!</div>
                            <div style="color: #856404; font-size: 0.9rem;">
                                Click any "Start Exam" button to begin your learning journey!
                            </div>
                        </div>
                    </div>
                `,
                confirmButtonText: '<i class="fas fa-rocket"></i> Start Learning Now!',
                confirmButtonColor: '#28a745',
                allowOutsideClick: false
            });

            console.log('✅ Subscription activated successfully');
            
            // CRITICAL: Force immediate UI update after payment success
            console.log('🔄 CRITICAL: Forcing immediate UI update after payment success');
            
            // Update UI multiple times to ensure it reflects payment status
            setTimeout(() => {
                console.log('🔄 UI Update #1 after payment');
                this.liveUpdateUI();
                this.updateButtonsVisibility();
            }, 100);
            
            setTimeout(() => {
                console.log('🔄 UI Update #2 after payment');
                this.liveUpdateUI();
                this.updateButtonsVisibility();
            }, 500);
            
            setTimeout(() => {
                console.log('🔄 UI Update #3 after payment');
                this.liveUpdateUI();
                this.updateButtonsVisibility();
            }, 1000);
            
            // Show additional success notification with exam start option
            setTimeout(async () => {
                const examStartResult = await Swal.fire({
                    icon: 'info',
                    title: '🎯 Ready to Start Exams!',
                    html: `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 3rem; margin-bottom: 20px;">🎓</div>
                            <h3 style="color: #17a2b8; margin-bottom: 15px;">Your Account is Now Active!</h3>
                            <p style="color: #666; margin-bottom: 20px;">
                                All exam buttons are now enabled. You can start any course immediately.
                            </p>
                            <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; border-left: 4px solid #17a2b8; margin-bottom: 20px;">
                                <div style="color: #0c5460; font-weight: bold;">💡 Available Courses:</div>
                                <div style="color: #0c5460; font-size: 0.9rem;">
                                    • RS-CIT Online Test<br>
                                    • CCC Online Test<br>
                                    • Subject-wise Tests<br>
                                    • Mock Tests & Practice
                                </div>
                            </div>
                            <div style="background: #d4edda; padding: 15px; border-radius: 10px; border-left: 4px solid #28a745;">
                                <div style="color: #155724; font-weight: bold;">✅ Payment Status: ACTIVE</div>
                                <div style="color: #155724; font-size: 0.9rem;">
                                    Valid until: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}
                                </div>
                            </div>
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: '<i class="fas fa-play"></i> Start RS-CIT Exam Now',
                    cancelButtonText: 'Browse All Courses',
                    confirmButtonColor: '#28a745',
                    cancelButtonColor: '#17a2b8'
                });

                if (examStartResult.isConfirmed) {
                    // Start RS-CIT exam directly
                    console.log('🚀 Starting RS-CIT exam directly from payment success');
                    
                    await Swal.fire({
                        icon: 'success',
                        title: '🚀 Starting RS-CIT Exam!',
                        text: 'Redirecting to exam interface...',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    
                    // Redirect to RS-CIT exam
                    window.location.href = 'exam.html?type=rscit';
                } else if (examStartResult.dismiss === Swal.DismissReason.cancel) {
                    // Scroll to courses section
                    const coursesSection = document.getElementById('onlineTests');
                    if (coursesSection) {
                        coursesSection.scrollIntoView({ behavior: 'smooth' });
                        
                        // Highlight the courses section briefly
                        coursesSection.style.background = 'linear-gradient(135deg, #667eea22, #764ba222)';
                        coursesSection.style.transition = 'background 0.5s ease';
                        
                        setTimeout(() => {
                            coursesSection.style.background = '';
                        }, 3000);
                    }
                }
            }, 2000);

        } catch (error) {
            console.error('❌ Failed to activate subscription:', error);
            
            await Swal.fire({
                icon: 'error',
                title: 'Activation Failed',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <p>Failed to activate your subscription. Please try again.</p>
                        <p><strong>Transaction ID:</strong> ${transactionId}</p>
                        <br>
                        <p style="color: #666; font-size: 0.9rem;">
                            Your payment is valid. If this error persists, contact support with your transaction ID.
                        </p>
                    </div>
                `,
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
            });
                 }
     }

    // Security: Rate limiting for verification attempts
    checkRateLimit(userEmail) {
        const now = Date.now();
        const key = `rateLimit_${userEmail}`;
        const stored = localStorage.getItem(key);
        
        if (!stored) {
            // First attempt
            localStorage.setItem(key, JSON.stringify({
                attempts: 1,
                firstAttempt: now,
                lastAttempt: now
            }));
            return { allowed: true };
        }
        
        const data = JSON.parse(stored);
        const timeSinceFirst = now - data.firstAttempt;
        const timeSinceLast = now - data.lastAttempt;
        
        // Reset if more than 1 hour passed since first attempt
        if (timeSinceFirst > 60 * 60 * 1000) {
            localStorage.setItem(key, JSON.stringify({
                attempts: 1,
                firstAttempt: now,
                lastAttempt: now
            }));
            return { allowed: true };
        }
        
        // Check limits: Max 5 attempts per hour, min 2 minutes between attempts
        if (data.attempts >= 5) {
            const waitTime = Math.ceil((60 * 60 * 1000 - timeSinceFirst) / (60 * 1000));
            return { allowed: false, waitTime };
        }
        
        if (timeSinceLast < 2 * 60 * 1000) { // 2 minutes between attempts
            const waitTime = Math.ceil((2 * 60 * 1000 - timeSinceLast) / (60 * 1000));
            return { allowed: false, waitTime };
        }
        
        // Update attempt count
        data.attempts++;
        data.lastAttempt = now;
        localStorage.setItem(key, JSON.stringify(data));
        
        return { allowed: true };
    }

    // Security: Log verification attempts for audit
    logVerificationAttempt(userEmail, transactionId) {
        try {
            const attempt = {
                email: userEmail,
                transactionId: transactionId,
                timestamp: Date.now(),
                ip: this.getClientIP(),
                userAgent: navigator.userAgent,
                fingerprint: this.getBrowserFingerprint()
            };
            
            // Store in Firebase for admin monitoring
            if (window.database) {
                const logRef = window.database.ref('verificationLogs').push();
                logRef.set(attempt).catch(console.error);
            }
            
            // Store locally as well
            const localLogs = JSON.parse(localStorage.getItem('verificationLogs') || '[]');
            localLogs.push(attempt);
            if (localLogs.length > 100) localLogs.shift(); // Keep only last 100
            localStorage.setItem('verificationLogs', JSON.stringify(localLogs));
            
            console.log('📝 Verification attempt logged');
        } catch (error) {
            console.error('❌ Failed to log verification attempt:', error);
        }
    }

    // Security: Get client IP (basic method)
    getClientIP() {
        // This is a simple placeholder - in production, use server-side IP detection
        return 'CLIENT_IP_DETECTION_NEEDED';
    }

    // Security: Generate browser fingerprint
    getBrowserFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('DCT24 Security Check', 2, 2);
        
        const fingerprint = {
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            canvasFingerprint: canvas.toDataURL().slice(-50) // Last 50 chars
        };
        
        return btoa(JSON.stringify(fingerprint)).slice(0, 20);
    }

    // Setup automatic payment checking system
    async setupAutomaticPaymentChecker() {
        console.log('🔄 Setting up automatic payment checker...');
        
        // Check payment status immediately on page load
        setTimeout(async () => {
            await this.performAutomaticPaymentCheck();
        }, 1000);
        
        // Check payment status every 30 seconds
        setInterval(async () => {
            await this.performAutomaticPaymentCheck();
        }, 30000);
        
        // Listen for auth state changes
        if (window.auth) {
            window.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setTimeout(async () => {
                        await this.performAutomaticPaymentCheck();
                    }, 2000);
                }
            });
        }
    }

    // Perform automatic payment check
    async performAutomaticPaymentCheck() {
        try {
            // Get current user
            const currentUser = authManager.getCurrentUser();
            if (!currentUser || !currentUser.email) {
                console.log('👤 No user logged in - skipping payment check');
                return;
            }

            const userEmail = currentUser.email;
            console.log('🔍 Automatic payment check for:', userEmail);

            // Check payment status
            const paymentStatus = await this.checkPaymentStatus(userEmail);
            
            if (paymentStatus.hasValidSubscription) {
                console.log('✅ User has valid subscription - enabling exam access');
                this.enableExamAccess(userEmail, paymentStatus);
            } else {
                console.log('❌ User needs to make payment - disabling exam access');
                this.disableExamAccess(userEmail, paymentStatus);
            }

        } catch (error) {
            console.error('❌ Error in automatic payment check:', error);
        }
    }

    // Enable exam access for paid users
    enableExamAccess(userEmail, paymentStatus) {
        console.log('🎯 Enabling exam access for:', userEmail);
        
        // Enable all exam buttons
        const examButtons = document.querySelectorAll('.btn-exam-start');
        examButtons.forEach(button => {
            button.disabled = false;
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
            button.innerHTML = button.innerHTML.replace('🔒', '🎯');
            
            // Remove payment click handler and add exam start handler
            button.onclick = (e) => {
                e.preventDefault();
                const courseType = button.getAttribute('data-course');
                console.log('🎯 Starting exam for paid user:', courseType);
                this.startExamForPaidUser(courseType, userEmail);
            };
        });

        // Update UI to show premium status
        this.updatePremiumUI(userEmail, paymentStatus);
        
        // Show success notification (only once per session)
        const notificationKey = `examAccess_${userEmail}_${new Date().toDateString()}`;
        if (!sessionStorage.getItem(notificationKey)) {
            sessionStorage.setItem(notificationKey, 'true');
            this.showExamAccessNotification(paymentStatus);
        }
    }

    // Disable exam access for unpaid users
    disableExamAccess(userEmail, paymentStatus) {
        console.log('🔒 Disabling exam access for:', userEmail);
        
        // Disable all exam buttons except free test
        const examButtons = document.querySelectorAll('.btn-exam-start');
        examButtons.forEach(button => {
            const courseType = button.getAttribute('data-course');
            
            if (courseType === 'free-test') {
                // Keep free test enabled
                button.disabled = false;
                button.style.opacity = '1';
                return;
            }
            
            button.disabled = false; // Keep clickable but redirect to payment
            button.style.opacity = '0.8';
            button.innerHTML = button.innerHTML.replace('🎯', '🔒');
            
            // Add payment redirect handler
            button.onclick = (e) => {
                e.preventDefault();
                console.log('💳 Redirecting to payment for:', courseType);
                this.redirectToPayment(userEmail, paymentStatus, courseType);
            };
        });

        // Update UI to show payment required status
        this.updatePaymentRequiredUI(userEmail, paymentStatus);
    }

    // Start exam for paid user
    async startExamForPaidUser(courseType, userEmail) {
        console.log('🎯 Starting exam for paid user:', courseType, userEmail);
        
        // Validate access one more time
        const paymentStatus = await this.checkPaymentStatus(userEmail);
        if (!paymentStatus.hasValidSubscription) {
            console.log('❌ Payment validation failed - redirecting to payment');
            this.redirectToPayment(userEmail, paymentStatus, courseType);
            return;
        }

        // Log secure access
        this.logSecureAccess(userEmail, courseType);
        
        // Start the exam
        if (window.examManager) {
            window.examManager.startExam(courseType);
        } else {
            // Fallback - redirect to exam page
            window.location.href = `exam.html?course=${courseType}&user=${encodeURIComponent(userEmail)}`;
        }
    }

    // Redirect to payment
    async redirectToPayment(userEmail, paymentStatus, courseType) {
        console.log('💳 Redirecting to payment:', userEmail, courseType);
        
        // Show payment modal with course context
        await this.showPaymentModalWithContext(userEmail, paymentStatus, courseType);
    }

    // Show payment modal with course context
    async showPaymentModalWithContext(userEmail, paymentStatus, courseType) {
        const courseNames = {
            'rscit': 'RS-CIT Online Test',
            'rscit-subject': 'RS-CIT Subject-wise Test',
            'rscit-mock': 'RS-CIT Mock Test',
            'ccc': 'CCC Online Test',
            'ccc-subject': 'CCC Subject-wise Test',
            'ccc-practical': 'CCC Practical Test',
            'premium': 'Premium Course'
        };

        const courseName = courseNames[courseType] || 'Selected Course';
        
        const result = await Swal.fire({
            icon: 'info',
            title: `🎯 ${courseName}`,
            html: `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 2.5rem; margin-bottom: 20px;">🎓</div>
                    <h3 style="color: #17a2b8; margin-bottom: 15px;">Premium Access Required</h3>
                    <p style="color: #666; margin-bottom: 20px;">
                        To access <strong>${courseName}</strong>, you need an active subscription.
                    </p>
                    <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
                        <div style="color: #0c5460; font-weight: bold; margin-bottom: 5px;">💰 One-time Payment</div>
                        <div style="color: #0c5460; font-size: 0.9rem;">
                            ₹49 for 90 days access to all courses and exams
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '💳 Pay Now & Start Exam',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d'
        });

        if (result.isConfirmed) {
            // Show payment modal
            await this.showPaymentModal(userEmail, paymentStatus);
        }
    }

    // Setup page refresh handler for Ctrl+F5
    setupPageRefreshHandler() {
        console.log('🔄 Setting up page refresh handler...');
        
        // Handle page refresh/reload
        window.addEventListener('beforeunload', () => {
            console.log('🔄 Page is being refreshed/reloaded');
            // Store current state
            const currentUser = authManager.getCurrentUser();
            if (currentUser) {
                localStorage.setItem('lastUserBeforeRefresh', JSON.stringify({
                    email: currentUser.email,
                    timestamp: Date.now()
                }));
            }
        });

        // Handle page load after refresh
        window.addEventListener('load', async () => {
            console.log('🔄 Page loaded - checking for refresh');
            
            const lastUser = localStorage.getItem('lastUserBeforeRefresh');
            if (lastUser) {
                try {
                    const userData = JSON.parse(lastUser);
                    const timeDiff = Date.now() - userData.timestamp;
                    
                    // If refresh was within last 10 seconds, perform immediate check
                    if (timeDiff < 10000) {
                        console.log('🔄 Recent refresh detected - performing immediate payment check');
                        setTimeout(async () => {
                            await this.performAutomaticPaymentCheck();
                        }, 500);
                    }
                    
                    // Clean up
                    localStorage.removeItem('lastUserBeforeRefresh');
                } catch (error) {
                    console.error('❌ Error handling refresh data:', error);
                }
            }
        });

        // Handle Ctrl+F5 specifically
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key === 'F5') || (e.ctrlKey && e.shiftKey && e.key === 'R')) {
                console.log('🔄 Ctrl+F5 detected - marking for immediate check');
                localStorage.setItem('forcePaymentCheck', 'true');
            }
        });

        // Check for forced payment check flag
        if (localStorage.getItem('forcePaymentCheck')) {
            console.log('🔄 Forced payment check flag detected');
            localStorage.removeItem('forcePaymentCheck');
            setTimeout(async () => {
                await this.performAutomaticPaymentCheck();
            }, 1000);
        }
    }

    // Show exam access notification
    showExamAccessNotification(paymentStatus) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            max-width: 300px;
        `;
        
        const daysLeft = Math.ceil((new Date(paymentStatus.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
        
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-size: 1.5rem;">🎯</div>
                <div>
                    <div style="font-size: 0.9rem; margin-bottom: 2px;">Exam Access Enabled!</div>
                    <div style="font-size: 0.75rem; opacity: 0.9;">${daysLeft} days remaining</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }, 5000);
    }

    // Update premium UI
    updatePremiumUI(userEmail, paymentStatus) {
        // Add premium badge to user info
        const userInfo = document.getElementById('userInfo');
        if (userInfo && userInfo.textContent.includes(userEmail)) {
            userInfo.innerHTML = `
                <span style="color: #28a745;">
                    <i class="fas fa-crown" style="color: #ffc107;"></i> 
                    ${userEmail} 
                    <span style="font-size: 0.7rem; background: #28a745; color: white; padding: 2px 6px; border-radius: 10px; margin-left: 5px;">PREMIUM</span>
                </span>
            `;
        }
    }

    // Update payment required UI
    updatePaymentRequiredUI(userEmail, paymentStatus) {
        // Add payment required indicator to user info
        const userInfo = document.getElementById('userInfo');
        if (userInfo && userInfo.textContent.includes(userEmail)) {
            userInfo.innerHTML = `
                <span style="color: #dc3545;">
                    <i class="fas fa-user"></i> 
                    ${userEmail} 
                    <span style="font-size: 0.7rem; background: #dc3545; color: white; padding: 2px 6px; border-radius: 10px; margin-left: 5px;">PAYMENT REQUIRED</span>
                </span>
            `;
        }
    }

    // Setup subscription checker and reminder system
    setupSubscriptionChecker() {
        // Check subscription status on page load
        setTimeout(async () => {
            await this.checkSubscriptionStatus();
        }, 2000);
        
        // Check subscription status every hour
        setInterval(async () => {
            await this.checkSubscriptionStatus();
        }, 60 * 60 * 1000); // 1 hour
        
        // Listen for auth state changes
        if (window.auth) {
            window.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setTimeout(async () => {
                        await this.checkSubscriptionStatus();
                    }, 1000);
                }
            });
        }
    }

    // Check subscription status and show reminders
    async checkSubscriptionStatus() {
        const currentUser = authManager.getCurrentUser();
        if (!currentUser) return;
        
        try {
            const paymentStatus = await this.checkPaymentStatus(currentUser.email);
            
            if (paymentStatus.hasAccess && paymentStatus.status === 'active') {
                // Check if user needs renewal reminder
                if (paymentStatus.daysRemaining <= 3 && paymentStatus.daysRemaining > 0) {
                    this.showRenewalReminder(currentUser.email, paymentStatus);
                } else if (paymentStatus.isInGracePeriod) {
                    this.showGracePeriodWarning(currentUser.email, paymentStatus);
                }
            }
        } catch (error) {
            console.error('❌ Failed to check subscription status:', error);
        }
    }

    // Show renewal reminder
    showRenewalReminder(userEmail, paymentStatus) {
        // Check if reminder was already shown today
        const reminderKey = `reminder_${userEmail}_${new Date().toDateString()}`;
        if (localStorage.getItem(reminderKey)) return;
        
        // Mark reminder as shown
        localStorage.setItem(reminderKey, 'true');
        
        setTimeout(() => {
            Swal.fire({
                icon: 'warning',
                title: '⏰ Renewal Reminder',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                        <h3 style="color: #ffc107; margin-bottom: 15px;">Your Subscription Expires Soon!</h3>
                        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #ffeaa7;">
                            <div style="color: #856404;">
                                <strong>Account:</strong> ${userEmail}<br>
                                <strong>Days Remaining:</strong> ${paymentStatus.daysRemaining} day(s)<br>
                                <strong>Expires On:</strong> ${new Date(paymentStatus.expiryDate).toLocaleDateString('en-IN')}
                            </div>
                        </div>
                        <p style="color: #666; font-size: 0.9rem;">
                            Renew now to continue accessing all courses without interruption.
                            After expiry, you'll have 3 days grace period.
                        </p>
                    </div>
                `,
                confirmButtonText: '<i class="fas fa-refresh"></i> Renew Now',
                showCancelButton: true,
                cancelButtonText: 'Remind Later',
                confirmButtonColor: '#ffc107',
                cancelButtonColor: '#6c757d'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.showPaymentModal(userEmail, { status: 'renewal' });
                }
            });
        }, 3000); // Show after 3 seconds
    }

    // Show grace period warning
    showGracePeriodWarning(userEmail, paymentStatus) {
        // Check if warning was already shown today
        const warningKey = `graceWarning_${userEmail}_${new Date().toDateString()}`;
        if (localStorage.getItem(warningKey)) return;
        
        // Mark warning as shown
        localStorage.setItem(warningKey, 'true');
        
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: '🚨 Grace Period Active',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">🚨</div>
                        <h3 style="color: #dc3545; margin-bottom: 15px;">Subscription Expired - Grace Period Active</h3>
                        <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #f5c6cb;">
                            <div style="color: #721c24;">
                                <strong>Account:</strong> ${userEmail}<br>
                                <strong>Grace Days Remaining:</strong> ${paymentStatus.graceDaysRemaining} day(s)<br>
                                <strong>Access Expires:</strong> Soon
                            </div>
                        </div>
                        <p style="color: #666; font-size: 0.9rem;">
                            Your subscription has expired but you still have access during the grace period.
                            Renew immediately to avoid losing access to courses.
                        </p>
                    </div>
                `,
                confirmButtonText: '<i class="fas fa-exclamation-triangle"></i> Renew Immediately',
                showCancelButton: false,
                confirmButtonColor: '#dc3545',
                allowOutsideClick: false
            }).then(() => {
                this.showPaymentModal(userEmail, { status: 'expired' });
            });
                 }, 1000); // Show after 1 second
     }

    // Setup security monitoring and anti-tampering
    setupSecurityMonitoring() {
        // Monitor localStorage tampering attempts
        this.setupLocalStorageProtection();
        
        // Monitor console usage (developer tools)
        this.setupConsoleProtection();
        
        // Monitor payment data integrity
        this.setupPaymentDataIntegrity();
        
        // Setup periodic security checks
        setInterval(() => {
            this.performSecurityCheck();
        }, 30000); // Every 30 seconds
    }

    // Protect localStorage from tampering
    setupLocalStorageProtection() {
        const originalSetItem = localStorage.setItem;
        const originalRemoveItem = localStorage.removeItem;
        
        localStorage.setItem = function(key, value) {
            // Monitor payment-related changes
            if (key.includes('payment_') || key.includes('demoTest_')) {
                console.warn('🔐 Payment data modification detected:', key);
                
                // Log suspicious activity
                if (window.database) {
                    window.database.ref('securityAlerts').push({
                        type: 'localStorage_tampering',
                        key: key,
                        timestamp: Date.now(),
                        userAgent: navigator.userAgent
                    });
                }
            }
            return originalSetItem.apply(this, arguments);
        };
        
        localStorage.removeItem = function(key) {
            if (key.includes('payment_') || key.includes('demoTest_')) {
                console.warn('🔐 Payment data deletion detected:', key);
            }
            return originalRemoveItem.apply(this, arguments);
        };
    }

    // Monitor console usage for security
    setupConsoleProtection() {
        let devToolsOpen = false;
        const threshold = 160;
        
        const detectDevTools = () => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devToolsOpen) {
                    devToolsOpen = true;
                    console.warn('🔐 Developer tools detected');
                    
                    // Log dev tools usage
                    if (window.database) {
                        window.database.ref('securityAlerts').push({
                            type: 'dev_tools_detected',
                            timestamp: Date.now(),
                            userAgent: navigator.userAgent
                        });
                    }
                }
            } else {
                devToolsOpen = false;
            }
        };
        
        setInterval(detectDevTools, 1000);
    }

    // Monitor payment data integrity
    setupPaymentDataIntegrity() {
        // Create checksums for critical data
        const createChecksum = (data) => {
            let hash = 0;
            const str = JSON.stringify(data);
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return hash.toString(16);
        };
        
        this.createChecksum = createChecksum;
        
        // Validate payment data integrity
        window.validatePaymentIntegrity = (userEmail) => {
            const paymentData = localStorage.getItem(`payment_${userEmail}`);
            if (!paymentData) return true;
            
            try {
                const data = JSON.parse(paymentData);
                const expectedChecksum = this.createChecksum({
                    email: data.email,
                    amount: data.amount,
                    expiryDate: data.expiryDate
                });
                
                return data.checksum === expectedChecksum;
            } catch {
                return false;
            }
        };
    }

    // Perform periodic security checks
    performSecurityCheck() {
        const currentUser = authManager.getCurrentUser();
        if (!currentUser) return;
        
        try {
            // Check payment data integrity
            const isIntact = window.validatePaymentIntegrity(currentUser.email);
            if (!isIntact) {
                console.error('🚨 Payment data integrity compromised');
                
                // Force logout and require re-verification
                this.handleSecurityBreach(currentUser.email, 'data_integrity_failed');
            }
            
            // Check for suspicious patterns
            const verificationLogs = JSON.parse(localStorage.getItem('verificationLogs') || '[]');
            const recentAttempts = verificationLogs.filter(log => 
                Date.now() - log.timestamp < 5 * 60 * 1000 // Last 5 minutes
            );
            
            if (recentAttempts.length > 3) {
                console.warn('🚨 Multiple verification attempts detected');
                this.handleSecurityBreach(currentUser.email, 'excessive_verification_attempts');
            }
            
        } catch (error) {
            console.error('❌ Security check failed:', error);
        }
    }

    // Handle security breaches
    async handleSecurityBreach(userEmail, breachType) {
        console.error('🚨 Security breach detected:', breachType);
        
        // Log security incident
        if (window.database) {
            window.database.ref('securityIncidents').push({
                email: userEmail,
                breachType: breachType,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });
        }
        
        // Clear potentially compromised data
        localStorage.removeItem(`payment_${userEmail}`);
        
        // Show security alert
        await Swal.fire({
            icon: 'error',
            title: '🚨 Security Alert',
            html: `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                    <h3 style="color: #dc3545; margin-bottom: 15px;">Security Issue Detected</h3>
                    <p style="color: #666; margin-bottom: 20px;">
                        For your account security, please log in again and re-verify your payment.
                    </p>
                    <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <div style="color: #721c24; font-size: 0.9rem;">
                            If you did not attempt any suspicious activity, please contact support immediately.
                        </div>
                    </div>
                </div>
            `,
            confirmButtonText: 'Secure Re-login',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false
        });
        
        // Force logout
        if (authManager.logout) {
            authManager.logout();
        }
        
        // Reload page for clean state
                 setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // Security: Validate secure session integrity
    async validateSecureSession(userEmail) {
        try {
            const currentUser = authManager.getCurrentUser();
            if (!currentUser || currentUser.email !== userEmail) {
                console.warn('🚫 Session user mismatch');
                return false;
            }

            // Check session timestamp and validity
            const sessionStart = localStorage.getItem(`sessionStart_${userEmail}`);
            if (!sessionStart) {
                localStorage.setItem(`sessionStart_${userEmail}`, Date.now().toString());
                return true;
            }

            const sessionAge = Date.now() - parseInt(sessionStart);
            const maxSessionAge = 12 * 60 * 60 * 1000; // 12 hours

            if (sessionAge > maxSessionAge) {
                console.warn('🚫 Session expired');
                return false;
            }

            return true;
        } catch (error) {
            console.error('❌ Session validation failed:', error);
            return false;
        }
    }

    // Security: Final exam access validation
    async validateExamAccess(userEmail) {
        try {
            // Check payment data integrity
            const paymentData = localStorage.getItem(`payment_${userEmail}`);
            if (!paymentData) return false;

            const data = JSON.parse(paymentData);
            
            // Validate checksum
            if (data.checksum) {
                const expectedChecksum = this.createChecksum({
                    email: data.email,
                    amount: data.amount,
                    expiryDate: data.expiryDate
                });
                
                if (data.checksum !== expectedChecksum) {
                    console.error('🚨 Payment data checksum validation failed');
                    return false;
                }
            }

            // Check browser fingerprint if available
            if (data.fingerprint) {
                const currentFingerprint = this.getBrowserFingerprint();
                if (data.fingerprint !== currentFingerprint) {
                    console.warn('⚠️ Browser fingerprint changed - possible session hijacking');
                    // Don't block access completely, but log the incident
                    this.logSecurityAlert('fingerprint_mismatch', {
                        email: userEmail,
                        originalFingerprint: data.fingerprint,
                        currentFingerprint: currentFingerprint
                    });
                }
            }

            // Check subscription validity
            const now = new Date();
            const expiryDate = new Date(data.expiryDate);
            const gracePeriod = 3 * 24 * 60 * 60 * 1000; // 3 days
            const graceExpiryDate = new Date(expiryDate.getTime() + gracePeriod);

            if (now > graceExpiryDate) {
                console.warn('🚫 Subscription expired (including grace period)');
                return false;
            }

            return true;
        } catch (error) {
            console.error('❌ Exam access validation failed:', error);
            return false;
        }
    }

    // Security: Log secure access attempts
    logSecureAccess(userEmail, courseType) {
        try {
            const accessLog = {
                email: userEmail,
                courseType: courseType,
                timestamp: Date.now(),
                fingerprint: this.getBrowserFingerprint(),
                userAgent: navigator.userAgent,
                ip: this.getClientIP()
            };

            // Store in Firebase
            if (window.database) {
                window.database.ref('accessLogs').push(accessLog);
            }

            // Store locally
            const localLogs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
            localLogs.push(accessLog);
            if (localLogs.length > 50) localLogs.shift(); // Keep only last 50
            localStorage.setItem('accessLogs', JSON.stringify(localLogs));

            console.log('📝 Secure access logged:', courseType);
        } catch (error) {
            console.error('❌ Failed to log secure access:', error);
        }
    }

    // Security: Log security alerts
    logSecurityAlert(alertType, data) {
        try {
            const alert = {
                type: alertType,
                data: data,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            };

            // Store in Firebase for admin monitoring
            if (window.database) {
                window.database.ref('securityAlerts').push(alert);
            }

            console.warn('🚨 Security alert logged:', alertType);
        } catch (error) {
            console.error('❌ Failed to log security alert:', error);
                 }
     }

    // Setup production security measures
    setupProductionSecurity() {
        // Disable right-click context menu (basic protection)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: '🚫 Right-click Disabled',
                text: 'Right-click is disabled for security reasons.',
                timer: 2000,
                showConfirmButton: false
            });
            return false;
        });

        // Disable common developer shortcuts
        document.addEventListener('keydown', (e) => {
            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
                
                Swal.fire({
                    icon: 'warning',
                    title: '🚫 Developer Tools Disabled',
                    text: 'Developer tools are disabled for security reasons.',
                    timer: 2000,
                    showConfirmButton: false
                });
                
                // Log attempt
                this.logSecurityAlert('dev_tools_attempt', {
                    key: e.key,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    timestamp: Date.now()
                });
                
                return false;
            }
        });

        // Disable text selection for sensitive elements
        const sensitiveElements = document.querySelectorAll('.payment-modal, .transaction-modal');
        sensitiveElements.forEach(element => {
            element.style.userSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.mozUserSelect = 'none';
            element.style.msUserSelect = 'none';
        });

        // Add anti-debug measures
        setInterval(() => {
            const start = performance.now();
            debugger; // This will cause a delay if devtools are open
            const end = performance.now();
            
            if (end - start > 100) {
                console.warn('🚨 Debugger detected - possible developer tools usage');
                this.logSecurityAlert('debugger_detected', {
                    delay: end - start,
                    timestamp: Date.now()
                });
            }
        }, 5000);

        // Monitor for console clearing attempts
        const originalClear = console.clear;
        console.clear = function() {
            console.warn('🚨 Console clear attempt detected');
            // Don't actually clear, just log
            if (window.mainApp) {
                window.mainApp.logSecurityAlert('console_clear_attempt', {
                    timestamp: Date.now()
                });
            }
        };

        // Prevent iframe embedding (clickjacking protection)
        if (window.self !== window.top) {
            window.top.location = window.self.location;
        }

        console.log('🔒 Production security measures activated');
        
        // Add helpful console instructions for testing
        setTimeout(() => {
            console.log(`
%c🎯 DCT24 Payment System - Developer Instructions

%c📝 Testing Payment System:
%c1. Login first: Click "LogIn" button
%c2. Test payment: Type testPayment() in console
%c3. Payment success: Will show success message and exam options
%c4. Start exam: Payment success modal will offer direct exam start

%c⏰ QR Code Timer Features:
%c• QR code expires in 45 seconds
%c• Timer shows countdown with color changes
%c• After expiry: Options to retry or enter transaction ID
%c• Automatic modal closure on timeout

%c🔧 Available Console Commands:
%ctestPayment() - Activate test payment for current user
%ctestPayment('email@gmail.com') - Activate for specific email
%cdirectAdminAccess() - Access admin panel

%c⚠️ Security Features Active:
%c• Right-click disabled
%c• Developer shortcuts blocked  
%c• Payment data integrity checks
%c• Session validation
%c• Rate limiting on verification attempts
%c• QR code expiration for security

%c💡 Payment Flow: Login → Pay/Test → Success → Start Exam
            `, 
            'color: #667eea; font-size: 16px; font-weight: bold;',
            'color: #28a745; font-weight: bold;',
            'color: #333;', 'color: #333;', 'color: #333;', 'color: #333;',
            'color: #ffc107; font-weight: bold;',
            'color: #666;', 'color: #666;', 'color: #666;', 'color: #666;',
            'color: #17a2b8; font-weight: bold;',
            'color: #6c757d; font-family: monospace;',
            'color: #6c757d; font-family: monospace;',
            'color: #6c757d; font-family: monospace;',
            'color: #dc3545; font-weight: bold;',
            'color: #666;', 'color: #666;', 'color: #666;', 'color: #666;', 'color: #666;', 'color: #666;',
            'color: #28a745; font-weight: bold;'
            );
        }, 3000);
    }

    // Show live features on page load
    showLiveFeatures() {
        console.log('✨ Showing live features...');
        
        // Add pulse animation to course cards
        setTimeout(() => {
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'pulse 2s ease-in-out';
                    card.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.3)';
                }, index * 200); // Staggered animation
            });
            
            // Reset animation after 3 seconds
            setTimeout(() => {
                courseCards.forEach(card => {
                    card.style.animation = '';
                    card.style.boxShadow = '';
                });
            }, 3000);
        }, 2000);
        
        // Show floating notification
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 12px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                z-index: 1000;
                animation: slideInUp 0.5s ease, fadeOut 0.5s ease 4s forwards;
                cursor: pointer;
                max-width: 300px;
            `;
            
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="font-size: 2rem;">🚀</div>
                    <div>
                        <div style="font-weight: bold; margin-bottom: 5px;">Ready to Excel?</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Start your first exam now!</div>
                    </div>
                    <div style="margin-left: auto; font-size: 1.2rem;">✨</div>
                </div>
            `;
            
            notification.addEventListener('click', () => {
                notification.remove();
                const coursesSection = document.getElementById('onlineTests');
                if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
        }, 3000);
    }

    setupExamStartButtons() {
        console.log('🎯 Setting up exam start buttons with payment system...');
        
        // Add event listeners to all exam start buttons
        const examStartButtons = document.querySelectorAll('.btn-exam-start');
        
        examStartButtons.forEach(button => {
            const courseType = button.getAttribute('data-course');
            console.log('✅ Adding listener for course:', courseType);
            
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                console.log('🚀 Exam start button clicked for:', courseType);
                
                // Disable button temporarily
                button.disabled = true;
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
                
                try {
                    // Step 1: Check if user is logged in
                    const currentUser = authManager.getCurrentUser();
                    
                    if (!currentUser) {
                        // User not logged in - show login prompt
                        await this.showLoginRequiredModal();
                        return;
                    }
                    
                    // Step 2: Security - Validate session integrity
                    const sessionValid = await this.validateSecureSession(currentUser.email);
                    if (!sessionValid) {
                        console.error('🚨 Session security validation failed');
                        await this.handleSecurityBreach(currentUser.email, 'invalid_session');
                        return;
                    }

                    // Step 3: Check payment status for this user
                    const paymentStatus = await this.checkPaymentStatus(currentUser.email);
                    
                    if (paymentStatus.hasAccess) {
                        console.log('✅ User has ACTIVE subscription:', {
                            email: currentUser.email,
                            status: paymentStatus.status,
                            daysRemaining: paymentStatus.daysRemaining,
                            expiryDate: paymentStatus.expiryDate,
                            isInGracePeriod: paymentStatus.isInGracePeriod
                        });
                        // Step 4: Final security validation before exam access
                        const accessGranted = await this.validateExamAccess(currentUser.email);
                        if (!accessGranted) {
                            console.error('🚨 Exam access validation failed');
                            await Swal.fire({
                                icon: 'error',
                                title: '🚫 Access Denied',
                                html: `
                                    <div style="text-align: center; padding: 20px;">
                                        <div style="font-size: 3rem; margin-bottom: 20px;">⛔</div>
                                        <h3 style="color: #dc3545; margin-bottom: 15px;">Security Check Failed</h3>
                                        <p style="color: #666; margin-bottom: 20px;">
                                            Your session could not be validated. Please log in again.
                                        </p>
                                        <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 20px 0;">
                                            <div style="color: #721c24; font-size: 0.9rem;">
                                                This is a security measure to protect your account and prevent unauthorized access.
                                            </div>
                                        </div>
                                    </div>
                                `,
                                confirmButtonText: 'Re-login',
                                confirmButtonColor: '#dc3545'
                            });
                            return;
                        }

                        // All security checks passed - start exam
                        console.log('✅ All security checks passed, starting exam');
                        this.logSecureAccess(currentUser.email, courseType);
                        
                        // Show exam starting message
                        await Swal.fire({
                            icon: 'success',
                            title: '🚀 Starting Exam!',
                            html: `
                                <div style="text-align: center; padding: 20px;">
                                    <div style="font-size: 3rem; margin-bottom: 20px;">📝</div>
                                    <h3 style="color: #28a745; margin-bottom: 15px;">Exam Access Granted!</h3>
                                    <p style="color: #666; margin-bottom: 20px;">
                                        Starting your ${courseType.toUpperCase()} exam...
                                    </p>
                                    <div style="background: #d4edda; padding: 15px; border-radius: 10px; border-left: 4px solid #28a745;">
                                        <div style="color: #155724; font-weight: bold;">✅ Payment Verified</div>
                                        <div style="color: #155724; font-size: 0.9rem;">
                                            Your subscription is active and valid
                                        </div>
                                    </div>
                                </div>
                            `,
                            confirmButtonText: 'Continue to Exam',
                            confirmButtonColor: '#28a745',
                            timer: 3000,
                            timerProgressBar: true
                        });
                        
                        // Start the exam
                        if (window.examManager && examManager.startExam) {
                            await examManager.startExam(courseType);
                        } else {
                            // Fallback: redirect to exam page
                            console.log('📝 Redirecting to exam page:', courseType);
                            window.location.href = `exam.html?type=${courseType}`;
                        }
                    } else {
                        // User needs to make payment
                        console.log('❌ User needs payment:', {
                            email: currentUser.email,
                            status: paymentStatus.status,
                            needsPayment: paymentStatus.needsPayment
                        });
                        await this.showPaymentModal(currentUser.email, paymentStatus);
                    }
                    
                } catch (error) {
                    console.error('❌ Failed to start exam:', error);
                    
                    await Swal.fire({
                        icon: 'error',
                        title: 'Failed to Start Exam',
                        text: 'Something went wrong. Please try again.'
                    });
                } finally {
                    // Re-enable button
                    button.disabled = false;
                    button.innerHTML = originalText;
                }
            });
        });
        
        console.log(`✅ Setup complete for ${examStartButtons.length} exam buttons`);
        
        // Add global admin access function for testing
        window.directAdminAccess = () => {
            console.log('🔑 Direct admin access granted');
            localStorage.setItem('adminAuthenticated', 'true');
            localStorage.setItem('adminEmail', 'digitalcomputer1808@gmail.com');
            
            // Use custom modal instead of alert
            Swal.fire({
                icon: 'success',
                title: 'Admin Access Granted!',
                text: 'Redirecting to admin panel...',
                timer: 2000,
                showConfirmButton: false
            });
            
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 2000);
        };

        // Add test payment function for development
        window.testPayment = async (userEmail = null) => {
            const currentUser = authManager.getCurrentUser();
            const email = userEmail || (currentUser ? currentUser.email : null);
            
            if (!email) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Required',
                    text: 'Please login first to test payment'
                });
                return;
            }

            // Check if user already has active payment
            const existingPayment = await this.checkPaymentStatus(email);
            if (existingPayment.hasAccess) {
                await Swal.fire({
                    icon: 'info',
                    title: '✅ Payment Already Active',
                    html: `
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 3rem; margin-bottom: 20px;">✅</div>
                            <h3 style="color: #28a745; margin-bottom: 15px;">Subscription Already Active!</h3>
                            <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #c3e6cb;">
                                <div style="color: #155724;">
                                    <strong>Account:</strong> ${email}<br>
                                    <strong>Status:</strong> ${existingPayment.status.toUpperCase()}<br>
                                    <strong>Days Remaining:</strong> ${existingPayment.daysRemaining}<br>
                                    <strong>Expires:</strong> ${new Date(existingPayment.expiryDate).toLocaleDateString('en-IN')}<br>
                                    ${existingPayment.isInGracePeriod ? `<strong>Grace Period:</strong> ${existingPayment.graceDaysRemaining} days left<br>` : ''}
                                    <strong>Transaction ID:</strong> ${existingPayment.transactionId || 'N/A'}
                                </div>
                            </div>
                            <p style="color: #666; font-size: 0.9rem;">
                                You can start any exam immediately!
                            </p>
                        </div>
                    `,
                    confirmButtonText: 'Start Exam Now',
                    confirmButtonColor: '#28a745'
                });
                return;
            }

            console.log('🧪 Testing payment for:', email);
            
            const testTransactionId = 'TEST' + Date.now().toString().slice(-8);
            
            await Swal.fire({
                icon: 'info',
                title: '🧪 Test Payment Mode',
                html: `
                    <div style="text-align: center; padding: 20px;">
                        <p>Activating test payment for:</p>
                        <p><strong>${email}</strong></p>
                        <p>Test Transaction ID: <code>${testTransactionId}</code></p>
                        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                            <div style="color: #856404; font-size: 0.9rem;">
                                This will activate a 90-day subscription with 3-day grace period.
                            </div>
                        </div>
                    </div>
                `,
                confirmButtonText: 'Activate Test Payment',
                showCancelButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.activateSubscription(email, testTransactionId);
                }
            });
        };
    }

    async ensureSampleQuestions() {
        console.log('🔍 Checking if sample questions exist...');
        
        try {
            const result = await questionsManager.getAllQuestions();
            
            if (result.success && result.questions.length === 0) {
                console.log('📝 No questions found, adding sample questions...');
                
                const sampleQuestions = [
                    {
                        question: "What does CCC stand for?",
                        options: ["Computer Course Certificate", "Course on Computer Concepts", "Certificate Computer Course", "Computer Concepts Course"],
                        correctAnswer: 1,
                        courseType: "ccc"
                    },
                    {
                        question: "Which is the first page of a website?",
                        options: ["Homepage", "Web page", "Main page", "Index page"],
                        correctAnswer: 0,
                        courseType: "ccc"
                    },
                    {
                        question: "What does RS-CIT stand for?",
                        options: ["Rajasthan State Certificate in Information Technology", "Royal State Computer IT", "Rajasthan System Computer IT", "None of the above"],
                        correctAnswer: 0,
                        courseType: "rscit"
                    },
                    {
                        question: "Which software is used for word processing?",
                        options: ["Excel", "PowerPoint", "MS Word", "Paint"],
                        correctAnswer: 2,
                        courseType: "rscit"
                    },
                    {
                        question: "What is the shortcut key for copy?",
                        options: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"],
                        correctAnswer: 0,
                        courseType: "free-test"
                    },
                    {
                        question: "Which of the following is an operating system?",
                        options: ["Microsoft Word", "Windows 10", "Google Chrome", "Adobe Photoshop"],
                        correctAnswer: 1,
                        courseType: "ccc-subject"
                    },
                    {
                        question: "What is the full form of URL?",
                        options: ["Uniform Resource Locator", "Universal Resource Link", "Unique Resource Location", "Universal Reference Link"],
                        correctAnswer: 0,
                        courseType: "rscit-subject"
                    },
                    {
                        question: "Which key is used to delete characters to the left of cursor?",
                        options: ["Delete", "Backspace", "Ctrl+X", "Shift+Delete"],
                        correctAnswer: 1,
                        courseType: "ccc-practical"
                    },
                    {
                        question: "What does RAM stand for?",
                        options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"],
                        correctAnswer: 0,
                        courseType: "rscit-mock"
                    },
                    {
                        question: "Which company developed the Windows operating system?",
                        options: ["Apple", "Google", "Microsoft", "IBM"],
                        correctAnswer: 2,
                        courseType: "premium"
                    }
                ];

                // Add each sample question
                for (const questionData of sampleQuestions) {
                    await questionsManager.addQuestion(questionData);
                }

                console.log('✅ Sample questions added successfully');
            } else {
                console.log('✅ Questions already exist, no need to add samples');
            }
        } catch (error) {
            console.error('❌ Failed to check/add sample questions:', error);
        }
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');

        // Student Login button
        const studentLoginBtn = document.getElementById('studentLoginBtn');
        if (studentLoginBtn) {
            console.log('✅ Student Login button found');
            studentLoginBtn.addEventListener('click', async () => {
                console.log('🔗 Student Login button clicked');
                
                // Show loading message
                Swal.fire({
                                            title: 'LogIn',
                    text: 'Please select your Google account to sign in...',
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                
                try {
                    // Directly call Google Sign-In
                    const result = await authManager.signInWithGoogle();
                    
                    if (result.success) {
                        console.log('✅ Student Google login successful');
                        
                        // INSTANT UI Update - Multiple immediate calls
                        console.log('🔄 INSTANT: Updating UI IMMEDIATELY after login - MULTIPLE CALLS');
                        
                        // Force immediate UI updates
                        this.liveUpdateUI(); // First immediate update
                        
                        // Additional forced updates with zero delay
                        setTimeout(() => {
                            console.log('🔄 INSTANT: Main App - UI update at 0ms');
                            this.liveUpdateUI();
                        }, 0);
                        
                        setTimeout(() => {
                            console.log('🔄 INSTANT: Main App - UI update at 5ms');
                            this.liveUpdateUI();
                        }, 5);
                        
                        setTimeout(() => {
                            console.log('🔄 INSTANT: Main App - UI update at 15ms');
                            this.liveUpdateUI();
                        }, 15);
                        
                        await Swal.fire({
                            icon: 'success',
                            title: 'Welcome Student!',
                            html: `
                                <div style="text-align: center;">
                                    ${result.user.photoURL ? `<img src="${result.user.photoURL}" alt="Profile" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: 10px;">` : ''}
                                    <p><strong>${result.user.displayName || 'Student'}</strong></p>
                                    <p style="color: #666; font-size: 14px;">${result.user.email}</p>
                                </div>
                            `,
                            timer: 2000,
                            showConfirmButton: false,
                            didOpen: () => {
                                // Force another UI update when modal opens
                                console.log('🔄 INSTANT: Force UI update during modal display');
                                this.liveUpdateUI();
                            }
                        });
                        
                        // Final UI update after modal
                        console.log('🔄 INSTANT: Final UI update after modal');
                        this.liveUpdateUI();
                        
                    } else {
                        console.error('❌ Student Google login failed:', result.error);
                        
                        await Swal.fire({
                            icon: 'error',
                            title: 'Login Failed',
                            text: result.error || 'Failed to sign in with Google. Please try again.',
                            confirmButtonText: 'OK'
                        });
                    }
                } catch (error) {
                    console.error('❌ Student login error:', error);
                    
                    await Swal.fire({
                        icon: 'error',
                        title: 'Login Error',
                        text: 'Something went wrong. Please try again.',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            console.log('✅ Logout button found');
            logoutBtn.addEventListener('click', async () => {
                console.log('🔗 Logout button clicked');
                
                const result = await Swal.fire({
                    title: 'Logout',
                    text: 'Are you sure you want to logout?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Logout',
                    cancelButtonText: 'Cancel',
                    confirmButtonColor: '#d33'
                });
                
                if (result.isConfirmed) {
                    try {
                        const logoutResult = await authManager.logout();
                        
                        await Swal.fire({
                            icon: 'success',
                            title: 'Logged Out',
                            text: 'You have been successfully logged out.',
                            timer: 1500,
                            showConfirmButton: false
                        });
                        
                        // Update UI
                        this.updateButtonsVisibility();
                        
                    } catch (error) {
                        console.error('❌ Logout error:', error);
                        
                        await Swal.fire({
                            icon: 'info',
                            title: 'Logged Out',
                            text: 'Session ended.',
                            timer: 1500,
                            showConfirmButton: false
                        });
                        
                        // Force update UI anyway
                        this.updateButtonsVisibility();
                    }
                }
            });
        }

        // Admin button
        const adminBtn = document.getElementById('adminBtn');
        if (adminBtn) {
            console.log('✅ Admin button found');
            adminBtn.addEventListener('click', async () => {
                console.log('🔗 Admin button clicked');
                
                // Show custom admin login modal
                window.adminLoginModal.showModal();
            });
        }

        // CTA button (Start Learning Today)
        const ctaBtn = document.querySelector('.btn-cta');
        if (ctaBtn) {
            console.log('✅ CTA button (Start Learning Today) found');
            ctaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔗 Start Learning Today button clicked');
                
                const currentUser = authManager.getCurrentUser();
                console.log('👤 Current user:', currentUser ? currentUser.email : 'Not logged in');
                
                if (currentUser) {
                    // User is logged in - scroll to questions section
                    const questionsSection = document.querySelector('.questions-section');
                    if (questionsSection) {
                        console.log('📜 Scrolling to questions section');
                        questionsSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Show success message
                        Swal.fire({
                            icon: 'success',
                            title: 'Welcome!',
                            text: 'Practice questions are loaded below. Start solving!',
                            timer: 2000,
                            showConfirmButton: false,
                            position: 'top-end',
                            toast: true
                        });
                    } else {
                        console.warn('❌ Questions section not found');
                    }
                } else {
                    // User not logged in - redirect to login
                    console.log('🔗 Redirecting to login page');
                    Swal.fire({
                        icon: 'info',
                        title: '🚀 Ready to Start Exam?',
                        text: 'Please login first to begin your learning journey!',
                        showCancelButton: true,
                        confirmButtonText: '<i class="fas fa-sign-in-alt"></i> Login & Start',
                        cancelButtonText: 'Cancel'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'login.html';
                        }
                    });
                }
            });
        } else {
            console.warn('❌ CTA button (Start Learning Today) not found');
        }

        // Take Exam button
        const takeExamBtn = document.getElementById('takeExamBtn');
        if (takeExamBtn) {
            console.log('✅ Take Exam button found');
            takeExamBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔗 Take Exam button clicked');
                
                const currentUser = authManager.getCurrentUser();
                
                if (currentUser) {
                    // User is logged in - redirect to exam page
                    console.log('🔗 Redirecting to exam page');
                    window.location.href = 'exam.html';
                } else {
                    // User not logged in - show login prompt
                    console.log('❌ User not logged in for exam');
                    Swal.fire({
                        icon: 'info',
                        title: '🎯 Start Your Exam!',
                        text: 'Please login first to begin your exam.',
                        showCancelButton: true,
                        confirmButtonText: '<i class="fas fa-play"></i> Login & Start Exam',
                        cancelButtonText: 'Cancel'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'login.html';
                        }
                    });
                }
            });
        }

        // Practice Questions button
        const practiceBtn = document.getElementById('practiceBtn');
        if (practiceBtn) {
            console.log('✅ Practice Questions button found');
            practiceBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔗 Practice Questions button clicked');
                
                const currentUser = authManager.getCurrentUser();
                
                if (currentUser) {
                    // User is logged in - scroll to questions section
                    const questionsSection = document.querySelector('.questions-section');
                    if (questionsSection) {
                        console.log('📜 Scrolling to questions section');
                        questionsSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Show success message
                        Swal.fire({
                            icon: 'success',
                            title: 'Practice Time!',
                            text: 'Practice questions are loaded below. Good luck!',
                            timer: 2000,
                            showConfirmButton: false,
                            position: 'top-end',
                            toast: true
                        });
                    } else {
                        console.warn('❌ Questions section not found');
                    }
                } else {
                    // User not logged in - show login prompt
                    console.log('❌ User not logged in for practice');
                    Swal.fire({
                        icon: 'info',
                        title: '📚 Start Practice!',
                        text: 'Please login first to access practice questions.',
                        showCancelButton: true,
                        confirmButtonText: '<i class="fas fa-book-open"></i> Login & Practice',
                        cancelButtonText: 'Cancel'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'login.html';
                        }
                    });
                }
            });
        }

        // Also handle navigation links smooth scrolling
        this.setupSmoothScrolling();
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Setup shortcut to reset welcome modal (for testing/admin purposes)
    setupWelcomeReset() {
        // Keyboard shortcut: Ctrl+Shift+W to reset welcome modal
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'W') {
                e.preventDefault();
                
                // Clear welcome modal settings
                localStorage.removeItem('disableWelcomeModal');
                localStorage.removeItem('welcomeModalShown');
                
                Swal.fire({
                    title: '🔄 Welcome Reset!',
                    text: 'Welcome modal will show again on next page refresh.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
                
                console.log('🔄 Welcome modal settings reset by admin shortcut');
            }
            
            // Ctrl+Shift+R to reset reload modal settings
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                
                // Clear reload modal settings
                localStorage.removeItem('preventReloadDialogs');
                
                Swal.fire({
                    title: '🔄 Reload Settings Reset!',
                    text: 'Reload confirmation dialogs will show again.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
                
                console.log('🔄 Reload modal settings reset by admin shortcut');
            }
        });
    }

    setupAuthStateListener() {
        console.log('🔧 Setting up LIVE auth state listener...');
        
        // Override the updateUI method from auth manager for live updates
        const originalUpdateUI = authManager.updateUI.bind(authManager);
        authManager.updateUI = () => {
            console.log('🔄 LIVE Auth Manager updateUI called');
            originalUpdateUI();
            this.liveUpdateUI();
        };
        
        // Real-time auth state monitoring - FASTER for instant feedback
        setInterval(() => {
            this.liveUpdateUI();
        }, 250); // Check every 250ms for instant updates
        
        // Force initial UI update after a short delay
        setTimeout(() => {
            console.log('🔄 Force initial LIVE UI update');
            this.liveUpdateUI();
        }, 500);
        
        // Listen for storage changes (for cross-tab sync) - LIVE
        window.addEventListener('storage', (e) => {
            if (e.key === 'demoUser' || e.key === 'sessionToken' || e.key === 'persistedUser') {
                console.log('🔄 LIVE Storage changed, updating UI');
                setTimeout(() => this.liveUpdateUI(), 100);
            }
        });

        // Listen for authentication changes - INSTANT & LIVE
        window.addEventListener('authStateChanged', (event) => {
            console.log('🔄 INSTANT: Auth state changed event received', event.detail);
            
            if (event.detail && event.detail.instant) {
                // Instant update for immediate feedback
                console.log('🔄 INSTANT: Processing instant auth state change');
                this.liveUpdateUI();
                
                // Force additional immediate updates
                setTimeout(() => this.liveUpdateUI(), 0);
                setTimeout(() => this.liveUpdateUI(), 25);
                setTimeout(() => this.liveUpdateUI(), 50);
            } else {
                // Regular update
                this.liveUpdateUI();
            }
        });

        // Listen for page visibility changes for live updates
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('🔄 Page became visible - LIVE update');
                this.liveUpdateUI();
            }
        });
    }

    // Comprehensive LIVE UI Updates
    liveUpdateUI() {
        console.log('🔄 LIVE UI Update started...');
        
        const currentUser = authManager.getCurrentUser();
        const isAdmin = authManager.isAdmin();
        
        console.log('👤 LIVE User check:', currentUser ? currentUser.email : 'None');
        console.log('🔑 LIVE Admin check:', isAdmin);
        
        // Get all UI elements
        const elements = {
            studentLoginBtn: document.getElementById('studentLoginBtn'),
            userInfo: document.getElementById('userInfo'),
            logoutBtn: document.getElementById('logoutBtn'),
            adminBtn: document.getElementById('adminBtn'),
            questionsSection: document.querySelector('.questions-section'),
            examInstructions: document.getElementById('examInstructions'),
            practiceSection: document.getElementById('practiceSection'),
            heroButtons: document.querySelector('.hero-buttons'),
            courseCards: document.querySelectorAll('.course-card'),
            examStartButtons: document.querySelectorAll('.btn-exam-start')
        };
        
        console.log('🔍 LIVE Elements found:', Object.keys(elements).reduce((acc, key) => {
            acc[key] = !!elements[key] || (elements[key] && elements[key].length > 0);
            return acc;
        }, {}));
        
        // LIVE Authentication Status Updates
        this.updateAuthenticationUI(currentUser, isAdmin, elements);
        
        // LIVE Course Cards Updates
        this.updateCourseCardsUI(currentUser, elements);
        
        // LIVE Hero Section Updates
        this.updateHeroSectionUI(currentUser, elements);
        
        // LIVE Statistics Updates
        this.updateLiveStatistics();
        
        // LIVE Button States
        this.updateButtonStates(currentUser, elements);
        
        console.log('✅ LIVE UI Update completed:', { 
            user: currentUser ? currentUser.email : null,
            isAdmin,
            timestamp: new Date().toLocaleTimeString()
        });
    }

    // LIVE Authentication UI Updates
    updateAuthenticationUI(currentUser, isAdmin, elements) {
        const { studentLoginBtn, userInfo, logoutBtn, adminBtn } = elements;
        
        // Student Login Button - LIVE
        if (studentLoginBtn) {
            if (!currentUser) {
                studentLoginBtn.style.display = 'inline-block';
                studentLoginBtn.style.visibility = 'visible';
                studentLoginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> LogIn';
                studentLoginBtn.classList.add('pulse-animation');
                console.log('🔄 LIVE: Student Login button shown with pulse');
            } else {
                studentLoginBtn.style.display = 'none';
                studentLoginBtn.classList.remove('pulse-animation');
                console.log('🔄 LIVE: Student Login button hidden');
            }
        }

        // User Info - ULTRA INSTANT LIVE display
        if (userInfo) {
            if (currentUser) {
                console.log('🔄 INSTANT: Showing user info for:', currentUser.email);
                
                // Force immediate visibility - NO TRANSITIONS
                userInfo.style.display = 'inline-flex';
                userInfo.style.visibility = 'visible';
                userInfo.style.alignItems = 'center';
                userInfo.style.gap = '10px';
                userInfo.style.opacity = '1'; // Immediate opacity
                userInfo.style.transform = 'translateX(0)'; // No transform delay
                userInfo.style.transition = 'none'; // Remove transitions for instant display
                
                const userName = currentUser.displayName || currentUser.email.split('@')[0];
                const userPhoto = currentUser.photoURL || '';
                
                userInfo.innerHTML = `
                    ${userPhoto ? `<img src="${userPhoto}" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">` : '<i class="fas fa-user-circle" style="font-size: 24px; color: #fff;"></i>'}
                    <span style="color: #fff; font-weight: 500; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">Welcome, ${userName}</span>
                    <span class="online-indicator" style="width: 8px; height: 8px; background: #28a745; border-radius: 50%; animation: pulse 2s infinite; box-shadow: 0 0 4px #28a745;"></span>
                `;
                
                // Force layout reflow for immediate display
                userInfo.offsetHeight; // Force reflow
                
                // Add glow effect for visibility
                userInfo.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
                
                console.log('🔄 INSTANT: User info displayed IMMEDIATELY with content:', userName);
            } else {
                userInfo.style.display = 'none';
                userInfo.style.visibility = 'hidden';
                userInfo.innerHTML = '';
                userInfo.style.opacity = '0';
                console.log('🔄 INSTANT: User info hidden immediately');
            }
        }
        
        // Logout Button - LIVE
        if (logoutBtn) {
            if (currentUser) {
                logoutBtn.style.display = 'inline-block';
                logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
                console.log('🔄 LIVE: Logout button shown');
            } else {
                logoutBtn.style.display = 'none';
                console.log('🔄 LIVE: Logout button hidden');
            }
        }
        
        // Admin Button - LIVE with status
        if (adminBtn) {
            adminBtn.style.display = 'inline-block';
            if (isAdmin) {
                adminBtn.innerHTML = '<i class="fas fa-crown"></i> Admin Panel';
                adminBtn.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
                adminBtn.classList.add('admin-active');
            } else {
                adminBtn.innerHTML = '<i class="fas fa-key"></i> Admin';
                adminBtn.style.background = 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)';
                adminBtn.classList.remove('admin-active');
            }
            console.log('🔄 LIVE: Admin button updated');
        }
    }

    // LIVE Course Cards Updates
    updateCourseCardsUI(currentUser, elements) {
        const { courseCards, examStartButtons } = elements;
        
        if (courseCards && courseCards.length > 0) {
            courseCards.forEach((card, index) => {
                const button = card.querySelector('.btn-exam-start');
                if (button) {
                    if (currentUser) {
                        // User logged in - enable with glow effect
                        button.disabled = false;
                        button.style.opacity = '1';
                        button.style.pointerEvents = 'auto';
                        button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                        button.classList.add('ready-to-start');
                        
                        // Add live status indicator
                        if (!button.querySelector('.live-indicator')) {
                            const indicator = document.createElement('span');
                            indicator.className = 'live-indicator';
                            indicator.innerHTML = '🟢';
                            indicator.style.cssText = 'position: absolute; top: -5px; right: -5px; animation: pulse 2s infinite;';
                            button.style.position = 'relative';
                            button.appendChild(indicator);
                        }
                    } else {
                        // User not logged in - show as locked
                        button.disabled = false;
                        button.style.opacity = '0.7';
                        button.style.pointerEvents = 'auto';
                        button.style.boxShadow = 'none';
                        button.classList.remove('ready-to-start');
                        button.innerHTML = '<i class="fas fa-play"></i> Start Exam';
                        
                        // Remove live indicator
                        const indicator = button.querySelector('.live-indicator');
                        if (indicator) {
                            indicator.remove();
                        }
                    }
                }
                
                // Add live course status
                const courseType = card.dataset.course;
                this.updateCourseStatus(card, courseType, currentUser);
            });
            
            console.log('🔄 LIVE: Course cards updated');
        }
    }

    // LIVE Hero Section Updates - FIXED TO PRESERVE OUR BUTTONS
    updateHeroSectionUI(currentUser, elements) {
        const { heroButtons } = elements;
        
        if (heroButtons) {
            // Check if our custom buttons already exist
            const quickDemoBtn = document.getElementById('quickDemoBtn');
            const loginPromptBtn = document.getElementById('loginPromptBtn');
            const startExamBtn = document.getElementById('startExamBtn');
            
            if (quickDemoBtn && loginPromptBtn && startExamBtn) {
                // Our buttons already exist, just update their visibility
                if (currentUser) {
                    // User logged in - show Start Exam, hide others
                    quickDemoBtn.style.display = 'none';
                    loginPromptBtn.style.display = 'none';
                    startExamBtn.style.display = 'block';
                    startExamBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    startExamBtn.style.animation = 'pulse 2s infinite';
                    startExamBtn.innerHTML = '<i class="fas fa-play"></i> Start Exam Now';
                } else {
                    // User not logged in - show Quick Demo and Login buttons
                    quickDemoBtn.style.display = 'block';
                    quickDemoBtn.style.visibility = 'visible';
                    quickDemoBtn.style.opacity = '1';
                    
                    loginPromptBtn.style.display = 'block';
                    loginPromptBtn.style.visibility = 'visible';
                    loginPromptBtn.style.opacity = '1';
                    loginPromptBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login for Full Tests';
                    
                    startExamBtn.style.display = 'none';
                }
                console.log('🔄 LIVE: Hero buttons updated (preserved custom buttons)');
            } else {
                // Fallback - recreate buttons if they don't exist
                if (currentUser) {
                    heroButtons.innerHTML = `
                        <button class="btn btn-cta" id="quickDemoBtn" style="display: block !important; visibility: visible !important;">Quick Demo Test</button>
                        <button class="btn btn-secondary" id="loginPromptBtn" style="display: none;">Login for Full Tests</button>
                        <button class="btn btn-cta" id="startExamBtn" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); animation: pulse 2s infinite;">
                            <i class="fas fa-play"></i> Start Exam Now
                        </button>
                    `;
                } else {
                    heroButtons.innerHTML = `
                        <button class="btn btn-cta" id="quickDemoBtn" style="display: block !important; visibility: visible !important;">Quick Demo Test</button>
                        <button class="btn btn-secondary" id="loginPromptBtn" style="display: block !important; visibility: visible !important;">
                            <i class="fas fa-sign-in-alt"></i> Login for Full Tests
                        </button>
                        <button class="btn btn-cta" id="startExamBtn" style="display: none;">Start Exam</button>
                    `;
                }
                // Re-setup event listeners after recreating buttons
                setTimeout(() => {
                    this.setupQuickDemoButton();
                }, 100);
                console.log('🔄 LIVE: Hero buttons recreated');
            }
        }
    }

    // LIVE Statistics Updates
    updateLiveStatistics() {
        const stats = document.querySelectorAll('.stat-card h3');
        if (stats.length > 0) {
            const currentUser = authManager.getCurrentUser();
            const baseStats = ['10K+', '500+', '100+', '95%'];
            
            stats.forEach((stat, index) => {
                if (currentUser && index === 0) {
                    // Increment student count for logged users
                    stat.textContent = '10K+';
                    stat.style.color = '#28a745';
                } else {
                    stat.textContent = baseStats[index];
                    stat.style.color = '#2c3e50';
                }
            });
        }
    }

    // LIVE Button States
    updateButtonStates(currentUser, elements) {
        const { questionsSection, examInstructions, practiceSection } = elements;
        
        // Show/hide sections based on login status
        if (currentUser) {
            if (questionsSection) {
                questionsSection.style.display = 'block';
                questionsSection.classList.add('fade-in');
            }
            if (examInstructions) {
                examInstructions.style.display = 'block';
                examInstructions.classList.add('fade-in');
            }
            if (practiceSection) {
                practiceSection.style.display = 'block';
                practiceSection.classList.add('fade-in');
            }
        } else {
            if (questionsSection) {
                questionsSection.style.display = 'none';
            }
            if (examInstructions) {
                examInstructions.style.display = 'none';
            }
            if (practiceSection) {
                practiceSection.style.display = 'none';
            }
        }
    }

    // Update individual course status
    updateCourseStatus(card, courseType, currentUser) {
        const statusElement = card.querySelector('.course-status') || this.createStatusElement(card);
        
        if (currentUser) {
            statusElement.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745;"></i> Ready';
            statusElement.style.color = '#28a745';
        } else {
            statusElement.innerHTML = '<i class="fas fa-play" style="color: #28a745;"></i> Start Exam';
            statusElement.style.color = '#28a745';
        }
    }

    // Create status element for courses
    createStatusElement(card) {
        const statusElement = document.createElement('div');
        statusElement.className = 'course-status';
        statusElement.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 12px;
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 12px;
            background: rgba(255,255,255,0.9);
        `;
        card.style.position = 'relative';
        card.appendChild(statusElement);
        return statusElement;
    }

    async loadQuestions() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const questionsGrid = document.getElementById('questionsGrid');
        const questionsSection = document.querySelector('.questions-section');

        if (!loadingSpinner || !questionsGrid || !questionsSection) {
            console.warn('❌ Questions elements not found');
            return;
        }

        console.log('📚 Loading questions...');

        // Check if user is logged in
        const currentUser = authManager.getCurrentUser();
        console.log('👤 Current user for questions:', currentUser ? currentUser.email : 'None');

        if (!currentUser) {
            // Hide questions section for non-logged users
            console.log('❌ User not logged in, hiding questions section');
            questionsSection.style.display = 'none';
            return;
        }

        // Show questions section for logged users
        console.log('✅ User logged in, showing questions section');
        questionsSection.style.display = 'block';

        // Show loading spinner
        loadingSpinner.style.display = 'block';
        questionsGrid.style.display = 'none';

        try {
            // Get questions from Firebase
            const result = await questionsManager.getAllQuestions();
            
            if (result.success) {
                console.log('✅ Questions loaded successfully:', result.questions.length);
                this.displayQuestions(result.questions);
            } else {
                console.error('❌ Failed to load questions:', result.error);
                this.showError('Failed to load questions: ' + result.error);
            }
        } catch (error) {
            console.error('❌ Error loading questions:', error);
            this.showError('Failed to load questions. Please try again later.');
        } finally {
            // Hide loading spinner
            loadingSpinner.style.display = 'none';
            questionsGrid.style.display = 'grid';
        }
    }

    displayQuestions(questions) {
        const questionsGrid = document.getElementById('questionsGrid');
        if (!questionsGrid) return;

        // Check if user is logged in
        const currentUser = authManager.getCurrentUser();
        
        if (!currentUser) {
            // Don't display anything for non-logged users
            console.log('❌ User not logged in, not displaying questions');
            return;
        }

        if (!questions || questions.length === 0) {
            questionsGrid.innerHTML = `
                <div class="no-questions">
                    <i class="fas fa-question-circle"></i>
                    <h3>No Questions Available</h3>
                    <p>Questions will appear here once they are added by administrators.</p>
                    ${authManager.isAdmin() ? `
                        <button class="btn btn-primary" onclick="window.location.href='admin.html'">
                            <i class="fas fa-plus"></i> Add Questions
                        </button>
                    ` : ''}
                </div>
            `;
            return;
        }

        // Show answers only to authenticated users (which they are if we reach here)
        const showAnswers = true;
        
        questionsGrid.innerHTML = questions.map(question => `
            <div class="question-card" data-question-id="${question.id}">
                <div class="question-text">${question.question}</div>
                <ul class="options">
                    ${question.options.map((option, index) => `
                        <li class="option ${showAnswers && index === question.correctAnswer ? 'correct' : ''}" 
                            data-option-index="${index}">
                            ${String.fromCharCode(65 + index)}. ${option}
                            ${showAnswers && index === question.correctAnswer ? ' <i class="fas fa-check"></i>' : ''}
                        </li>
                    `).join('')}
                </ul>
                <div class="question-meta">
                    <small><i class="fas fa-lightbulb"></i> Correct Answer: Option ${String.fromCharCode(65 + question.correctAnswer)}</small>
                </div>
            </div>
        `).join('');
    }

    addQuestionInteractivity() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selections in the same question
                const questionCard = option.closest('.question-card');
                const questionOptions = questionCard.querySelectorAll('.option');
                questionOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Show login prompt
                setTimeout(() => {
                    Swal.fire({
                        icon: 'info',
                        title: '🎯 Ready to Check Answer?',
                        text: 'Login to see if your answer is correct and unlock more features!',
                        showCancelButton: true,
                        confirmButtonText: '<i class="fas fa-check-circle"></i> Login & Check',
                        cancelButtonText: 'Continue Browsing'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'login.html';
                        }
                    });
                }, 500);
            });
        });
    }

    showError(message) {
        const questionsGrid = document.getElementById('questionsGrid');
        if (!questionsGrid) return;

        questionsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Questions</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    <i class="fas fa-refresh"></i> Try Again
                </button>
            </div>
        `;
    }

    // Add some sample questions if none exist (for demo purposes)
    async addSampleQuestionsIfEmpty() {
        if (authManager.isAdmin()) {
            const result = await questionsManager.getAllQuestions();
            if (result.success && result.questions.length === 0) {
                const addSample = await Swal.fire({
                    title: 'No Questions Found',
                    text: 'Would you like to add some sample questions to get started?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, add samples',
                    cancelButtonText: 'No, thanks'
                });

                if (addSample.isConfirmed) {
                    Swal.fire({
                        title: 'Adding Sample Questions...',
                        allowOutsideClick: false,
                        didOpen: () => { Swal.showLoading(); }
                    });

                    const sampleResult = await questionsManager.addSampleQuestions();
                    const successCount = sampleResult.filter(r => r.success).length;

                    Swal.close();
                    
                    if (successCount > 0) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sample Questions Added',
                            text: `${successCount} sample questions have been added successfully!`,
                            timer: 2000,
                            showConfirmButton: false
                        });
                        
                        // Reload questions
                        this.loadQuestions();
                    }
                }
            }
        }
    }

    updateButtonsVisibility() {
        // Legacy function - now redirects to live updates
        this.liveUpdateUI();
    }

    // Global override - NO BROWSER ALERTS ALLOWED
    setupNoBrowserAlerts() {
        console.log('🚫 Setting up NO BROWSER ALERTS policy');
        
        // Override all browser dialog functions
        window.originalAlert = window.alert;
        window.originalConfirm = window.confirm;
        window.originalPrompt = window.prompt;
        
        // Replace alert with custom modal
        window.alert = (message) => {
            console.log('🚫 Blocked browser alert:', message);
            console.log('✅ Using custom modal instead');
            
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'info',
                    title: 'Alert',
                    text: message,
                    confirmButtonText: 'OK'
                });
            } else {
                this.createEmergencyModal(message, 'info');
            }
        };
        
        // Replace confirm with custom modal
        window.confirm = async (message) => {
            console.log('🚫 Blocked browser confirm:', message);
            console.log('✅ Using custom modal instead');
            
            if (window.Swal) {
                const result = await window.Swal.fire({
                    icon: 'question',
                    title: 'Confirm',
                    text: message,
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel'
                });
                return result.isConfirmed;
            } else {
                return this.createEmergencyConfirm(message);
            }
        };
        
        // Replace prompt with custom modal
        window.prompt = async (message, defaultValue = '') => {
            console.log('🚫 Blocked browser prompt:', message);
            console.log('✅ Using custom modal instead');
            
            if (window.Swal) {
                const result = await window.Swal.fire({
                    icon: 'question',
                    title: 'Input Required',
                    text: message,
                    input: 'text',
                    inputValue: defaultValue,
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel'
                });
                return result.isConfirmed ? result.value : null;
            } else {
                return this.createEmergencyPrompt(message, defaultValue);
            }
        };
        
        console.log('✅ Browser alerts completely disabled - using custom modals only');
    }

    // Emergency modal for when Swal is not available
    createEmergencyModal(message, type = 'info') {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const content = document.createElement('div');
        const bgColor = type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db';
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            max-width: 400px;
            text-align: center;
            animation: slideIn 0.3s ease;
        `;
        
        content.innerHTML = `
            <div style="color: ${bgColor}; font-size: 3rem; margin-bottom: 15px;">
                ${type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
            </div>
            <h3 style="color: #333; margin-bottom: 15px;">${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <p style="color: #666; margin-bottom: 20px; line-height: 1.5;">${message}</p>
            <button onclick="this.closest('.emergency-modal').remove()" style="
                background: ${bgColor};
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            ">OK</button>
        `;
        
        modal.className = 'emergency-modal';
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }

    // Emergency confirm
    createEmergencyConfirm(message) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                max-width: 400px;
                text-align: center;
            `;
            
            content.innerHTML = `
                <div style="color: #f39c12; font-size: 3rem; margin-bottom: 15px;">❓</div>
                <h3 style="color: #333; margin-bottom: 15px;">Confirm</h3>
                <p style="color: #666; margin-bottom: 20px; line-height: 1.5;">${message}</p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="window.resolveConfirm(true)" style="
                        background: #28a745;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">OK</button>
                    <button onclick="window.resolveConfirm(false)" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Cancel</button>
                </div>
            `;
            
            window.resolveConfirm = (result) => {
                modal.remove();
                delete window.resolveConfirm;
                resolve(result);
            };
            
            modal.appendChild(content);
            document.body.appendChild(modal);
        });
    }
}

// Additional CSS for question interactions
const additionalStyles = `
<style>
.option.selected {
    background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%) !important;
    color: #2d3436 !important;
    transform: translateX(5px);
}

.question-login-prompt {
    text-align: center;
    margin-top: 1rem;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 6px;
}

.question-login-prompt a {
    color: #667eea;
    font-weight: 500;
}

.question-meta {
    text-align: center;
    margin-top: 1rem;
    padding: 0.5rem;
    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
    color: white;
    border-radius: 6px;
    font-weight: 500;
}

.no-questions, .error-message {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.no-questions i, .error-message i {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 1rem;
}

.error-message i {
    color: #e74c3c;
}

.no-questions h3, .error-message h3 {
    color: #333;
    margin-bottom: 1rem;
}

.no-questions p, .error-message p {
    color: #666;
    margin-bottom: 2rem;
}
</style>
`;

// Add additional styles to document
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Course Cards Setup
function setupCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('click', async function() {
            const courseType = this.dataset.course;
            const courseName = this.querySelector('h3').textContent;
            
            // Check if user is logged in
            const currentUser = authManager.getCurrentUser();
            if (!currentUser) {
                const result = await Swal.fire({
                    title: '🚀 Ready to Start Your Exam?',
                    text: 'Please login with Google to begin your learning journey!',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: '<i class="fab fa-google"></i> Login & Start Exam',
                    cancelButtonText: 'Cancel'
                });
                
                if (result.isConfirmed) {
                    // Directly trigger Google login
                    try {
                        const loginResult = await authManager.signInWithGoogle();
                        if (loginResult.success) {
                            await Swal.fire({
                                icon: 'success',
                                title: 'Login Successful!',
                                text: 'You can now access the course',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            // Continue with course selection after successful login
                        } else {
                            await Swal.fire({
                                icon: 'error',
                                title: 'Login Failed',
                                text: 'Please try again',
                                confirmButtonText: 'OK'
                            });
                            return;
                        }
                    } catch (error) {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Login Error',
                            text: 'Something went wrong. Please try again.',
                            confirmButtonText: 'OK'
                        });
                        return;
                    }
                } else {
                    return;
                }
            }
            
            // Handle different course types
            switch(courseType) {
                case 'free-test':
                    await Swal.fire({
                        title: 'Free Mock Test',
                        text: 'Starting your free mock test...',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    window.location.href = 'exam.html?type=free';
                    break;
                    
                case 'rscit':
                case 'ccc':
                    await Swal.fire({
                        title: `${courseName}`,
                        text: 'Starting your exam...',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    window.location.href = `exam.html?type=${courseType}`;
                    break;
                    
                case 'rscit-subject':
                case 'ccc-subject':
                    const { value: subject } = await Swal.fire({
                        title: 'Select Subject/Chapter',
                        input: 'select',
                        inputOptions: getSubjectOptions(courseType),
                        inputPlaceholder: 'Choose a subject',
                        showCancelButton: true,
                        confirmButtonText: 'Start Test',
                        cancelButtonText: 'Cancel'
                    });
                    
                    if (subject) {
                        window.location.href = `exam.html?type=${courseType}&subject=${subject}`;
                    }
                    break;
                    
                case 'rscit-mock':
                case 'ccc-practical':
                    await Swal.fire({
                        title: `${courseName}`,
                        text: 'Redirecting to specialized test interface...',
                        icon: 'info',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    window.location.href = `exam.html?type=${courseType}`;
                    break;
                    
                case 'premium':
                    const premiumResult = await Swal.fire({
                        title: 'Premium Course',
                        html: `
                            <div style="text-align: left; margin: 20px 0;">
                                <h4>Premium Features Include:</h4>
                                <ul style="margin: 15px 0;">
                                    <li>Video Lectures by Expert Teachers</li>
                                    <li>Live Doubt Clearing Sessions</li>
                                    <li>Unlimited Practice Tests</li>
                                    <li>Performance Analytics</li>
                                    <li>Study Materials & Notes</li>
                                    <li>24/7 Support</li>
                                </ul>
                                <p><strong>Price: ₹999/month</strong></p>
                            </div>
                        `,
                        icon: 'star',
                        showCancelButton: true,
                        confirmButtonText: 'Subscribe Now',
                        cancelButtonText: 'Maybe Later',
                        confirmButtonColor: '#f39c12'
                    });
                    
                    if (premiumResult.isConfirmed) {
                        await Swal.fire({
                            title: 'Payment Gateway',
                            text: 'Redirecting to payment gateway...',
                            icon: 'info',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        // Here you would integrate with payment gateway
                        // For demo, just show success message
                        setTimeout(() => {
                            Swal.fire({
                                title: 'Welcome to Premium!',
                                text: 'Your premium subscription is now active',
                                icon: 'success'
                            });
                        }, 2000);
                    }
                    break;
                    
                default:
                    await Swal.fire({
                        title: 'Coming Soon',
                        text: `${courseName} will be available soon!`,
                        icon: 'info'
                    });
            }
        });
    });
}

// Get subject options based on course type
function getSubjectOptions(courseType) {
    const subjects = {
        'rscit-subject': {
            'computer-basics': 'Computer Basics',
            'windows': 'Windows Operating System',
            'ms-word': 'MS Word',
            'ms-excel': 'MS Excel',
            'ms-powerpoint': 'MS PowerPoint',
            'internet': 'Internet & Email',
            'digital-services': 'Digital Services',
            'cyber-security': 'Cyber Security',
            'e-governance': 'E-Governance',
            'social-media': 'Social Media',
            'e-commerce': 'E-Commerce',
            'digital-payment': 'Digital Payment',
            'data-entry': 'Data Entry',
            'multimedia': 'Multimedia',
            'programming': 'Programming Basics'
        },
        'ccc-subject': {
            'computer-fundamentals': 'Computer Fundamentals',
            'operating-system': 'Operating System',
            'word-processing': 'Word Processing',
            'spreadsheet': 'Spreadsheet',
            'presentation': 'Presentation',
            'internet-www': 'Internet & WWW',
            'email': 'Email',
            'digital-literacy': 'Digital Literacy',
            'cyber-security': 'Cyber Security',
            'e-governance': 'E-Governance Applications',
            'digital-payment': 'Digital Payment Systems',
            'social-networking': 'Social Networking'
        }
    };
    
    return subjects[courseType] || {};
}

// Initialize the app
console.log('🎯 Starting Main App...');
const app = new MainApp();

// Make app globally accessible for exam.js
window.mainApp = app;

// Setup course cards after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCourseCards();
    // Initialize the main app
    app.init();
});

// Add sample questions for admin users after a short delay
setTimeout(() => {
    app.addSampleQuestionsIfEmpty();
}, 2000); 