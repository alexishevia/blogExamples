# --- NodeJS --- #

$nodejsDependencies = ["python", "g++", "make", "wget", "tar"]

package { $nodejsDependencies:
  ensure => "installed"
}

class { 'nodejs':
  version => 'v0.10.5',
  require => Package[$nodejsDependencies]
}

# --- MySQL --- #

class { 'mysql': }

class { 'mysql::server':
  config_hash => { 'root_password' => 'foo' }
}
