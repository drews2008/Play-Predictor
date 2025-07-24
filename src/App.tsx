<BrowserRouter>
  <Routes>
    <Route path="/" element={<MainDashboard />} />
    <Route path="./components/tendency" element={<TendencyDashboard />} />
    <Route path="./components/defense" element={<DefensiveTendencies />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
