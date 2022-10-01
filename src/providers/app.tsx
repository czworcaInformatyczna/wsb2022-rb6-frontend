<BrowserRouter>
  <AuthProvider>
    <QueryClientProvider client={getQueryClient()}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </AuthProvider>
</BrowserRouter>;
