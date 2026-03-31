# Mobile Form
 
This simple mobile form takes in three fields: name, email, and a short message. It submits to a mock API endpoint with proper loading, error, and success handling.
 
## Get started
 
1. Scaffold a new React Native project
 
   ```bash
   npx @react-native-community/cli init MobileForm --template react-native-template-typescript
   cd MobileForm
   ```
 
2. Copy in the source files
 
   ```bash
   cp -r /path/to/this-repo/src ./src
   cp /path/to/this-repo/App.tsx ./App.tsx
   ```
 
3. Install dependencies
 
   ```bash
   npm install
   ```
 
4. Run the app
 
   ```bash
   # iOS
   npx react-native run-ios
 
   # Android
   npx react-native run-android
   ```
 
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
 
For larger apps with 5+ forms or complex cross-field validation, reach for [react-hook-form](https://react-hook-form.com) paired with [Zod](https://zod.dev) for schema-based validation.
 
## Learn more
 
- [React Native docs](https://reactnative.dev/docs/getting-started): Getting started and core concepts
- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html): TypeScript fundamentals
- [React Native community](https://github.com/facebook/react-native): View the open source platform and contribute
