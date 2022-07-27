import { AppError } from '@infra/shared/utils/app-error';

abstract class UseCase<TRequest = any, TResponse = any> {
    abstract perform(data?: TRequest): Promise<TResponse>;

    async execute(data?: TRequest): Promise<TResponse> {
        if (data) {
            if (data instanceof Object) {
                const fields = Object.keys(data);
                this.validateRequiredFields(data, fields);
            }

            return this.perform(data);
        }

        return this.perform();
    }

    private validateRequiredFields(data: any, fields: string[]) {
        for (const field of fields) {
            if (!data[field]) {
                throw new AppError('This field is required!');
            }
        }
    }
}

export { UseCase };
