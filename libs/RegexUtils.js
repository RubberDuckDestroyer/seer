const RegexUtils = {

    sanitize(regexString) {
        return regexString.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
    }
};
module.exports = RegexUtils;
