import defaultSettings from 'src/settings'

export default function getPageTitle(pageTitle) {
    console.log(pageTitle);
    return pageTitle ? pageTitle : defaultSettings;
}
