const RegexUtils = {

    sanitize(regexString) {
        return regexString.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
    }
};
export default RegexUtils;
