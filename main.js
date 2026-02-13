// Host Information Management
const hostInfo = {
    name: "Michael Petted",
    studioName: "Michael Petted Acting Studio",
    location: "The Hudson Theatre in Los Angeles",
    city: "Los Angeles, CA"
};

// Function to update host name throughout the page
function updateHostName(newName) {
    hostInfo.name = newName;
    hostInfo.studioName = `${newName} Acting Studio`;
    
    // Update all instances dynamically
    updatePageContent();
}

// Function to update location
function updateLocation(newLocation) {
    hostInfo.location = newLocation;
    updatePageContent();
}

// Function to update city
function updateCity(newCity) {
    hostInfo.city = newCity;
    updatePageContent();
}

// Function to update all host information at once
function updateHostInfo(updates) {
    Object.assign(hostInfo, updates);
    updatePageContent();
}

// Function to update the page content with current host info
function updatePageContent() {
    // Update navigation studio name
    const navTitle = document.querySelector('nav .text-2xl');
    if (navTitle) {
        navTitle.textContent = hostInfo.studioName.toUpperCase();
    }
    
    // Update the location in "The Teacher" section
    const locationText = document.querySelector('#the-teacher blockquote strong');
    if (locationText) {
        locationText.textContent = hostInfo.location;
    }
    
    // Update footer
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = `${hostInfo.studioName}. ${hostInfo.city}. | &copy; 2025`;
    }
    
    // Trigger a custom event for any other listeners
    document.dispatchEvent(new CustomEvent('hostInfoUpdated', { detail: hostInfo }));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updatePageContent();
});