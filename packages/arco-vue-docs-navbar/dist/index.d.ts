import './index.less';
import './navbar.css';
interface NavBarOptions {
    version?: string;
    lang?: string;
    handleLanguageChange?: (lang: string) => void;
}
declare const renderNavBar: (options?: NavBarOptions | undefined) => void;
export default renderNavBar;
