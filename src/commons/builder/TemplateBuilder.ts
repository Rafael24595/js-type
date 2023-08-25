export class TemplateBuilder {

    public static message(template: string, args: any[]): string {
        const fragments = template.split('{}');
        const build = [];
        for (let i = 0; i < fragments.length; i++) {
            const fragment = fragments[i];
            build.push(fragment);
            if(i != fragment.length -1) {
                const value = args[i] != undefined ? args[i] : "";
                build.push(value);
            } else if(args.length > i) {
                const value = "(" + args.slice(i, args.length).join(', ') + ")";
                build.push(value);
            }
        }
        return build.join("");
    }

}