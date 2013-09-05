# --- Preinstall Stage ---#

stage { 'preinstall':
  before => Stage['main']
}

# Define the apt_get_update class
class apt_get_update {
  exec { 'apt-get -y update':
    path => ['/usr/sbin', '/usr/bin', '/sbin', '/bin']
  }
}

# Declare (invoke) the apt_get_update
class { 'apt_get_update':
  stage => preinstall
}

# --- NodeJS --- #

class { 'nodejs':
  version => 'v0.10.5'
}

# --- MySQL --- #

class { 'mysql': }

class { 'mysql::server':
  config_hash => { 'root_password' => 'foo' }
}
