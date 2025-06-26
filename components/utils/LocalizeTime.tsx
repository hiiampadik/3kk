const localizedTime = (dateString: string, locale: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(locale, {
        timeStyle: 'short',
    });
    return formatter.format(date)
};

export default localizedTime

