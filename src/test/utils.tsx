import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import {RecoilRoot} from "recoil";

afterEach(() => {
    cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
    return render(ui, {
        wrapper: ({ children }) => (
            <RecoilRoot>
                {children}
            </RecoilRoot>
        ),
        ...options,
    })
}

export { customRender as render }