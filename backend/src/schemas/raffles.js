import z from 'zod'

const saveNumberUserSchema = z.object({
    cavnum: z.string({
        required_error: 'The field cavnum is required',
        invalid_type_error: 'The field cavnum must be a string'
    }),
    cavnomusu: z.string({
        required_error: 'The field cavnomusu is required',
        invalid_type_error: 'The field cavnomusu must be a string'
    }),
    cavcel: z.string({
        required_error: 'The field cavcel is required',
        invalid_type_error: 'The field cavcel must be a string'
    }),
    cavemail: z.string({
        required_error: 'The field cavemail is required',
        invalid_type_error: 'The field cavemail must be a string'
    }).optional(),
    cavestado: z.enum(['PO', 'PA'])
})

export function validateSaveNumberUser(data) {
    return saveNumberUserSchema.safeParse(data)
}