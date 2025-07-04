const localizedDate = (dateString: string, locale: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(locale, {
        month: 'short',
        day: 'numeric',
    });
    return formatter.format(date)
};

export default localizedDate

