# Mobile Form
 
This simple mobile form takes in three fields: name, email, and a short message. It submits to a mock API endpoint with proper loading, error, and success handling.
 
## Project structure
 
```
MobileForm/
├── App.tsx
└── src/
    ├── App.tsx
    ├── components/
    │   └── Input.tsx
    ├── hooks/
    │   ├── useForm.ts
    │   └── validation.ts
    ├── screens/
    │   └── ContactFormScreen.tsx
    └── services/
        └── api.ts
```
 
- **App.tsx** — entry point, re-exports from **src/App.tsx**
- **components/Input.tsx** — reusable input with label, focus, and error state
- **hooks/useForm.ts** — all form state and submit logic
- **hooks/validation.ts** — pure validation function, no side effects
- **screens/ContactFormScreen.tsx** — UI only, calls **useForm()**
- **services/api.ts** — mock API call, swap in a real **fetch()** when ready
 
## Validation logic
 
Validation runs synchronously in **validateContactForm()** before any network call. If any field fails, **setErrors()** is called and the submit returns early — no fetch is made.
 
| Field | Rules |
|---|---|
| **name** | Required, min 2 characters |
| **email** | Required, valid email format |
| **message** | Required, min 10 characters |
 
Each field's error clears as soon as the user starts typing in it again.
 
## State flow
 
All state lives in **useForm.ts**. The screen is stateless — it only renders.
 
```
User types
  → handleChange(field)(value)
  → updates formData[field]
  → clears errors[field] if present
 
User taps Submit
  → validate(formData)
     ├── invalid → setErrors(), return early
     └── valid
          → setIsLoading(true)
          → await submitContactForm(formData)
             ├── resolves → setStatus('success'), reset formData
             └── rejects  → setStatus('error'), setErrorMessage(...)
          → setIsLoading(false)   ← always runs via finally
```
 
## Scaling to multiple forms
 
The simplest path is to make **useForm** generic so each form passes its own validate and onSubmit:
 
```ts
function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: {
  initialValues: T;
  validate: (data: T) => Partial<Record<keyof T, string>>;
  onSubmit: (data: T) => Promise<void>;
})
```
