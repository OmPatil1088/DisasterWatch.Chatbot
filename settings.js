// ========================================
// Settings System
// ========================================

// Default Settings
const defaultSettings = {
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    locationAccess: true,
    monitoringRadius: '5',
    language: 'english',
    anonymousReports: true,
    hideLocation: true,
    profileVisibility: false,
    theme: 'light'
};

let currentSettings = { ...defaultSettings };

function initializeSettings() {
    loadSettings();
    renderSettings();
    initializeSettingHandlers();
    applyTheme();
}

// ========================================
// Load and Save Settings
// ========================================

function loadSettings() {
    try {
        const saved = localStorage.getItem('userSettings');
        if (saved) {
            currentSettings = {
                ...defaultSettings,
                ...JSON.parse(saved)
            };
        }
    } catch (e) {
        console.warn("LocalStorage unavailable. Using defaults.");
        currentSettings = { ...defaultSettings };
    }
}

function saveSettings() {
    try {
        localStorage.setItem('userSettings', JSON.stringify(currentSettings));
    } catch (e) {
        console.warn("Could not save settings.");
    }
}

function renderSettings() {
    const pushNotifications = document.getElementById('pushNotifications');
    const emailNotifications = document.getElementById('emailNotifications');
    const smsNotifications = document.getElementById('smsNotifications');

    if (pushNotifications) pushNotifications.checked = currentSettings.pushNotifications;
    if (emailNotifications) emailNotifications.checked = currentSettings.emailNotifications;
    if (smsNotifications) smsNotifications.checked = currentSettings.smsNotifications;

    const locationAccess = document.getElementById('locationAccess');
    if (locationAccess) locationAccess.checked = currentSettings.locationAccess;

    const radiusOptions = document.querySelectorAll('input[name="radius"]');
    radiusOptions.forEach(radio => {
        radio.checked = radio.value === currentSettings.monitoringRadius;
    });

    const languageOptions = document.querySelectorAll('input[name="language"]');
    languageOptions.forEach(radio => {
        radio.checked = radio.value === currentSettings.language;
    });

    const anonymousReports = document.getElementById('anonymousReports');
    const hideLocation = document.getElementById('hideLocation');
    const profileVisibility = document.getElementById('profileVisibility');

    if (anonymousReports) anonymousReports.checked = currentSettings.anonymousReports;
    if (hideLocation) hideLocation.checked = currentSettings.hideLocation;
    if (profileVisibility) profileVisibility.checked = currentSettings.profileVisibility;

    const themeOptions = document.querySelectorAll('input[name="theme"]');
    themeOptions.forEach(radio => {
        radio.checked = radio.value === currentSettings.theme;
    });
}

function initializeSettingHandlers() {
    const pushNotifications = document.getElementById('pushNotifications');
    const emailNotifications = document.getElementById('emailNotifications');
    const smsNotifications = document.getElementById('smsNotifications');

    if (pushNotifications)
        pushNotifications.addEventListener('change', function() {
            currentSettings.pushNotifications = this.checked;
        });

    if (emailNotifications)
        emailNotifications.addEventListener('change', function() {
            currentSettings.emailNotifications = this.checked;
        });

    if (smsNotifications)
        smsNotifications.addEventListener('change', function() {
            currentSettings.smsNotifications = this.checked;
        });

    const locationAccess = document.getElementById('locationAccess');
    if (locationAccess)
        locationAccess.addEventListener('change', function() {
            currentSettings.locationAccess = this.checked;
        });

    const radiusOptions = document.querySelectorAll('input[name="radius"]');
    radiusOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) currentSettings.monitoringRadius = this.value;
        });
    });

    const languageOptions = document.querySelectorAll('input[name="language"]');
    languageOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                currentSettings.language = this.value;
                updateLanguage(this.value);
            }
        });
    });

    const anonymousReports = document.getElementById('anonymousReports');
    const hideLocation = document.getElementById('hideLocation');
    const profileVisibility = document.getElementById('profileVisibility');

    if (anonymousReports)
        anonymousReports.addEventListener('change', function() {
            currentSettings.anonymousReports = this.checked;
        });

    if (hideLocation)
        hideLocation.addEventListener('change', function() {
            currentSettings.hideLocation = this.checked;
        });

    if (profileVisibility)
        profileVisibility.addEventListener('change', function() {
            currentSettings.profileVisibility = this.checked;
        });

    const themeOptions = document.querySelectorAll('input[name="theme"]');
    themeOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                currentSettings.theme = this.value;
                applyTheme();
            }
        });
    });

    const saveBtn = document.getElementById('saveSettingsBtn');
    const resetBtn = document.getElementById('resetSettingsBtn');

    if (saveBtn) saveBtn.addEventListener('click', handleSaveSettings);
    if (resetBtn) resetBtn.addEventListener('click', handleResetSettings);
}

function handleSaveSettings() {
    saveSettings();
    alert('Settings saved successfully! ✓');
}

function handleResetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
        currentSettings = { ...defaultSettings };
        saveSettings();
        renderSettings();
        applyTheme();
        alert('Settings have been reset to defaults.');
    }
}

// ========================================
// Theme Management
// ========================================

function applyTheme() {
    const theme = currentSettings.theme;
    const html = document.documentElement;

    html.style.colorScheme = theme === 'dark' ? 'dark' : 'light';

    if (document.body)
        document.body.setAttribute('data-theme', theme);
}

// ========================================
// Language Management
// ========================================

function updateLanguage(language) {
    console.log('Language changed to:', language);

    const languageMap = {
        english: 'English',
        hindi: 'हिंदी (Hindi)',
        regional: 'Regional Language'
    };

    console.log('Current language:', languageMap[language]);
}

// ========================================
// Initialization (FIXED)
// ========================================

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSettings);
} else {
    initializeSettings();
}