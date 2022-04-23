import routes from './router.config'

export default {
    dva: {
        hmr: false,
        // skipModelValidate: true,
        // disableModelsReExport: true,
        // lazyLoad: true,
    },
    routes: routes
}