Exec {
  path => ['/usr/sbin', '/usr/bin', '/sbin', '/bin', '/usr/local/bin']
}

# --- Preinstall Stage ---#

stage { 'preinstall':
  before => Stage['main']
}

# Define the install_packages class
class install_packages {
  package { ['curl', 'build-essential', 'libfontconfig1', 'python',
             'g++', 'make', 'wget', 'tar', 'mc', 'htop']:
    ensure => present
  }
}

# Declare (invoke) install_packages
class { 'install_packages':
  stage => preinstall
}

# --- NodeJS --- #

class { 'nodejs':
  version => 'v0.10.5'
}

# --- MySQL --- #

class { '::mysql::server':
  root_password => 'foo'
}
