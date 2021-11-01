export default function getEndpointURL (pathname: string, searchParams: URLSearchParams = new URLSearchParams()): URL {
  const location = new URL(window.location.toString())
  location.port = '5000'
  location.pathname = pathname
  location.search = searchParams.toString()
  return new URL(location.toString())
}
